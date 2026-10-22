/**
 * BatteryMonitor.js
 * Monitora o nível de bateria e exibe alertas proativos
 * Utiliza expo-battery para leitura do estado atual
 */
import { tx } from '../utils/txFixo';
import { useEffect, useRef } from 'react';
import { AppState } from "react-native";
import * as Battery from 'expo-battery';
import NeoAlert from '../utils/NeoAlert';

const BATTERY_LOW_THRESHOLD = 0.20;    // 20%
const BATTERY_CRITICAL_THRESHOLD = 0.10; // 10%
const CHECK_INTERVAL_MS = 5 * 60 * 1000; // verificar a cada 5 minutos

export default function BatteryMonitor() {
    const lastAlertLevel = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        checkBattery();

        // Monitora periodicamente
        intervalRef.current = setInterval(checkBattery, CHECK_INTERVAL_MS);

        // Também verifica quando o app volta ao foreground
        const subscription = AppState.addEventListener('change', (nextState) => {
            if (nextState === 'active') {
                checkBattery();
            }
        });

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            subscription?.remove();
        };
    }, []);

    const checkBattery = async () => {
        try {
            const level = await Battery.getBatteryLevelAsync();
            const state = await Battery.getBatteryStateAsync();

            // Só alerta se NÃO estiver carregando
            if (state === Battery.BatteryState.CHARGING || state === Battery.BatteryState.FULL) {
                lastAlertLevel.current = null;
                return;
            }

            if (level <= 0) return; // Emulador ou indisponível

            if (level <= BATTERY_CRITICAL_THRESHOLD && lastAlertLevel.current !== 'critical') {
                lastAlertLevel.current = 'critical';
                NeoAlert.alert(
                    tx('telas.BatteryMonitor.bateriaCritica', '🔴 Bateria Crítica'),
                    tx('telas.BatteryMonitor.criticaMsg', {
                        pct: Math.round(level * 100),
                        defaultValue: 'Sua bateria está em {{pct}}%. Em caso de emergência, você pode não conseguir usar o telefone. Conecte o carregador imediatamente.\n\n💡 Dica: Tenha sempre uma lanterna e uma lista de contatos de emergência em papel.',
                    }),
                    [{ text: tx('telas.BatteryMonitor.entendi', 'Entendi'), style: 'default' }]
                );
            } else if (level <= BATTERY_LOW_THRESHOLD && level > BATTERY_CRITICAL_THRESHOLD && lastAlertLevel.current !== 'low') {
                lastAlertLevel.current = 'low';
                NeoAlert.alert(
                    tx('telas.BatteryMonitor.bateriaBaixa', '🟡 Bateria Baixa'),
                    tx('telas.BatteryMonitor.baixaMsg', {
                        pct: Math.round(level * 100),
                        defaultValue: 'Sua bateria está em {{pct}}%. Recomendamos recarregar seu dispositivo para manter o acesso às funções de emergência do Vigilaro.',
                    }),
                    [{ text: 'OK', style: 'default' }]
                );
            } else if (level > BATTERY_LOW_THRESHOLD) {
                lastAlertLevel.current = null; // Reset para alertar novamente se cair
            }
        } catch (e) {
            // Silenciar erros (ex: emulador sem suporte)
            console.log('BatteryMonitor: não disponível', e.message);
        }
    };

    return null; // Componente invisível
}
