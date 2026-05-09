/**
 * DicaService.js (Fase 2 - F-03)
 * Responsável por prover uma Dica do Dia contextualizada com o perfil familiar
 * Salva no AsyncStorage para garantir que a dica só mude uma vez por dia.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAFETY_ARTICLES } from '../data/SafetyArticlesDB';
import ProfileService from './ProfileService';

const DICA_CACHE_KEY = '@vigilaro_dica_dia';

class DicaService {
    
    // Converte o tipo do ProfileContext para as tags usadas no BD
    _mapProfileToTags(profiles) {
        if (!profiles || profiles.length === 0) return ['casa', 'manutencao'];
        
        let tagsSet = new Set();
        profiles.forEach(p => {
            if (p.tipo === 'crianca') {
                if (p.idade <= 2) tagsSet.add('bebe');
                else tagsSet.add('crianca');
            }
            if (p.tipo === 'idoso') tagsSet.add('idoso');
            if (p.tipo === 'pet') tagsSet.add('pets');
            if (p.gestante) tagsSet.add('saude');
        });
        
        return Array.from(tagsSet);
    }

    async getDicaDoDiaContextual(profiles) {
        try {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const cachedDataStr = await AsyncStorage.getItem(DICA_CACHE_KEY);
            
            if (cachedDataStr) {
                const cachedData = JSON.parse(cachedDataStr);
                if (cachedData.date === today && cachedData.articleId) {
                    const article = SAFETY_ARTICLES.find(a => a.id === cachedData.articleId);
                    if (article) return this._formatDica(article, profiles);
                }
            }

            // Se não tem cache do dia, gerar uma nova dica
            const userTags = this._mapProfileToTags(profiles);
            
            // 1. Tenta encontrar artigos que dão "match" com o perfil da família
            let matchedArticles = SAFETY_ARTICLES.filter(art => 
                art.tags && art.tags.some(t => userTags.includes(t))
            );

            // 2. Reforço de Contexto pela Residência (Ex: Casa dos Sogros -> Focar em Idoso)
            const activeResName = await ProfileService.getActiveResidenceName();
            const resNameLower = (activeResName || '').toLowerCase();
            const isElderlyContext = resNameLower.includes('sogro') || resNameLower.includes('vó') || resNameLower.includes('vô') || resNameLower.includes('idoso');
            
            if (isElderlyContext && !userTags.includes('idoso')) {
                const elderlyArticles = SAFETY_ARTICLES.filter(art => art.tags?.includes('idoso'));
                matchedArticles = [...matchedArticles, ...elderlyArticles];
            }

            // 3. Filtragem de Exclusão: Não mostrar Bebê/Criança se não houver no perfil
            // A menos que o matchedArticles esteja vazio, limpamos os irrelevantes
            const hasBebeInProfiles = userTags.includes('bebe');
            const hasCriancaInProfiles = userTags.includes('crianca');
            
            if (matchedArticles.length > 0) {
                matchedArticles = matchedArticles.filter(art => {
                    const isBebeArt = art.tags?.includes('bebe');
                    const isCriancaArt = art.tags?.includes('crianca');
                    
                    if (isBebeArt && !hasBebeInProfiles) return false;
                    if (isCriancaArt && !hasCriancaInProfiles && !hasBebeInProfiles) return false;
                    return true;
                });
            }

            // 4. Fallback para Artigos Universais (Casa, Manutenção, Fogo, etc.)
            if (matchedArticles.length === 0) {
                matchedArticles = SAFETY_ARTICLES.filter(art => {
                    const isSpecific = art.tags?.some(t => ['bebe', 'crianca', 'idoso', 'pets'].includes(t));
                    return !isSpecific || (isElderlyContext && art.tags?.includes('idoso'));
                });
            }

            // Fallback absoluto se a filtragem for agressiva demais
            if (matchedArticles.length === 0) matchedArticles = SAFETY_ARTICLES;

            // Sorteia um artigo
            const randomIndex = Math.floor(Math.random() * matchedArticles.length);
            const selectedArticle = matchedArticles[randomIndex];

            // Salva no cache do dia
            await AsyncStorage.setItem(DICA_CACHE_KEY, JSON.stringify({
                date: today,
                articleId: selectedArticle.id
            }));

            return this._formatDica(selectedArticle, profiles);


        } catch (error) {
            if (__DEV__) { console.error('[DicaService] Erro ao buscar dica do dia:', error); }
            return null;
        }
    }

    // Formata o artigo para um card rápido de Dica do Dia
    _formatDica(article, profiles) {
        const hasBebe = profiles.some(p => p.tipo === 'crianca' && p.idade <= 2);
        const hasIdoso = profiles.some(p => p.tipo === 'idoso');
        const hasPet = profiles.some(p => p.tipo === 'pet');
        const hasCrianca = profiles.some(p => p.tipo === 'crianca' && p.idade > 2);

        let contextoMessage = "Dica de Segurança para sua Casa";
        if (article.tags?.includes('bebe') && hasBebe) contextoMessage = "Protegendo os bebês da casa";
        else if (article.tags?.includes('idoso') && hasIdoso) contextoMessage = "Segurança e cuidado na terceira idade";
        else if (article.tags?.includes('pets') && hasPet) contextoMessage = "Ambiente seguro para seus pets";
        else if (article.tags?.includes('crianca') && hasCrianca) contextoMessage = "Ambiente seguro para as crianças";



        return {
            id: article.id,
            contexto: contextoMessage,
            titulo: article.title,
            resumo: article.summary,
            // Passamos o artigo completo caso a Ui queira navegar para a tela de leitura
            article_ref: article 
        };
    }
}

export default new DicaService();
