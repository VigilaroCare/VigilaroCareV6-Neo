/**
 * LegacyMigrationService.js
 * Serviço responsável por migrar dados de versões antigas do Vigilaro
 * para a nova estrutura unificada.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDefaultData, getDefaultProfile, VIGILARO_DATA_KEY } from './ProfileModels';

// Chaves antigas para migração
const LEGACY_KEYS = {
    perfis: '@perfis',
    userSecurityProfile: '@user_security_profile',
    briefingData: '@briefing_data',
    perfilUsuario: 'perfil_usuario',
    vitalContacts: '@vital_contacts',
};

class LegacyMigrationService {

    /**
     * Verifica se existem dados em chaves antigas
     */
    static async checkNeedsMigration() {
        try {
            for (const key of Object.values(LEGACY_KEYS)) {
                const value = await AsyncStorage.getItem(key);
                if (value) return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Migra dados das chaves antigas para a nova estrutura
     */
    static async migrateFromLegacy() {
        console.log('📦 LegacyMigrationService: Iniciando migração de dados antigos...');

        const newData = getDefaultData();

        try {
            // 1. Migrar perfis de @perfis
            const perfisJson = await AsyncStorage.getItem(LEGACY_KEYS.perfis);
            if (perfisJson) {
                const perfisAntigos = JSON.parse(perfisJson);
                newData.perfis = perfisAntigos.map(p => this.convertLegacyProfile(p));
                console.log(`✅ Migrados ${newData.perfis.length} perfis de @perfis`);
            }

            // 2. Migrar dados de @user_security_profile
            const securityJson = await AsyncStorage.getItem(LEGACY_KEYS.userSecurityProfile);
            if (securityJson) {
                const security = JSON.parse(securityJson);

                // Dados de moradia
                if (security.propertyType) {
                    newData.moradia.tipo = security.propertyType;
                }

                // Se tiver contatos de emergência globais, adicionar ao primeiro perfil ativo
                if (security.emergencyContacts && newData.perfis.length > 0) {
                    const primeiroHumano = newData.perfis.find(p => p.tipo === 'humano');
                    if (primeiroHumano) {
                        primeiroHumano.contatos = security.emergencyContacts.map(c => ({
                            nome: c.name,
                            telefone: c.phone,
                            relacao: c.relation || 'Emergência'
                        }));
                    }
                }

                // Marcar perfil como ativo
                if (security.name) {
                    const perfilAtivo = newData.perfis.find(p => p.nome === security.name);
                    if (perfilAtivo) perfilAtivo.ativo = true;
                }

                console.log('✅ Migrados dados de @user_security_profile');
            }

            // 3. Migrar dados de perfil_usuario (saúde/ambiente)
            const perfilUsuarioJson = await AsyncStorage.getItem(LEGACY_KEYS.perfilUsuario);
            if (perfilUsuarioJson) {
                const perfilUsuario = JSON.parse(perfilUsuarioJson);

                // Dados de ambiente vão para moradia
                if (perfilUsuario.ambiente) {
                    Object.assign(newData.moradia, perfilUsuario.ambiente);
                }

                // Dados de saúde vão para o primeiro perfil humano
                if (perfilUsuario.saude && newData.perfis.length > 0) {
                    const primeiroHumano = newData.perfis.find(p => p.tipo === 'humano');
                    if (primeiroHumano) {
                        if (perfilUsuario.saude.doencas) {
                            primeiroHumano.condicoesMedicas = perfilUsuario.saude.doencas.split(',').map(s => s.trim());
                        }
                        if (perfilUsuario.saude.medicacao) {
                            primeiroHumano.medicamentosEmUso = perfilUsuario.saude.medicacao.split(',').map(s => s.trim());
                        }
                        if (perfilUsuario.saude.limitacoes) {
                            primeiroHumano.necessidadesEspeciais.push(perfilUsuario.saude.limitacoes);
                        }
                    }
                }

                console.log('✅ Migrados dados de perfil_usuario');
            }

            // 4. Migrar contatos de @vital_contacts
            const contactsJson = await AsyncStorage.getItem(LEGACY_KEYS.vitalContacts);
            if (contactsJson) {
                const contacts = JSON.parse(contactsJson);

                // Adicionar ao primeiro perfil humano
                if (contacts.length > 0 && newData.perfis.length > 0) {
                    const primeiroHumano = newData.perfis.find(p => p.tipo === 'humano');
                    if (primeiroHumano) {
                        contacts.forEach(c => {
                            if (!primeiroHumano.contatos.find(existing => existing.telefone === c.phone)) {
                                primeiroHumano.contatos.push({
                                    nome: c.name,
                                    telefone: c.phone,
                                    relacao: c.relationship || c.role || 'Contato'
                                });
                            }
                        });
                    }
                }

                console.log(`✅ Migrados ${contacts.length} contatos de @vital_contacts`);
            }

            // Marcar migração como completa
            newData.migrado = true;
            newData.onboardingCompleto = newData.perfis.length > 0 && newData.moradia.tipo !== null;

            // Salvar dados migrados USANDO ASYNC STORAGE DIRETAMENTE
            await AsyncStorage.setItem(VIGILARO_DATA_KEY, JSON.stringify(newData));

            console.log('✅ Migração completa!');

            return newData;

        } catch (error) {
            if (__DEV__) { console.error('❌ Erro na migração:', error); }
            return newData;
        }
    }

    /**
     * Converte um perfil antigo para o novo formato
     */
    static convertLegacyProfile(oldProfile) {
        const newProfile = getDefaultProfile(oldProfile.tipo || 'humano');

        // Mapear campos comuns
        newProfile.id = oldProfile.id || Date.now().toString();
        newProfile.nome = oldProfile.nome || oldProfile.name || '';
        newProfile.foto = oldProfile.foto || null;
        newProfile.dataNascimento = oldProfile.birthDate || oldProfile.dataNascimento || '';
        newProfile.genero = oldProfile.gender || oldProfile.genero || '';

        // Campos de saúde
        if (oldProfile.condicoesMedicas) {
            newProfile.condicoesMedicas = typeof oldProfile.condicoesMedicas === 'string'
                ? oldProfile.condicoesMedicas.split(',').map(s => s.trim())
                : oldProfile.condicoesMedicas;
        }
        if (oldProfile.medicalConditions) {
            newProfile.condicoesMedicas = oldProfile.medicalConditions;
        }

        if (oldProfile.alergias || oldProfile.allergies) {
            newProfile.alergias = oldProfile.alergias || oldProfile.allergies || [];
        }

        newProfile.tipoSanguineo = oldProfile.tipoSanguineo || '';

        // Mobilidade e necessidades
        if (oldProfile.mobilidadeReduzida || oldProfile.accessibilityNeeds) {
            newProfile.necessidadesEspeciais = Array.isArray(oldProfile.accessibilityNeeds)
                ? oldProfile.accessibilityNeeds
                : oldProfile.mobilidadeReduzida ? ['Mobilidade reduzida'] : [];
        }

        // Contatos
        if (oldProfile.contatoEmergencia) {
            newProfile.contatos.push({
                nome: 'Contato de Emergência',
                telefone: oldProfile.contatoEmergencia,
                relacao: 'Emergência'
            });
        }
        if (oldProfile.emergencyContacts) {
            newProfile.contatos = oldProfile.emergencyContacts.map(c => ({
                nome: c.name,
                telefone: c.phone,
                relacao: c.relation || 'Emergência'
            }));
        }

        // Pet específico
        if (oldProfile.tipo === 'pet') {
            newProfile.especie = oldProfile.especie || oldProfile.species || '';
            newProfile.raca = oldProfile.raca || oldProfile.breed || '';
            newProfile.porte = oldProfile.porte || '';
            newProfile.castrado = oldProfile.castrado || false;
        }

        // Metadados
        newProfile.dataCriacao = oldProfile.dataCriacao || oldProfile.createdAt || new Date().toISOString();
        newProfile.dataAtualizacao = new Date().toISOString();

        return newProfile;
    }

    /**
     * Limpa chaves antigas após confirmar migração (usar com cuidado)
     */
    static async cleanupLegacyKeys() {
        try {
            for (const key of Object.values(LEGACY_KEYS)) {
                await AsyncStorage.removeItem(key);
            }
            console.log('✅ Chaves antigas removidas');
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao limpar chaves antigas:', error); }
            return false;
        }
    }
}

export default LegacyMigrationService;
