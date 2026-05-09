/**
 * validate_data_integrity.js
 * 
 * Script de Validação de Integridade de Dados — Vigilaro Care Neo
 * 
 * Pode ser executado de duas formas:
 * 1. Via Node.js (offline, passando um JSON exportado do AsyncStorage)
 * 2. Importado como módulo dentro do app React Native
 * 
 * Uso via Node:
 *   node scripts/validate_data_integrity.js [caminho_para_dump.json]
 * 
 * Uso no app:
 *   import { validateVigilaroData } from '../scripts/validate_data_integrity';
 *   const report = validateVigilaroData(dataObject);
 *   console.log(report.summary);
 */

const { validateVigilaroData, SEVERITY } = require('../utils/DataIntegrityUtils');

// ============================================================
// NODE.JS CLI RUNNER
// ============================================================

if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
    const fs = require('fs');
    const path = require('path');

    const filePath = process.argv[2];

    if (!filePath) {
        console.log('Uso: node validate_data_integrity.js <caminho_para_dump.json>');
        console.log('');
        console.log('Para exportar os dados do app, adicione temporariamente na HomeScreen:');
        console.log('  const data = await AsyncStorage.getItem("@vigilaro_data");');
        console.log('  console.log(JSON.stringify(JSON.parse(data), null, 2));');
        console.log('');
        console.log('Copie o JSON para um arquivo e passe como argumento.');
        process.exit(1);
    }

    try {
        const absPath = path.resolve(filePath);
        const raw = fs.readFileSync(absPath, 'utf-8');
        const data = JSON.parse(raw);

        const report = validateVigilaroData(data);
        console.log(report.summary);

        process.exit(report.stats.phantomReferences > 0 || report.issues.some(i => i.severity === SEVERITY.CRITICAL) ? 1 : 0);
    } catch (e) {
        console.error('Erro ao processar arquivo:', e.message);
        process.exit(2);
    }
}

// ============================================================
// EXPORT (para compatibilidade legada)
// ============================================================

if (typeof module !== 'undefined') {
    module.exports = { validateVigilaroData, SEVERITY };
}
