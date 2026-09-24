import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from 'react-i18next'; // BUG-11 FIX: i18n
import ProfileService from '../services/ProfileService';
import { registrarTermosSensiveis } from '../services/SentryService';

const ProfileContext = createContext();

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles deve ser usado dentro de ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const { t } = useTranslation('common'); // BUG-11 FIX: instanciando t()
  const [profiles, setProfiles] = useState([]);
  const [activeProfiles, setActiveProfiles] = useState([]);
  const [primaryProfile, setPrimaryProfileState] = useState(null);
  const [focusProfile, setFocusProfileState] = useState(null);
  const [activeResidence, setActiveResidenceState] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const perfisDoService = await ProfileService.getPerfis();

      if (perfisDoService) {
        const perfisHidratados = perfisDoService.map(p => ({ ...p, idade: ProfileService.calcularIdade(p.dataNascimento) }));
        setProfiles(perfisHidratados);

        // Nomes da família viram termos redigidos no Sentry: nenhum regex
        // distingue nome próprio de texto comum, então quem sabe os nomes é o
        // app. Fica só em memória, nunca é enviado.
        registrarTermosSensiveis(perfisHidratados.map(p => p.nome));
        const ativos = perfisDoService.filter(p => p.ativo).map(p => p.id);

        // BUG-03 FIX: Usar perfisHidratados para que primaryProfile.idade nunca seja undefined
        let primary = null;
        if (ativos.length === 0 && perfisHidratados.length > 0) {
          setActiveProfiles(perfisHidratados.map(p => p.id));
          primary = perfisHidratados.find(p => p.tipo !== 'pet') || null;
        } else {
          setActiveProfiles(ativos);
          primary = perfisHidratados.find(p => p.ativo && p.tipo !== 'pet') || perfisHidratados.find(p => p.tipo !== 'pet') || null;
        }
        setPrimaryProfileState(primary);

        const activeRes = await ProfileService.getActiveResidence();
        setActiveResidenceState(activeRes);

        let focus = primary;
        if (activeRes && activeRes.pessoaEmFoco) {
            focus = perfisHidratados.find(p => p.id === activeRes.pessoaEmFoco) || primary;
        }
        setFocusProfileState(focus);
      }
    } catch (error) {
        if (__DEV__) {
          console.error('[ProfileContext] Erro ao carregar perfis:', error);
        }
        // Mantém estado vazio como fallback seguro
      } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadProfiles(); }, [loadProfiles]);

  const setPrimaryProfile = useCallback(async (profile) => {
    if (profile?.id) { await ProfileService.setPerfilAtivo(profile.id); setPrimaryProfileState(profile); await loadProfiles(); }
  }, [loadProfiles]);

  const setFocusProfile = useCallback(async (profile, residenceId) => {
    if (profile?.id && residenceId) {
      await ProfileService.setFocoNaResidencia(residenceId, profile.id);
      await loadProfiles();
    }
  }, [loadProfiles]);

  const addProfile = useCallback(async (profileData) => {
    const newP = await ProfileService.addPerfil(profileData, profileData.tipo || 'humano');
    await loadProfiles(); return newP;
  }, [loadProfiles]);

  const updateProfile = useCallback(async (id, updates) => { await ProfileService.updatePerfil(id, updates); await loadProfiles(); }, [loadProfiles]);
  const deleteProfile = useCallback(async (id) => { await ProfileService.removePerfil(id); await loadProfiles(); }, [loadProfiles]);
  const toggleActiveProfile = useCallback(async (id) => { await ProfileService.setPerfilAtivo(id); await loadProfiles(); }, [loadProfiles]);

  const getActiveProfiles = useCallback(() => profiles.filter(p => activeProfiles.includes(p.id)), [profiles, activeProfiles]);

  const getAgeGroupHelper = useCallback((profile) => {
    if (!profile) return 'adult';
    const age = ProfileService.calcularIdade(profile.dataNascimento);
    if (age === null) return 'adult'; 
    if (age < 1) return 'baby'; if (age < 13) return 'child'; if (age < 18) return 'teen'; if (age < 60) return 'adult'; return 'elderly';
  }, []);

  const hasAgeGroup = useCallback((ag) => getActiveProfiles().some(p => getAgeGroupHelper(p) === ag), [getActiveProfiles, getAgeGroupHelper]);
  const hasPcD = useCallback(() => getActiveProfiles().some(p => p.pcd === true || p.necessidadesEspeciais?.length > 0), [getActiveProfiles]);

  const getRelevantContent = useCallback((contentConfig) => {
    const active = getActiveProfiles();
    if (active.length === 0) return { relevant: true, priority: 'medium' };
    let relevant = false, maxPriority = 'low';
    active.forEach(profile => {
      const ageGroup = getAgeGroupHelper(profile);
      if (contentConfig.ageGroups.includes(ageGroup)) {
        relevant = true;
        // BUG-06 FIX: Elevar prioridade baseada na vulnerabilidade do perfil, não em contentConfig estático
        const isVulnerable = ageGroup === 'baby' || ageGroup === 'elderly';
        const isPcd = profile.pcd || profile.necessidadesEspeciais?.length > 0;
        if (isVulnerable || isPcd || contentConfig.priority === 'high') {
          maxPriority = 'high';
        } else if (contentConfig.priority === 'medium' && maxPriority !== 'high') {
          maxPriority = 'medium';
        }
      }
      if (contentConfig.requiresPcD && (profile.pcd || profile.necessidadesEspeciais?.length > 0)) {
        relevant = true;
        maxPriority = 'high';
      }
    });
    return { relevant, priority: maxPriority };
  }, [getActiveProfiles, getAgeGroupHelper]);

  const getAlertsForProfile = useCallback((profile) => {
    if (!profile) return [];
    const alerts = [];
    const ageGroup = getAgeGroupHelper(profile);
    const isPcd = profile.pcd || (profile.necessidadesEspeciais && profile.necessidadesEspeciais.length > 0);

    // BUG-11 FIX: Substituídas strings hardcoded por t() com fallback
    if (ageGroup === 'baby') {
      alerts.push({ id: 1, title: t('alerts.chokingBabyTitle', '⚠️ Engasgo em Bebês'), description: t('alerts.chokingBabyDesc', 'Protocolo AHA 2024 - Usar PLANTA DA MÃO'), screen: 'PrimeirosSocorros', params: { search: 'Engasgo' }, priority: 'critical' });
      alerts.push({ id: 2, title: t('alerts.coinsTitle', '🪙 MOEDAS = PERIGO!'), description: t('alerts.coinsDesc', 'Principal causa de asfixia < 5 anos'), screen: 'PrimeirosSocorros', params: { search: 'Engasgo' }, priority: 'critical' });
      alerts.push({ id: 101, title: t('alerts.safeBathTitle', '🛀 Banho Seguro'), description: t('alerts.safeBathDesc', 'Temp. correta e supervisão constante'), screen: 'Checklist', params: { category: 'banheiro' }, priority: 'high' });
    }
    if (ageGroup === 'child') {
      alerts.push({ id: 3, title: t('alerts.poolSafetyTitle', '🏊 Proteção de Piscina'), description: t('alerts.poolSafetyDesc', 'Cerca de 1,5m e portão travado'), screen: 'Checklist', params: { category: 'area_externa' }, priority: 'high' });
      alerts.push({ id: 4, title: t('alerts.outletSafetyTitle', '🔌 Proteger Tomadas'), description: t('alerts.outletSafetyDesc', 'Risco de choque (use protetores)'), screen: 'DispositivosSeguranca', priority: 'high' });
    }
    if (ageGroup === 'elderly') {
      alerts.push({ id: 5, title: t('alerts.fallPreventionTitle', '🪜 Prevenção de Quedas'), description: t('alerts.fallPreventionDesc', 'Corrimãos, iluminação e pisos'), screen: 'Checklist', params: { category: 'geral' }, priority: 'critical' });
      alerts.push({ id: 6, title: t('alerts.grabBarsTitle', '🚿 Barras de Apoio'), description: t('alerts.grabBarsDesc', 'Instalação vital no banheiro'), screen: 'DispositivosSeguranca', priority: 'critical' });
    }
    if (isPcd) {
      alerts.push({ id: 7, title: t('alerts.accessibilitySafetyTitle', '♿ Acessibilidade'), description: t('alerts.accessibilitySafetyDesc', 'Rampas e portas largas'), screen: 'Checklist', params: { category: 'acessibilidade' }, priority: 'critical' });
    }
    if (profile.tipo === 'pet') {
      alerts.push({ id: 91, title: t('alerts.petVaccinesTitle', 'Vacinação em Dia?'), description: t('alerts.petVaccinesDesc', 'Mantenha a carteirinha atualizada.'), screen: 'KitPrimeirosSocorros', priority: 'medium' });
      alerts.push({ id: 92, title: t('alerts.toxicPlantsTitle', 'Plantas Tóxicas'), description: t('alerts.toxicPlantsDesc', 'Verifique se há plantas perigosas no jardim.'), screen: 'OndeProteger', params: { ambiente: 'garden' }, priority: 'high' });
    }
    if (ageGroup === 'adult' && profile.tipo !== 'pet') {
      alerts.push({ id: 81, title: t('alerts.generalPreventionTitle', 'Prevenção Geral'), description: t('alerts.generalPreventionDesc', 'Revise os extintores e detectores de fumaça.'), screen: 'KitEmergencia', priority: 'medium' });
      alerts.push({ id: 82, title: t('alerts.escapePlanTitle', 'Plano de Fuga'), description: t('alerts.escapePlanDesc', 'Você já criou uma rota de fuga para sua família?'), screen: 'PlanoIncendio', priority: 'high' });
    }

    return alerts;
  }, [t, getAgeGroupHelper]);

  const contextValue = useMemo(() => ({
    profiles, activeProfiles, primaryProfile, focusProfile, activeResidence, loading,
    addProfile, updateProfile, deleteProfile, toggleActiveProfile,
    setPrimaryProfile, setFocusProfile, getActiveProfiles, hasAgeGroup, hasPcD, getRelevantContent, getAlertsForProfile, loadProfiles
  }), [ profiles, activeProfiles, primaryProfile, focusProfile, activeResidence, loading, addProfile, updateProfile, deleteProfile, toggleActiveProfile, setPrimaryProfile, setFocusProfile, getActiveProfiles, hasAgeGroup, hasPcD, getRelevantContent, getAlertsForProfile, loadProfiles ]);

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
};