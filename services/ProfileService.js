/**
 * ProfileService.js
 * Serviço Unificado de Perfis - Vigilaro Care
 *
 * Gerencia: Moradia + Perfis (Pessoas/Pets) + Contatos
 * Chave única: @vigilaro_data
 *
 * "Prevenção Inteligente" - Quem sou, onde vivo, o que tenho onde vivo
 *
 * CORREÇÕES APLICADAS:
 * #1 — getActiveResidence() adicionado: retorna objeto completo da residência ativa
 * #2 — setActivePerfil() adicionado como alias de setPerfilAtivo() para compatibilidade
 * #3 — getFaixaEtaria() corrigido: retorna string (id) diretamente, não objeto
 * #4 — resolveImageUri() cobre URIs com prefixo file://
 * #5 — resolveImageUri() em getAllPerfis() e getPerfis() sem dupla resolução
 * #6 — saveMapping() sincroniza moradia.caracteristicas atomicamente com mapping
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import LegacyMigrationService from './LegacyMigrationService';
import { getDefaultData, getDefaultProfile, VIGILARO_DATA_KEY } from './ProfileModels';
import { areasInternas } from '../data/areas_internas';
import { areasExternas } from '../data/areas_externas';
import { Storage } from '../utils/SecureStorage';

class ProfileService {

    /**
     * Carrega todos os dados do Vigilaro.
     * Se não existir, retorna estrutura padrão.
     * Se existir dados antigos, faz migração.
     */
    static async getData() {
        try {
            const dataJson = await Storage.getItem(VIGILARO_DATA_KEY);

            if (dataJson) {
                return JSON.parse(dataJson);
            }

            const needsMigration = await LegacyMigrationService.checkNeedsMigration();

            if (needsMigration) {
                return await LegacyMigrationService.migrateFromLegacy();
            }

            return getDefaultData();
        } catch (error) {
            if (__DEV__) { console.error('ProfileService.getData error:', error); }
            return getDefaultData();
        }
    }

    /**
     * Salva todos os dados do Vigilaro.
     */
    static async saveData(data) {
        try {
            data.dataAtualizacao = new Date().toISOString();
            await Storage.setItem(VIGILARO_DATA_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            if (__DEV__) { console.error('ProfileService.saveData error:', error); }
            return false;
        }
    }

    /**
     * Persiste uma imagem do cache temporário para o documentDirectory.
     * Retorna apenas o NOME do arquivo para persistência no AsyncStorage (caminho relativo).
     * @param {string} tempUri - URI temporária vinda do ImagePicker
     * @param {string} prefix - Prefixo para o nome do arquivo (ex: 'profile', 'med')
     */
    static async persistImage(tempUri, prefix = 'img') {
        if (!tempUri) return null;

        // Se já for apenas um nome de arquivo (sem / e sem ://), assume que já está persistido
        if (!tempUri.includes('/') && !tempUri.includes('://')) {
            return tempUri;
        }

        // Se for uma URI que já aponta para o documentDirectory, extrai apenas o nome
        if (tempUri.includes(FileSystem.documentDirectory)) {
            return tempUri.split('/').pop();
        }

        try {
            const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
            const ext = tempUri.split('.').pop()?.split('?')[0] || 'jpg';
            const fileName = `${prefix}_${uniqueId}.${ext}`;
            const permanentUri = FileSystem.documentDirectory + fileName;

            await FileSystem.copyAsync({ from: tempUri, to: permanentUri });
            return fileName; // Retorna apenas o nome do arquivo
        } catch (error) {
            if (__DEV__) { console.error('ProfileService.persistImage error:', error); }
            // Fallback para a temporária se falhar — risco de perda futura, mas evita crash
            return tempUri;
        }
    }

    /**
     * Resolve um nome de arquivo ou URI salva para uma URI completa utilizável pela UI.
     *
     * FIX #4: Adicionado tratamento para URIs com prefixo file://
     * FIX #5: Método é idempotente — se a URI já estiver resolvida (contém documentDirectory),
     *         retorna sem modificação, evitando duplicação de path.
     */
    static resolveImageUri(uri) {
        if (!uri) return null;

        // URIs remotas ou de sistema — retornar como estão
        if (uri.startsWith('http') || uri.startsWith('content://') || uri.startsWith('assets-library://')) {
            return uri;
        }

        // FIX #4: URI file:// — retornar como está (válida para Image em RN)
        if (uri.startsWith('file://')) {
            return uri;
        }

        // FIX #5: Se já contém o documentDirectory, já está resolvida — não duplicar
        if (uri.includes(FileSystem.documentDirectory)) {
            return uri;
        }

        // Caminho absoluto legado contendo DocumentPicker ou /Documents/
        if (uri.includes('DocumentPicker') || uri.includes('/Documents/')) {
            const fileName = uri.split('/').pop();
            return FileSystem.documentDirectory + fileName;
        }

        // Nome de arquivo relativo sem barras nem protocolo
        if (!uri.includes('/') && !uri.includes('://')) {
            return FileSystem.documentDirectory + uri;
        }

        return uri;
    }

    // ==========================================
    // GESTÃO DE RESIDÊNCIAS (Multi-Home)
    // ==========================================

    static async getResidences() {
        const data = await this.getData();
        if (!data.residences || data.residences.length === 0) {
            const initialResidence = {
                id: 'default_home',
                nome: 'Minha Casa Principal',
                moradia: data.moradia || {},
                mapping: [],
                checklists: {},
                foto: null
            };
            data.residences = [initialResidence];
            data.activeResidenceId = 'default_home';
            await this.saveData(data);
        }
        return data.residences.map(r => ({ ...r, foto: this.resolveImageUri(r.foto) }));
    }

    static async getActiveResidenceId() {
        const data = await this.getData();
        return data.activeResidenceId || 'default_home';
    }

    /**
     * FIX #1: Retorna o objeto COMPLETO da residência ativa.
     * Usado por OndeProtegerScreen e NewHomeWizardScreenNeo para obter
     * mapping, moradia e outros dados em uma única chamada.
     */
    static async getActiveResidence() {
        const data = await this.getData();

        if (!data.residences || data.residences.length === 0) {
            // Inicializa se necessário
            await this.getResidences();
            return await this.getActiveResidence();
        }

        const activeId = data.activeResidenceId || 'default_home';
        const activeRes = data.residences.find(r => r.id === activeId) || data.residences[0];

        if (!activeRes) return null;

        // Resolve foto da residência antes de retornar
        return { ...activeRes, foto: this.resolveImageUri(activeRes.foto) };
    }

    static async getActiveResidenceName() {
        const data = await this.getData();
        const activeId = data.activeResidenceId || 'default_home';
        const res = data.residences?.find(r => r.id === activeId);
        return res ? res.nome : 'Minha Casa';
    }

    static async setActiveResidence(residenceId) {
        const data = await this.getData();
        const exists = data.residences?.find(r => r.id === residenceId);
        if (exists) {
            data.activeResidenceId = residenceId;
            await this.saveData(data);
            return true;
        }
        return false;
    }

    static async addResidence(nome) {
        const data = await this.getData();
        if (!data.residences) {
            data.residences = await this.getResidences();
        }

        const newId = Date.now().toString();
        const newResidence = {
            id: newId,
            nome,
            moradia: {},
            mapping: [],
            checklists: {},
            foto: null,
            dataCriacao: new Date().toISOString()
        };
        data.residences.push(newResidence);
        data.activeResidenceId = newId;

        await this.saveData(data);
        return newResidence;
    }

    /**
     * Remove uma residência. Não permite remover se for a única.
     */
    static async removeResidence(residenceId) {
        const data = await this.getData();
        if (!data.residences || data.residences.length <= 1) return false;

        data.residences = data.residences.filter(r => r.id !== residenceId);

        if (data.activeResidenceId === residenceId) {
            data.activeResidenceId = data.residences[0].id;
        }

        return await this.saveData(data);
    }

    /**
     * Atualiza o nome de uma residência.
     */
    static async updateResidenceName(residenceId, newName) {
        const data = await this.getData();
        if (!data.residences) return false;

        const index = data.residences.findIndex(r => r.id === residenceId);
        if (index !== -1) {
            data.residences[index].nome = newName;
            data.residences[index].ultimaAtualizacao = new Date().toISOString();
            return await this.saveData(data);
        }
        return false;
    }

    /**
     * Atualiza a foto de uma residência.
     */
    static async updateResidencePhoto(residenceId, photoUri) {
        if (!photoUri) return false;
        const data = await this.getData();
        if (!data.residences) return false;

        const index = data.residences.findIndex(r => r.id === residenceId);
        if (index !== -1) {
            try {
                const persistentName = await this.persistImage(photoUri, `home_${residenceId}`);
                data.residences[index].foto = persistentName;
                data.residences[index].ultimaAtualizacao = new Date().toISOString();
                return await this.saveData(data);
            } catch (e) {
                if (__DEV__) { console.error('updateResidencePhoto error:', e); }
                return false;
            }
        }
        return false;
    }

    // ==========================================
    // MÉTODOS DE ACESSO (Context-Aware)
    // ==========================================

    /**
     * Retorna a moradia da residência ATIVA.
     */
    static async getMoradia() {
        const data = await this.getData();
        if (!data.residences) {
            return data.moradia || {};
        }

        const activeId = data.activeResidenceId || 'default_home';
        const activeRes = data.residences?.find(r => r.id === activeId) || data.residences?.[0];

        return activeRes ? (activeRes.moradia || {}) : {};
    }

    /**
     * Salva dados da moradia na residência ATIVA.
     */
    static async saveMoradia(moradiaData) {
        const data = await this.getData();

        if (!data.residences) {
            data.residences = await this.getResidences();
        }

        const activeId = data.activeResidenceId || 'default_home';
        const index = data.residences.findIndex(r => r.id === activeId);

        if (index !== -1) {
            const currentMoradia = data.residences[index].moradia || {};

            // Merge profundo para estrutura (sub-objeto)
            let newEstrutura = currentMoradia.estrutura || {};
            if (moradiaData.estrutura) {
                newEstrutura = { ...newEstrutura, ...moradiaData.estrutura };
            }

            data.residences[index].moradia = {
                ...currentMoradia,
                ...moradiaData,
                estrutura: newEstrutura,
                ultimaAtualizacao: new Date().toISOString()
            };

            // Mantém sync básico no root para retrocompatibilidade
            data.moradia = { ...data.moradia, ...moradiaData };

            return await this.saveData(data);
        }
        return false;
    }

    /**
     * Migração V2 — adiciona campo `comodosUsados` em perfis legados.
     *
     * Idempotente: roda só uma vez, marca flag `@vigilaro/schema_v2_migrated`.
     *
     * Estratégia conservadora: perfis sem o campo recebem `comodosUsados`
     * = todos os cômodos do mapping atual. Mantém o comportamento atual
     * (cômodos do mapping aparecem na vistoria pra todos), e o usuário
     * pode refinar depois via Hub "Seu mapa sensível" (D6).
     *
     * @returns {Promise<{migrated: number, skipped: boolean}>}
     */
    static async migrateProfilesV2() {
        const FLAG_KEY = '@vigilaro/schema_v2_migrated';
        try {
            const alreadyDone = await AsyncStorage.getItem(FLAG_KEY);
            if (alreadyDone === '1') {
                return { migrated: 0, skipped: true };
            }

            const data = await this.getData();
            if (!data.perfis || data.perfis.length === 0) {
                // Sem perfis → marca como migrado pra não testar de novo
                await AsyncStorage.setItem(FLAG_KEY, '1');
                return { migrated: 0, skipped: true };
            }

            // Pega o mapping atual como conjunto de cômodos "padrão" pra cada
            // perfil antigo (estratégia conservadora — não muda comportamento)
            const mapping = await this.getMapping();
            const allRoomIds = Array.isArray(mapping)
                ? mapping.map((m) => (typeof m === 'string' ? m : m?.id)).filter(Boolean)
                : [];

            let migratedCount = 0;
            for (const p of data.perfis) {
                if (!Array.isArray(p.comodosUsados)) {
                    p.comodosUsados = [...allRoomIds];
                    p.schemaVersion = 2;
                    p.dataAtualizacao = new Date().toISOString();
                    migratedCount += 1;
                }
            }

            if (migratedCount > 0) {
                await this.saveData(data);
            }
            await AsyncStorage.setItem(FLAG_KEY, '1');

            if (__DEV__) {
                console.log(
                    `[ProfileService] migrateProfilesV2: ${migratedCount} perfil(is) migrado(s) com ${allRoomIds.length} cômodo(s) padrão.`
                );
            }
            return { migrated: migratedCount, skipped: false };
        } catch (error) {
            if (__DEV__) {
                console.error('[ProfileService.migrateProfilesV2] erro:', error);
            }
            return { migrated: 0, skipped: false, error: error?.message };
        }
    }

    /**
     * Retorna TODOS os perfis (global), sem resolução dupla de URI.
     *
     * FIX #5: resolveImageUri aplicado apenas aqui, uma única vez.
     * getPerfis() filtra a partir desta lista já resolvida.
     */
    static async getAllPerfis() {
        const data = await this.getData();
        const perfis = data.perfis || [];
        return perfis.map(p => ({ ...p, foto: this.resolveImageUri(p.foto) }));
    }

    /**
     * Retorna os perfis da residência ATIVA.
     *
     * FIX #5: Usa getAllPerfis() como fonte (já com URI resolvida),
     * evitando dupla resolução de foto.
     */
    static async getPerfis() {
        const todos = await this.getAllPerfis(); // FIX #5: URIs já resolvidas aqui

        const data = await this.getData();
        const activeId = await this.getActiveResidenceId();
        const activeRes = data.residences?.find(r => r.id === activeId);

        let result = [];

        if (activeRes) {
            const habitantes = activeRes.moradia?.habitantes || [];
            const frequentadores = activeRes.moradia?.frequentadores || [];

            if (habitantes.length > 0 || frequentadores.length > 0) {
                result = todos
                    .filter(p => habitantes.includes(p.id) || frequentadores.includes(p.id))
                    .map(p => ({
                        ...p,
                        isVisitante: frequentadores.includes(p.id) && !habitantes.includes(p.id),
                        vinculoResidencia: frequentadores.includes(p.id) && !habitantes.includes(p.id)
                            ? 'frequentador'
                            : 'habitante'
                    }));
            } else if (todos.length > 0 && activeId === 'default_home' && (!data.residences || data.residences.length <= 1)) {
                // AUTO-REPAIR: perfis existem globalmente mas não estão vinculados
                // Isso acontece com dados criados antes da correção do addPerfil.
                // Vincular todos como habitantes da casa ativa.
                const resIndex = data.residences.findIndex(r => r.id === activeId);
                if (resIndex !== -1) {
                    if (!data.residences[resIndex].moradia) {
                        data.residences[resIndex].moradia = {};
                    }
                    data.residences[resIndex].moradia.habitantes = todos.map(p => p.id);
                    await this.saveData(data);
                    if (__DEV__) console.log('[ProfileService] Auto-repair: vinculou', todos.length, 'perfis órfãos à casa ativa');
                }
                result = todos.map(p => ({ ...p, isVisitante: false, vinculoResidencia: 'habitante' }));
            }
        } else {
            // Fallback de emergência caso não exista nenhuma residência (app legado)
            result = todos.map(p => ({ ...p, isVisitante: false, vinculoResidencia: 'habitante' }));
        }

        // FIX #5: NÃO aplicar resolveImageUri novamente — já foi feito em getAllPerfis()
        return result;
    }

    /**
     * Retorna apenas perfis humanos da casa ativa.
     */
    static async getPerfisHumanos() {
        const perfis = await this.getPerfis();
        return perfis.filter(p => p.tipo === 'humano');
    }

    /**
     * Retorna apenas pets da casa ativa.
     */
    static async getPets() {
        const perfis = await this.getPerfis();
        return perfis.filter(p => p.tipo === 'pet');
    }

    /**
     * Retorna o perfil ativo.
     */
    static async getPerfilAtivo() {
        const perfis = await this.getPerfis();
        return perfis.find(p => p.ativo) || perfis[0] || null;
    }

    static async getPrimaryProfile() {
        return this.getPerfilAtivo();
    }

    /**
     * Retorna o próximo perfil pendente (criado pelo briefing mas não preenchido).
     */
    static async getNextPendingProfile() {
        const data = await this.getData();
        if (!data.perfis) return null;
        return data.perfis.find(p => p.pendente === true) || null;
    }

    /**
     * Verifica se ainda há perfis pendentes.
     */
    static async hasPendingProfiles() {
        const pending = await this.getNextPendingProfile();
        return !!pending;
    }

    /**
     * Define o perfil ativo pelo ID.
     */
    static async setPerfilAtivo(perfilId) {
        const data = await this.getData();
        data.perfis = data.perfis.map(p => ({ ...p, ativo: p.id === perfilId }));
        return await this.saveData(data);
    }

    /**
     * FIX #2: Alias de setPerfilAtivo para compatibilidade com NewHomeWizardScreenNeo
     * e outros locais que chamam setActivePerfil().
     */
    static async setActivePerfil(perfilId) {
        return this.setPerfilAtivo(perfilId);
    }

    static async addPerfil(perfilData, tipo = 'humano') {
        const data = await this.getData();
        const novoPerfil = { ...getDefaultProfile(tipo), ...perfilData };

        if (!data.perfis) data.perfis = [];

        if (data.perfis.length === 0) {
            novoPerfil.ativo = true;
        }

        data.perfis.push(novoPerfil);

        // GARANTIR que residences exista antes de vincular
        if (!data.residences || data.residences.length === 0) {
            data.residences = [{
                id: 'default_home',
                nome: 'Minha Casa Principal',
                moradia: { habitantes: [], frequentadores: [] },
                mapping: [],
                checklists: {},
                foto: null
            }];
            data.activeResidenceId = 'default_home';
        }

        // Vincular à casa ativa
        const activeId = data.activeResidenceId || 'default_home';
        const resIndex = data.residences.findIndex(r => r.id === activeId);
        if (resIndex !== -1) {
            if (!data.residences[resIndex].moradia) {
                data.residences[resIndex].moradia = {};
            }
            const vinculo = perfilData.vinculo === 'frequentador' ? 'frequentadores' : 'habitantes';
            if (!Array.isArray(data.residences[resIndex].moradia[vinculo])) {
                data.residences[resIndex].moradia[vinculo] = [];
            }
            // Evitar duplicatas
            if (!data.residences[resIndex].moradia[vinculo].includes(novoPerfil.id)) {
                data.residences[resIndex].moradia[vinculo].push(novoPerfil.id);
            }
        }

        await this.saveData(data);
        return novoPerfil;
    }

    /**
     * Vincula um perfil existente à casa ativa (se ainda não estiver).
     *
     * Preserva a distinção habitante × frequentador:
     * - se o perfil JÁ está vinculado, mantém o vínculo atual (não promove
     *   frequentador a habitante nem sobrescreve perfil.vinculo);
     * - se NÃO está vinculado, usa o vínculo declarado no próprio perfil
     *   (perfil.vinculo === 'frequentador' → frequentadores), com
     *   fallback 'habitante'.
     *
     * @param {string} perfilId
     * @param {'habitante'|'frequentador'} [relationship] - força um vínculo específico (opcional)
     */
    static async linkProfileToActiveResidence(perfilId, relationship = null) {
        if (!relationship) {
            const current = await this.getProfileResidenceRelationship(perfilId);
            if (current !== 'nenhum') {
                return true; // já vinculado — não sobrescreve a distinção
            }
            const data = await this.getData();
            const perfil = (data.perfis || []).find(p => p.id === perfilId);
            relationship = perfil?.vinculo === 'frequentador' ? 'frequentador' : 'habitante';
        }
        const relation = await this.setProfileResidenceRelationship(perfilId, relationship);
        return relation !== 'nenhum';
    }

    /**
     * Desvincula um perfil da residência ATIVA (remove de habitantes
     * E frequentadores) — sem deletar o perfil global. O perfil continua
     * existindo e pode estar vinculado a outras residências.
     *
     * Use quando o usuário diz: "fulano NÃO mora nesta casa".
     */
    static async unlinkProfileFromActiveResidence(perfilId) {
        const data = await this.getData();
        const activeId = data.activeResidenceId || 'default_home';
        const resIndex = (data.residences || []).findIndex(r => r.id === activeId);

        if (resIndex !== -1) {
            if (!data.residences[resIndex].moradia) return false;
            const m = data.residences[resIndex].moradia;
            const hadHabitante = Array.isArray(m.habitantes) && m.habitantes.includes(perfilId);
            const hadFrequentador = Array.isArray(m.frequentadores) && m.frequentadores.includes(perfilId);

            if (Array.isArray(m.habitantes)) {
                m.habitantes = m.habitantes.filter(id => id !== perfilId);
            }
            if (Array.isArray(m.frequentadores)) {
                m.frequentadores = m.frequentadores.filter(id => id !== perfilId);
            }

            if (hadHabitante || hadFrequentador) {
                await this.saveData(data);
                return true;
            }
        }
        return false;
    }

    /**
     * Verifica se um perfil está vinculado à residência ATIVA
     * (como habitante OU frequentador). Útil pra exibir checkbox
     * "fulano mora aqui?" em telas de gestão de residências.
     *
     * @returns {Promise<boolean>}
     */
    static async isProfileLinkedToActiveResidence(perfilId) {
        const data = await this.getData();
        const activeId = data.activeResidenceId || 'default_home';
        const activeRes = (data.residences || []).find(r => r.id === activeId);
        if (!activeRes?.moradia) return false;
        const m = activeRes.moradia;
        return (
            (Array.isArray(m.habitantes) && m.habitantes.includes(perfilId)) ||
            (Array.isArray(m.frequentadores) && m.frequentadores.includes(perfilId))
        );
    }

    static normalizeResidenceRelationship(relationship) {
        const value = String(relationship || '').toLowerCase();
        if (['habitante', 'morador', 'resident', 'residente'].includes(value)) return 'habitante';
        if (['frequentador', 'visitante', 'visitor'].includes(value)) return 'frequentador';
        return 'nenhum';
    }

    static async getProfileResidenceRelationship(perfilId, residenceId = null) {
        const data = await this.getData();
        const targetResidenceId = residenceId || data.activeResidenceId || 'default_home';
        const residence = (data.residences || []).find(r => r.id === targetResidenceId);
        const moradia = residence?.moradia || {};
        const habitantes = Array.isArray(moradia.habitantes) ? moradia.habitantes : [];
        const frequentadores = Array.isArray(moradia.frequentadores) ? moradia.frequentadores : [];

        if (habitantes.includes(perfilId)) return 'habitante';
        if (frequentadores.includes(perfilId)) return 'frequentador';
        return 'nenhum';
    }

    static async setProfileResidenceRelationship(perfilId, relationship, residenceId = null) {
        const data = await this.getData();
        if (!Array.isArray(data.residences) || data.residences.length === 0) {
            data.residences = [{
                id: 'default_home',
                nome: 'Minha Casa Principal',
                moradia: { habitantes: [], frequentadores: [] },
                mapping: [],
                checklists: {},
                foto: null
            }];
            data.activeResidenceId = 'default_home';
        }

        const targetResidenceId = residenceId || data.activeResidenceId || 'default_home';
        const resIndex = data.residences.findIndex(r => r.id === targetResidenceId);
        if (resIndex === -1) return 'nenhum';

        const normalized = this.normalizeResidenceRelationship(relationship);
        if (!data.residences[resIndex].moradia) data.residences[resIndex].moradia = {};
        const moradia = data.residences[resIndex].moradia;
        const habitantes = Array.isArray(moradia.habitantes) ? moradia.habitantes : [];
        const frequentadores = Array.isArray(moradia.frequentadores) ? moradia.frequentadores : [];

        moradia.habitantes = habitantes.filter(id => id !== perfilId);
        moradia.frequentadores = frequentadores.filter(id => id !== perfilId);

        if (normalized === 'habitante') {
            moradia.habitantes.push(perfilId);
        } else if (normalized === 'frequentador') {
            moradia.frequentadores.push(perfilId);
        }

        const profileIndex = (data.perfis || []).findIndex(p => p.id === perfilId);
        if (profileIndex !== -1 && normalized !== 'nenhum') {
            data.perfis[profileIndex].vinculo = normalized === 'frequentador' ? 'frequentador' : 'morador';
            data.perfis[profileIndex].dataAtualizacao = new Date().toISOString();
        }

        data.residences[resIndex].moradia = moradia;
        await this.saveData(data);
        return normalized;
    }

    /**
     * Atualiza um perfil existente pelo ID.
     */
    static async updatePerfil(perfilId, updates) {
        const data = await this.getData();
        const index = data.perfis.findIndex(p => p.id === perfilId);

        if (index !== -1) {
            data.perfis[index] = {
                ...data.perfis[index],
                ...updates,
                dataAtualizacao: new Date().toISOString()
            };
            await this.saveData(data);
            return data.perfis[index];
        }

        return null;
    }

    /**
     * Remove um perfil e limpa seus vínculos de todas as residências.
     */
    static async removePerfil(perfilId) {
        const data = await this.getData();
        data.perfis = data.perfis.filter(p => p.id !== perfilId);

        // Se removeu o perfil ativo, ativa o primeiro disponível
        if (!data.perfis.find(p => p.ativo) && data.perfis.length > 0) {
            data.perfis[0].ativo = true;
        }

        // [FIX-A01] Remove o ID de habitantes/frequentadores de TODAS as residências
        if (data.residences) {
            data.residences = data.residences.map(residence => {
                if (residence.moradia) {
                    if (Array.isArray(residence.moradia.habitantes)) {
                        residence.moradia.habitantes = residence.moradia.habitantes.filter(
                            id => id !== perfilId
                        );
                    }
                    if (Array.isArray(residence.moradia.frequentadores)) {
                        residence.moradia.frequentadores = residence.moradia.frequentadores.filter(
                            id => id !== perfilId
                        );
                    }
                }
                return residence;
            });
        }

        return await this.saveData(data);
    }

    /**
     * Verifica se o onboarding foi completo.
     */
    static async isOnboardingCompleto() {
        const data = await this.getData();
        return data.onboardingCompleto;
    }

    /**
     * Marca onboarding como completo.
     */
    static async setOnboardingCompleto() {
        const data = await this.getData();
        data.onboardingCompleto = true;
        return await this.saveData(data);
    }

    /**
     * Calcula idade a partir da data de nascimento.
     * Aceita formato ISO (YYYY-MM-DD) e legado BR (DD/MM/YYYY).
     */
    static calcularIdade(dataNascimento) {
        if (!dataNascimento) return null;

        let birthDate;
        if (dataNascimento.includes('-')) {
            birthDate = new Date(dataNascimento);
        } else if (dataNascimento.includes('/')) {
            const parts = dataNascimento.split('/');
            if (parts.length !== 3) return null;
            birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
        } else {
            return null;
        }

        if (isNaN(birthDate.getTime())) return null;

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    /**
     * Determina faixa etária baseada na idade calculada.
     *
     * FIX #3: Retorna o ID (string) diretamente em vez de um objeto,
     * para compatibilidade com comparações como:
     *   ProfileService.getFaixaEtaria(p.dataNascimento) === 'baby'
     *
     * Mapa de IDs:
     *   0-2 anos   → 'baby'
     *   3-11 anos  → 'child'
     *   12-17 anos → 'teen'
     *   18-59 anos → 'adult'
     *   60+ anos   → 'elderly'
     *
     * Para obter label e risco completos, use getFaixaEtariaDetalhada().
     */
    static getFaixaEtaria(dataNascimento) {
        const idade = this.calcularIdade(dataNascimento);
        if (idade === null) return null;

        if (idade < 3)  return 'baby';
        if (idade < 12) return 'child';
        if (idade < 18) return 'teen';
        if (idade < 60) return 'adult';
        return 'elderly';
    }

    /**
     * Retorna faixa etária detalhada com label e nível de risco.
     * Use quando precisar do objeto completo (ex: UI, relatórios).
     */
    static getFaixaEtariaDetalhada(dataNascimento) {
        const idade = this.calcularIdade(dataNascimento);
        if (idade === null) return null;

        if (idade < 1)  return { id: 'baby',     label: 'Bebê (0-1 ano)',           risco: 'alto'  };
        if (idade < 3)  return { id: 'baby',      label: 'Bebê (1-3 anos)',           risco: 'alto'  };
        if (idade < 6)  return { id: 'child',     label: 'Criança pequena (3-6 anos)', risco: 'alto' };
        if (idade < 12) return { id: 'child',     label: 'Criança (6-12 anos)',       risco: 'medio' };
        if (idade < 18) return { id: 'teen',      label: 'Adolescente (12-18 anos)',  risco: 'baixo' };
        if (idade < 60) return { id: 'adult',     label: 'Adulto (18-60 anos)',       risco: 'baixo' };
        if (idade < 80) return { id: 'elderly',   label: 'Idoso (60-80 anos)',        risco: 'medio' };
        return           { id: 'elderly',         label: 'Idoso (80+ anos)',          risco: 'alto'  };
    }

    // ==========================================
    // PREVENÇÃO INTELIGENTE
    // ==========================================

    /**
     * Analisa riscos baseados na moradia e nos perfis da residência ativa.
     * FIX #3: Atualizado para usar getFaixaEtariaDetalhada() onde o objeto é necessário
     * e getFaixaEtaria() (string) nas comparações simples.
     */
    static async analisarRiscos() {
        const moradia = await this.getMoradia();
        const perfis = await this.getPerfis();

        const riscos = [];

        // 1. Piscina + crianças pequenas
        if (moradia.caracteristicas?.includes('piscina')) {
            const criancasPequenas = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && idade < 6;
            });

            if (criancasPequenas.length > 0) {
                riscos.push({
                    nivel: 'CRITICO',
                    titulo: 'Piscina + Crianças Pequenas',
                    descricao: `${criancasPequenas.length} criança(s) pequena(s) em casa com piscina`,
                    recomendacao: 'Verifique: grades de proteção, alarme de piscina, supervisão constante',
                    perfisAfetados: criancasPequenas.map(p => p.nome),
                });
            }
        }

        // 2. Escadas + idosos ou crianças
        if (moradia.caracteristicas?.includes('escadas') || moradia.andares > 1) {
            const vulneraveis = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && (idade < 5 || idade > 65);
            });

            if (vulneraveis.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Escadas + Pessoas Vulneráveis',
                    descricao: 'Risco de queda para crianças pequenas e idosos',
                    recomendacao: 'Verifique: portões de segurança, corrimãos, iluminação',
                    perfisAfetados: vulneraveis.map(p => p.nome),
                });
            }
        }

        // 3. Jardim + pets
        if (moradia.caracteristicas?.includes('jardim')) {
            const pets = perfis.filter(p => p.tipo === 'pet');

            if (pets.length > 0) {
                riscos.push({
                    nivel: 'MEDIO',
                    titulo: 'Jardim + Pets',
                    descricao: 'Possíveis plantas tóxicas para animais',
                    recomendacao: 'Verifique: plantas tóxicas, cercamento, produtos químicos de jardinagem',
                    perfisAfetados: pets.map(p => p.nome),
                });
            }
        }

        // 4. Gás + idosos
        if (moradia.utilidades === 'gas_encanado' || moradia.utilidades === 'botijao') {
            const idosos = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && idade > 65;
            });

            if (idosos.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Gás + Idosos',
                    descricao: 'Risco de esquecimento de fogão ligado',
                    recomendacao: 'Considere: detector de gás, fogão com desligamento automático, timer',
                    perfisAfetados: idosos.map(p => p.nome),
                });
            }
        }

        // 5. Varanda/Sacada + crianças
        if (moradia.caracteristicas?.includes('varanda')) {
            const criancas = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && idade < 12;
            });

            if (criancas.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Varanda/Sacada + Crianças',
                    descricao: 'Risco de queda de altura',
                    recomendacao: 'Verifique: redes de proteção, altura do guarda-corpo, móveis que permitam escalar',
                    perfisAfetados: criancas.map(p => p.nome),
                    icon: 'resize-outline',
                });
            }
        }

        // 6. Lareira/Churrasqueira + crianças pequenas
        if (moradia.caracteristicas?.includes('lareira') || moradia.caracteristicas?.includes('churrasqueira')) {
            const criancasPequenas = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && idade < 6;
            });

            if (criancasPequenas.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Fogo Aberto + Crianças',
                    descricao: 'Risco de queimaduras por lareira ou churrasqueira',
                    recomendacao: 'Mantenha supervisão, use grades de proteção, ensine sobre o perigo',
                    perfisAfetados: criancasPequenas.map(p => p.nome),
                    icon: 'flame-outline',
                });
            }
        }

        // 7. Bebês (0-2 anos)
        const bebes = perfis.filter(p => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === 'humano' && idade !== null && idade < 2;
        });

        if (bebes.length > 0) {
            riscos.push({
                nivel: 'CRITICO',
                titulo: 'Proteção para Bebês',
                descricao: 'Bebês exploram tudo! Verifique tomadas e peças pequenas no chão AGORA.',
                recomendacao: 'Use protetores de tomada e travas de gaveta.',
                perfisAfetados: bebes.map(p => p.nome),
                icon: 'happy',
                color: '#E91E63'
            });
        }

        // 8. Idoso morando sozinho
        const idososSozinhos = perfis.filter(p => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === 'humano' && idade !== null && idade > 70;
        });

        if (idososSozinhos.length > 0 && perfis.filter(p => p.tipo === 'humano').length === 1) {
            riscos.push({
                nivel: 'ALTO',
                titulo: 'Apoio ao Idoso',
                descricao: 'Mora sozinho? Configure o Botão de Pânico e cheque os tapetes.',
                recomendacao: 'Evite tapetes soltos e instale barras de apoio.',
                perfisAfetados: idososSozinhos.map(p => p.nome),
                icon: 'heart',
                color: '#D32F2F'
            });
        }

        // 9. Pets (geral)
        const pets = perfis.filter(p => p.tipo === 'pet');
        if (pets.length > 0) {
            riscos.push({
                nivel: 'INFO',
                titulo: 'Segurança Pet',
                descricao: 'Cuidado com plantas tóxicas e acesso à rua.',
                recomendacao: 'Mantenha portões fechados e produtos de limpeza no alto.',
                perfisAfetados: pets.map(p => p.nome),
                icon: 'paw',
                color: '#FF9800'
            });
        }

        // 10. Sazonalidade
        const mes = new Date().getMonth(); // 0=Jan, 11=Dez
        if (mes >= 11 || mes <= 2) {
            riscos.push({
                nivel: 'INFO',
                titulo: 'Verão e Chuvas',
                descricao: 'Risco de dengue e tempestades. Limpe calhas e vasos hoje!',
                recomendacao: 'Verifique telhados e elimine água parada.',
                icon: 'thunderstorm',
                color: '#1976D2'
            });
        }
        if (mes >= 5 && mes <= 7) {
            riscos.push({
                nivel: 'ALTO',
                titulo: 'Inverno Seguro',
                descricao: 'Vai ligar aquecedor? Atenção à ventilação para evitar CO.',
                recomendacao: 'Nunca durma com aquecedor a gás em quarto fechado.',
                icon: 'snow',
                color: '#0288D1'
            });
        }

        // 11. Oficina/Garagem com ferramentas
        if (moradia.caracteristicas?.includes('oficina') || moradia.caracteristicas?.includes('garagem')) {
            const curiosos = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'pet' || (p.tipo === 'humano' && idade !== null && idade < 10);
            });

            if (curiosos.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Ferramentas e Químicos',
                    descricao: 'Garagem/Oficina contém itens perigosos para crianças e pets.',
                    recomendacao: 'Mantenha ferramentas trancadas e produtos químicos no alto.',
                    perfisAfetados: curiosos.map(p => p.nome),
                    icon: 'construct',
                    color: '#FF5722'
                });
            }
        }

        // 12. Quintal/Depósito (animais peçonhentos)
        if (moradia.caracteristicas?.includes('quintal') || moradia.caracteristicas?.includes('deposito')) {
            riscos.push({
                nivel: 'MEDIO',
                titulo: 'Atenção ao Quintal/Depósito',
                descricao: 'Áreas de acúmulo podem atrair escorpiões e aranhas.',
                recomendacao: 'Mantenha limpo, use telas nos ralos e evite entulhos.',
                perfisAfetados: perfis.map(p => p.nome),
                icon: 'bug',
                color: '#795548'
            });
        }

        // 13. Banheiro (quedas e afogamento)
        if (moradia.caracteristicas?.includes('banheiro')) {
            const idososOuCriancas = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && (idade < 6 || idade > 65);
            });

            if (idososOuCriancas.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Segurança no Banheiro',
                    descricao: 'Piso molhado é risco de queda grave.',
                    recomendacao: 'Use tapetes antiderrapantes e instale barras de apoio.',
                    perfisAfetados: idososOuCriancas.map(p => p.nome),
                    icon: 'water',
                    color: '#00BCD4'
                });
            }
        }

        // =============================================
        // EQUIPAMENTOS (moradia.equipamentos) — NOVO
        // Cruzamento QUEM x O QUÊ
        // =============================================
        const equipamentos = moradia.equipamentos || [];

        // 14. Fogão a Gás + crianças ou idosos
        if (equipamentos.includes('fogao_gas')) {
            const vulneraveis = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && (idade < 6 || idade > 65);
            });
            if (vulneraveis.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Fogão a Gás + Vulneráveis',
                    descricao: 'Risco de queimaduras e vazamento de gás com crianças ou idosos.',
                    recomendacao: 'Instale detector de gás, use travas nos botões e supervisione o uso.',
                    perfisAfetados: vulneraveis.map(p => p.nome),
                    icon: 'flame-outline',
                    color: '#FF5722'
                });
            }
        }

        // 15. Aquecedor a Gás + ambiente fechado
        if (equipamentos.includes('aquecedor_gas')) {
            riscos.push({
                nivel: 'CRITICO',
                titulo: 'Aquecedor a Gás (Monóxido de Carbono)',
                descricao: 'Nunca durma com aquecedor a gás ligado em ambiente fechado.',
                recomendacao: 'Mantenha janela aberta, instale detector de CO. Risco fatal!',
                icon: 'snow',
                color: '#D32F2F'
            });
        }

        // 16. Piscina (equipamento) + crianças
        if (equipamentos.includes('piscina') && !moradia.caracteristicas?.includes('piscina')) {
            const criancas = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && idade < 12;
            });
            if (criancas.length > 0) {
                riscos.push({
                    nivel: 'CRITICO',
                    titulo: 'Piscina + Crianças',
                    descricao: `${criancas.length} criança(s) em residência com piscina.`,
                    recomendacao: 'Grade de proteção obrigatória, alarme de piscina, supervisão constante.',
                    perfisAfetados: criancas.map(p => p.nome),
                    icon: 'water',
                    color: '#E91E63'
                });
            }
        }

        // 17. Armas de Fogo
        if (equipamentos.includes('armas_fogo')) {
            const menores = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && idade < 18;
            });
            riscos.push({
                nivel: 'CRITICO',
                titulo: 'Arma de Fogo na Residência',
                descricao: menores.length > 0
                    ? `Arma de fogo em residência com ${menores.length} menor(es) de idade.`
                    : 'Arma de fogo declarada. Guarda segura é obrigatória.',
                recomendacao: 'Cofre com chave/biometria, munição separada, orientação aos moradores.',
                perfisAfetados: menores.map(p => p.nome),
                icon: 'shield',
                color: '#B71C1C'
            });
        }

        // 18. Ferramentas pesadas + crianças/pets
        if (equipamentos.includes('ferramentas_pesadas')) {
            const curiosos = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'pet' || (p.tipo === 'humano' && idade !== null && idade < 12);
            });
            if (curiosos.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Maquinário/Ferramentas + Curiosos',
                    descricao: 'Ferramentas pesadas acessíveis a crianças ou pets.',
                    recomendacao: 'Mantenha em área trancada, use protetores e supervisione.',
                    perfisAfetados: curiosos.map(p => p.nome),
                    icon: 'construct',
                    color: '#FF5722'
                });
            }
        }

        // 19. Escada Móvel + idosos
        if (equipamentos.includes('escada_movel')) {
            const idosos = perfis.filter(p => {
                const idade = this.calcularIdade(p.dataNascimento);
                return p.tipo === 'humano' && idade !== null && idade > 60;
            });
            if (idosos.length > 0) {
                riscos.push({
                    nivel: 'ALTO',
                    titulo: 'Escada Móvel + Idosos',
                    descricao: 'Risco de queda grave ao usar escada móvel.',
                    recomendacao: 'Sempre com acompanhante, prefira escada com barra lateral.',
                    perfisAfetados: idosos.map(p => p.nome),
                    icon: 'arrow-up',
                    color: '#FF9800'
                });
            }
        }

        return riscos;
    }

    /**
     * Limpa chaves antigas após confirmar migração.
     */
    static async cleanupLegacyKeys() {
        return await LegacyMigrationService.cleanupLegacyKeys();
    }

    // =============================================
    // INVENTÁRIO DE RISCOS (MAPA DE ATIVOS)
    // =============================================

    /**
     * Retorna lista de IDs de itens que o usuário possui na residência ativa.
     */
    static async getInventory() {
        const data = await this.getData();
        const activeId = await this.getActiveResidenceId();
        const activeRes = data.residences?.find(r => r.id === activeId);

        if (activeRes?.inventory) {
            return activeRes.inventory;
        }

        // Fallback para raiz (legado)
        return data.inventory || [];
    }

    /**
     * Salva o inventário na residência ativa.
     * @param {string[]} inventoryIds - Array de IDs dos itens (ex: ['airfryer', 'escada'])
     */
    static async saveInventory(inventoryIds) {
        const data = await this.getData();

        const activeId = await this.getActiveResidenceId();
        const resIndex = data.residences?.findIndex(r => r.id === activeId);

        if (resIndex !== -1 && data.residences) {
            data.residences[resIndex].inventory = inventoryIds;
            data.residences[resIndex].ultimaAtualizacao = new Date().toISOString();
            data.inventory = inventoryIds; // Backup na raiz para compatibilidade
            return await this.saveData(data);
        }
        return false;
    }

    // =============================================
    // RESET GERAL (DANGER ZONE)
    // =============================================

    static async cleanupUserFiles() {
        try {
            if (!FileSystem.documentDirectory) return;

            const entries = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory).catch(() => []);
            const userFilePrefixes = ['profile_', 'pet_', 'home_'];

            await Promise.all(entries.map(async (entry) => {
                const shouldDelete =
                    entry === 'panic_recordings' ||
                    userFilePrefixes.some(prefix => entry.startsWith(prefix));

                if (!shouldDelete) return;

                await FileSystem.deleteAsync(FileSystem.documentDirectory + entry, {
                    idempotent: true,
                }).catch(() => {});
            }));
        } catch (error) {
            if (__DEV__) { console.warn('ProfileService.cleanupUserFiles error:', error); }
        }
    }

    /**
     * Reseta TODO o app para o estado inicial.
     * Apaga perfis, moradia, riscos e tudo mais.
     */
    static async resetAllData() {
        try {
            if (__DEV__) { console.warn('⚠️ ProfileService: RESETANDO TUDO...'); }

            const existingData = await this.getData().catch(() => null);

            const KEYS_TO_NUKE = [
                VIGILARO_DATA_KEY,
                '@home_mapping',
                '@medical_disclaimer_accepted',
                '@vigilaro_medical_disclaimer_v1',
                '@vigilaro_xp',
                '@vigilaro_xp_history',
                '@onboarding_complete',
                '@daily_tips_read',
                '@analytics_consent',
                '@vigilaro_error_log',
                '@active_trip',
                'historicoAvaliacoes',
                'termsAccepted_v1',
            ];

            const SENSITIVE_KEYS_TO_NUKE = [
                VIGILARO_DATA_KEY,
                '@emergency_contacts',
                'contatos_emergencia',
                '@panic_button_state',
                '@medications',
                '@medications_timeline',
                '@medications_history',
                '@vigilaro_medications_v1',
                '@medical_history',
                '@treatments',
                '@appointments',
                '@procedures',
            ];

            const profileContactKeys = (existingData?.perfis || [])
                .map(profile => profile?.id)
                .filter(Boolean)
                .map(id => `@contacts_${id}`);

            await AsyncStorage.multiRemove(KEYS_TO_NUKE);
            await Promise.all(SENSITIVE_KEYS_TO_NUKE.map(key => Storage.removeItem(key)));

            // Limpeza de chaves de checklist
            const allKeys = await AsyncStorage.getAllKeys();
            const checklistKeys = allKeys.filter(key => key.startsWith('@checklist_state'));
            const contactKeys = Array.from(new Set([
                ...profileContactKeys,
                ...allKeys.filter(key => key.startsWith('@contacts_')),
            ]));
            if (checklistKeys.length > 0) {
                await AsyncStorage.multiRemove(checklistKeys);
                if (__DEV__) { console.log('Chaves de checklist removidas:', checklistKeys); }
            }
            await Promise.all(contactKeys.map(key => Storage.removeItem(key)));
            await this.cleanupUserFiles();

            // Limpa cache em memória do ChecklistService
            const { ChecklistService } = require('./ChecklistService');
            if (ChecklistService?.clearCache) {
                ChecklistService.clearCache();
            }

            // Reset de memória do GamificationService
            try {
                const GamificationService = require('./GamificationService').default;
                if (GamificationService?.init) {
                    GamificationService.currentXP = 0;
                    GamificationService.history = [];
                }
            } catch (e) {
                // Ignora problemas de dependência circular ou falha de reset
            }

            await LegacyMigrationService.cleanupLegacyKeys();

            const defaultData = getDefaultData();
            await this.saveData(defaultData);

            return true;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao resetar dados:', error); }
            return false;
        }
    }

    // =============================================
    // META E COMPLETUDE
    // =============================================

    /**
     * Retorna os metadados da família.
     */
    static async getMeta() {
        const data = await this.getData();
        return data.meta || { totalMoradoresEsperados: 0, totalPetsEsperados: 0 };
    }

    /**
     * Atualiza os metadados (quantos moradores/pets esperados).
     */
    static async setMeta(metaUpdates) {
        const data = await this.getData();
        data.meta = { ...data.meta, ...metaUpdates, ultimaAtualizacao: new Date().toISOString() };
        await this.saveData(data);
        return data.meta;
    }

    /**
     * Garante que existam perfis (mesmo que pendentes) para cumprir a meta.
     * Gera "perfis fantasmas" para preenchimento posterior.
     */
    static async ensureGhostProfiles(meta) {
        const data = await this.getData();

        await this._fillGhosts(data, meta.composicao.bebes_0_6,    'humano', 'bebe_0_6',    'Bebê (0-6m)');
        await this._fillGhosts(data, meta.composicao.bebes_7_12,   'humano', 'bebe_7_12',   'Bebê (7-12m)');
        await this._fillGhosts(data, meta.composicao.criancas_1_3, 'humano', 'crianca_1_3', 'Criança (1-3a)');
        await this._fillGhosts(data, meta.composicao.criancas_3_5, 'humano', 'crianca_3_5', 'Criança (3-5a)');
        await this._fillGhosts(data, meta.composicao.criancas_6_14,'humano', 'crianca_6_14','Criança (6-14a)');
        await this._fillGhosts(data, meta.composicao.adolescentes,  'humano', 'adolescente', 'Adolescente');
        await this._fillGhosts(data, meta.composicao.pcd,           'humano', 'pcd',         'Membro PcD');
        await this._fillGhosts(data, meta.composicao.adultos,       'humano', 'adulto',      'Adulto');
        await this._fillGhosts(data, meta.composicao.idosos,        'humano', 'idoso',       'Idoso');
        await this._fillGhosts(data, meta.composicao.pets,          'pet',    null,          'Pet');

        await this.saveData(data);
    }

    static async _fillGhosts(data, metaCount, tipo, faixaEtaria, labelBase) {
        if (!metaCount || metaCount <= 0) return;

        const existentes = data.perfis.filter(p => {
            if (p.tipo !== tipo) return false;
            if (tipo === 'pet') return true;
            return p.metaCategory === labelBase;
        }).length;

        const faltam = metaCount - existentes;
        if (faltam <= 0) return;

        for (let i = 0; i < faltam; i++) {
            const novoId = Date.now().toString() + Math.random().toString().slice(2, 5);
            const numero = existentes + i + 1;
            const novoPerfil = {
                id: novoId,
                nome: `${labelBase} ${numero} (Pendente)`,
                tipo,
                ativo: false,
                pendente: true,
                metaCategory: labelBase,
                foto: null,
                dataAtualizacao: new Date().toISOString()
            };

            if (tipo === 'humano' && faixaEtaria) {
                novoPerfil.faixaEtariaHint = faixaEtaria;
            }

            data.perfis.push(novoPerfil);
        }
    }

    /**
     * Calcula completude de um perfil individual (0-100%).
     */
    static calcularCompletudePerfil(perfil) {
        if (!perfil) return 0;
        let pontos = 0;
        const total = 5;

        if (perfil.nome) pontos++;
        if (perfil.dataNascimento) pontos++;
        if (perfil.tipo) pontos++;
        if (perfil.condicoesEspeciais?.length > 0 || perfil.condicoesEspeciais === null) pontos++;
        if (perfil.alergias?.length > 0 || perfil.alergias === null) pontos++;

        return Math.round((pontos / total) * 100);
    }

    /**
     * Calcula completude geral de todos os dados (família, estrutura, riscos, inventário, kits).
     */
    static async calcularCompletude() {
        const data = await this.getData();
        const moradia = data.moradia || {};
        const perfis = data.perfis || [];
        const meta = data.meta || { totalMoradoresEsperados: 0, totalPetsEsperados: 0 };

        // 1. Família
        const totalEsperado = (meta.totalMoradoresEsperados || 1) + (meta.totalPetsEsperados || 0);
        const totalCadastrado = perfis.length;
        const completudePorPerfil = perfis.map(p => this.calcularCompletudePerfil(p));
        const mediaCompletudePerfis = completudePorPerfil.length > 0
            ? completudePorPerfil.reduce((a, b) => a + b, 0) / completudePorPerfil.length
            : 0;

        const familia = totalEsperado > 0
            ? Math.min(Math.round((totalCadastrado / totalEsperado) * 50 + (mediaCompletudePerfis * 0.5)), 100)
            : (perfis.length > 0 ? 50 : 0);

        // 2. Estrutura
        let estrutura = 0;
        const est = moradia.estrutura || moradia;

        if (moradia.tipoImovel || moradia.tipo) estrutura += 30;
        if (moradia.andares) estrutura += 20;

        const hasMapping = ((est.caracteristicas || moradia.caracteristicas)?.length > 0) ||
            (data.residences?.find(r => r.id === data.activeResidenceId)?.mapping?.length > 0);

        if (hasMapping) estrutura += 50;

        // 3. Riscos (via ChecklistService)
        let riscos = 0;
        let ChecklistService = null;
        try {
            const ChecklistModule = require('./ChecklistService');
            ChecklistService = ChecklistModule.ChecklistService || ChecklistModule.default || ChecklistModule;
        } catch (e) {
            if (__DEV__) { console.error('[ScoreSync] Falha ao carregar ChecklistService:', e); }
        }

        const { AMBIENTES } = require('../data/mapeamento_dados');

        let safetyStats = null;
        try {
            const activeResId = await this.getActiveResidenceId();
            const mapping = await this.getMapping();
            const rawDefs = AMBIENTES || [];
            const allPerfis = await this.getPerfis();

            const FilterEngineModule = require('../utils/ProfileFilterEngine');
            const FilterEngine = FilterEngineModule.default || FilterEngineModule;
            const allDefs = FilterEngine.getRelevantAreas(rawDefs, moradia, allPerfis, mapping);

            if (allDefs.length > 0 && ChecklistService) {
                if (ChecklistService.getGlobalSafetyBreakdown) {
                    safetyStats = await ChecklistService.getGlobalSafetyBreakdown(allDefs, activeResId, mapping, moradia, allPerfis);
                    riscos = safetyStats.percentage;
                } else {
                    riscos = await ChecklistService.getGlobalSafetyScore(allDefs, activeResId, mapping);
                }
            }
        } catch (e) {
            if (__DEV__) { console.error('[ScoreSync] ERRO CRÍTICO no cálculo de score de riscos:', e); }
            const rsc = moradia.riscos || {};
            if ((rsc.identificados || moradia.riscosMapeados)?.length > 0) riscos += 20;
        }

        // 4. Inventário
        let inventario = 0;
        const inv = moradia.inventario || {};
        const camposInventario = ['produtosQuimicos', 'medicamentos', 'ferramentas', 'armas'];
        const preenchidos = camposInventario.filter(c => inv[c]?.local !== null).length;
        inventario = Math.round((preenchidos / camposInventario.length) * 100);

        // 5. Kits
        let kit = 0;
        try {
            const KitService = require('./KitService').default;
            const activeResId = await this.getActiveResidenceId();
            kit = await KitService.getGlobalKitsProgress(activeResId);
        } catch (e) {
            if (__DEV__) { console.warn('Erro ao calcular score de kits:', e); }
        }

        // Total ponderado
        const total = Math.round(
            familia    * 0.25 +
            estrutura  * 0.20 +
            riscos     * 0.25 +
            inventario * 0.15 +
            kit        * 0.15
        );

        const completude = { familia, estrutura, riscos, inventario, kit, total, safetyStats };

        data.completude = completude;
        await this.saveData(data);

        return completude;
    }

    /**
     * Retorna completude atual sem recalcular.
     */
    static async getCompletude() {
        const data = await this.getData();
        return data.completude || { familia: 0, estrutura: 0, riscos: 0, inventario: 0, kit: 0, total: 0 };
    }

    /**
     * Retorna resumo de progresso para exibição no dashboard.
     */
    static async getProgressoResumo() {
        const completude = await this.calcularCompletude();

        return {
            geral: completude.total,
            categorias: {
                familia:    completude.familia    || 0,
                estrutura:  completude.estrutura  || 0,
                riscos:     completude.riscos     || 0,
                inventario: completude.inventario || 0,
                contatos:   0, // Placeholder — não calculado aqui
                kit:        completude.kit        || 0
            },
            safetyStats: completude.safetyStats || null
        };
    }

    /**
     * Salva o mapeamento de riscos na casa ativa e sincroniza com legado.
     *
     * FIX #6: moradia.caracteristicas agora é sincronizado atomicamente com mapping
     * na mesma operação de escrita, eliminando divergência entre os dois campos.
     */
    static async saveMapping(items) {
        const data = await this.getData();
        if (!data.residences) {
            data.residences = await this.getResidences();
        }

        const activeId = data.activeResidenceId || 'default_home';
        const index = data.residences.findIndex(r => r.id === activeId);

        if (index !== -1) {
            // FIX #6: Atualiza mapping e moradia.caracteristicas atomicamente
            data.residences[index].mapping = items;
            data.residences[index].ultimaAtualizacao = new Date().toISOString();

            if (!data.residences[index].moradia) {
                data.residences[index].moradia = {};
            }
            // Sync explícito: moradia.caracteristicas sempre espelha mapping
            data.residences[index].moradia.caracteristicas = items;

            // Sync legado na raiz
            if (data.moradia) {
                data.moradia.caracteristicas = items;
            }

            try {
                await AsyncStorage.setItem('@home_mapping', JSON.stringify(items));
            } catch (e) {
                if (__DEV__) { console.log('Erro ao salvar chave de mapping legada:', e); }
            }

            return await this.saveData(data);
        }
        return false;
    }

    /**
     * Recupera o mapeamento.
     * Prioridade: residência ativa → moradia → chave legada.
     */
    static async getMapping() {
        const data = await this.getData();

        if (data.residences) {
            const activeId = data.activeResidenceId || 'default_home';
            const activeRes = data.residences.find(r => r.id === activeId);
            if (activeRes) {
                if (activeRes.mapping?.length > 0) return activeRes.mapping;
                if (activeRes.moradia?.caracteristicas?.length > 0) return activeRes.moradia.caracteristicas;
            }
        }

        if (data.moradia?.caracteristicas?.length > 0) return data.moradia.caracteristicas;

        try {
            const json = await AsyncStorage.getItem('@home_mapping');
            return json ? JSON.parse(json) : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Retorna os dados completos de uma residência específica pelo ID.
     */
    static async getResidenceData(residenceId) {
        const data = await this.getData();
        if (!data.residences) return null;
        return data.residences.find(r => r.id === residenceId) || null;
    }
}

export default ProfileService;
