/**
 * ExportReportService.js (Fase 3 - F-06)
 * Responsável por gerar um Relatório de Segurança Residencial em PDF
 * usando expo-print e compartilhando via expo-sharing.
 */

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import ScoreService from './ScoreService';
import ProfileService from './ProfileService';
import AchievementService from './AchievementService'; // Added F-07
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChecklistService } from './ChecklistService';

class ExportReportService {
    
    // Constrói o HTML do relatório
    async generateHTMLReport() {
        // 1. Coleta Dados
        const scoreData = await ScoreService.getScoreCompleto();
        const profiles = await ProfileService.getProfiles() || [];
        const isPremium = await AsyncStorage.getItem('@premium_status') === 'true';
        
        const dateStr = new Date().toLocaleDateString('pt-BR');
        
        // 2. Monta seção de perfis
        let perfisHtml = '';
        if (profiles.length > 0) {
            perfisHtml = '<ul>' + profiles.map(p => {
                const tipoMap = { idoso: '👵 Idoso', crianca: '👶 Criança/Bebê', pet: '🐾 Pet' };
                return `<li><b>${p.nome || p.name}</b> (${tipoMap[p.tipo] || 'Pessoa'})</li>`;
            }).join('') + '</ul>';
        } else {
            perfisHtml = '<p>Nenhum perfil cadastrado.</p>';
        }

        // 3. Monta seção de ambientes e riscos (Pegando apenas 1 pendência de exemplo por ambiente para resumir)
        let ambientesHtml = '';
        for (const [ambId, nota] of Object.entries(scoreData.ambientes)) {
            const ambName = ambId.charAt(0).toUpperCase() + ambId.slice(1);
            let color = nota >= 80 ? '#10B981' : (nota >= 50 ? '#F59E0B' : '#EF4444');
            
            // Tenta achar 1 risco pendente
            let riskText = '';
            try {
                const checkData = await AsyncStorage.getItem(`@checklist_${ambId}`);
                if (checkData) {
                    const respostas = JSON.parse(checkData);
                    const source = ChecklistService.getFlattenedItems(ambId);
                    const pendingItem = source.find(item => respostas[item.titulo] === false || respostas[item.id] === false);
                    if (pendingItem) {
                        riskText = `<p style="font-size: 12px; color: #6B7280; font-style: italic;">Atenção: ${pendingItem.text}</p>`;
                    }
                }
            } catch (e) {}

            ambientesHtml += `
                <div style="margin-bottom: 12px; padding: 12px; border-radius: 8px; border: 1px solid #E5E7EB;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #374151;">${ambName}</span>
                        <span style="color: ${color}; font-weight: bold;">${nota}% Seguro</span>
                    </div>
                    ${riskText}
                </div>
            `;
        }
        
        if (Object.keys(scoreData.ambientes).length === 0) {
            ambientesHtml = '<p>Nenhum ambiente vistoriado ainda.</p>';
        }

        const scoreColor = scoreData.geral >= 80 ? '#10B981' : (scoreData.geral >= 50 ? '#F59E0B' : '#EF4444');

        // 4. Monta o HTML Principal
        const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Relatório de Segurança - Vigilaro Care</title>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #1F2937; }
                .header { text-align: center; border-bottom: 2px solid #10B981; padding-bottom: 20px; margin-bottom: 30px; }
                .title { font-size: 24px; font-weight: 800; color: #065F46; margin: 0; }
                .subtitle { font-size: 14px; color: #6B7280; margin-top: 5px; }
                .score-card { background-color: #F9FAFB; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px; border: 1px solid #E5E7EB; }
                .score-value { font-size: 48px; font-weight: 900; color: ${scoreColor}; }
                .score-label { font-size: 14px; color: #4B5563; text-transform: uppercase; letter-spacing: 1px; }
                .section-title { font-size: 18px; font-weight: bold; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; margin-bottom: 16px; margin-top: 30px; }
                .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 20px; }
                .premium-badge { display: inline-block; background-color: #10B981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-bottom: 10px;}
            </style>
        </head>
        <body>
            <div class="header">
                ${isPremium ? '<div class="premium-badge">Membro Premium</div>' : ''}
                <p class="title">Vigilaro Care V6 Neo</p>
                <p class="subtitle">Relatório Oficial de Segurança Residencial</p>
                <p class="subtitle">Data da Emissão: ${dateStr}</p>
            </div>

            <div class="score-card">
                <div class="score-label">Índice de Segurança Global</div>
                <div class="score-value">${scoreData.geral}%</div>
                <p style="font-size: 14px; color: #6B7280; margin-top: 10px;">
                    ${scoreData.pendencias > 0 ? `Foram identificadas <b>${scoreData.pendencias}</b> pendências que exigem atenção.` : 'Sua casa está blindada contra acidentes infantis e domésticos.'}
                </p>
            </div>

            <h2 class="section-title">Perfis Protegidos</h2>
            ${perfisHtml}

            <h2 class="section-title">Análise por Ambiente</h2>
            ${ambientesHtml}

            <div class="footer">
                <p>Relatório gerado automaticamente pelo aplicativo Vigilaro Care V6 Neo.</p>
                <p>A segurança é um hábito contínuo. Continue inspecionando sua casa regularmente.</p>
            </div>
        </body>
        </html>
        `;

        return html;
    }

    /**
     * Gera o PDF e exibe o modal de compartilhamento do OS
     */
    async shareReport() {
        try {
            const html = await this.generateHTMLReport();
            
            const { uri } = await Print.printToFileAsync({
                html,
                base64: false
            });

            console.log('PDF gerado em:', uri);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Compartilhar Relatório de Segurança Vigilaro',
                    UTI: 'com.adobe.pdf'
                });
                
                // Conquista F-07
                await AchievementService.grantReportExport();
                
                return true;
            } else {
                if (__DEV__) { console.warn('Sharing API não disponível no dispositivo.'); }
                return false;
            }
        } catch (error) {
            if (__DEV__) { console.error('[ExportReportService] Erro ao gerar PDF:', error); }
            throw error;
        }
    }
}

export default new ExportReportService();
