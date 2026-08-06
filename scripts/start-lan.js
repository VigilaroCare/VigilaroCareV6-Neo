/**
 * start-lan.js — inicia o Expo forçando o Metro no IP LAN real.
 *
 * Problema que resolve (Windows): adaptadores virtuais (Wi-Fi Direct,
 * Bluetooth) expõem IPs APIPA 169.254.x.x; quando a CLI do Expo não decide
 * qual adaptador usar, cai para 127.0.0.1 e o celular não alcança o Metro.
 * Aqui detectamos o IPv4 privado real (exclui APIPA) e o fixamos via
 * REACT_NATIVE_PACKAGER_HOSTNAME antes de subir o `expo start --lan`.
 *
 * Uso: npm start  (aceita args extras: npm start -- --clear)
 */
const os = require('os');
const { spawn } = require('child_process');

function detectLanIp() {
    const candidates = [];
    for (const [name, addrs] of Object.entries(os.networkInterfaces())) {
        for (const a of addrs || []) {
            if (a.family !== 'IPv4' || a.internal) continue;
            if (a.address.startsWith('169.254.')) continue; // APIPA (adaptador virtual sem rede)
            candidates.push({ name, address: a.address });
        }
    }
    const isPrivate = (ip) => /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip);
    const priv = candidates.find((c) => isPrivate(c.address));
    return (priv || candidates[0] || {}).address || null;
}

const ip = detectLanIp();
const env = { ...process.env };

if (ip) {
    env.REACT_NATIVE_PACKAGER_HOSTNAME = ip;
    console.log(`[start-lan] Metro exposto em ${ip} — QR/URL usarão exp://${ip}:8081`);

    // O proxy de DEV roda nesta mesma máquina; se o .env apontar para um IP
    // de LAN antigo (DHCP trocou o lease), atualiza para o IP atual.
    // process.env tem precedência sobre o .env na CLI do Expo, então basta
    // exportar aqui. URLs de produção (https/host público) não são tocadas.
    const fs = require('fs');
    const path = require('path');
    const LAN_URL_RE = /^http:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)[\d.]+(:\d+)?$/;
    try {
        const envFile = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
        const m = envFile.match(/^EXPO_PUBLIC_VIGILARO_PROXY_URL=(\S+)/m);
        if (m && LAN_URL_RE.test(m[1])) {
            const port = (m[1].match(/:(\d+)$/) || [])[1] || '3000';
            const fixed = `http://${ip}:${port}`;
            if (m[1] !== fixed) {
                env.EXPO_PUBLIC_VIGILARO_PROXY_URL = fixed;
                console.log(`[start-lan] Proxy de dev: ${m[1]} está obsoleto — usando ${fixed} nesta sessão.`);
            }
        }
    } catch (_) { /* sem .env — segue o fluxo normal */ }
} else {
    console.warn('[start-lan] Nenhum IP LAN detectado (sem rede?). Seguindo com o padrão do Expo.');
}

const args = ['expo', 'start', '--lan', ...process.argv.slice(2)];
const child = spawn('npx', args, {
    stdio: 'inherit',
    env,
    shell: process.platform === 'win32',
});
child.on('exit', (code) => process.exit(code == null ? 0 : code));
