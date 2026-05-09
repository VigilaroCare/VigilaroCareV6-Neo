import AsyncStorage from '@react-native-async-storage/async-storage';

const XP_KEY = '@vigilaro_xp';
const HISTORY_KEY = '@vigilaro_xp_history';

const LEVELS = [
    { level: 1, name: 'Iniciante', minXP: 0, maxXP: 200 },
    { level: 2, name: 'Atento', minXP: 201, maxXP: 500 },
    { level: 3, name: 'Protetor', minXP: 501, maxXP: 1000 },
    { level: 4, name: 'Guardião', minXP: 1001, maxXP: 2000 },
    { level: 5, name: 'Mestre da Segurança', minXP: 2001, maxXP: 999999 },
];

const ACTIONS = {
    CHECKLIST_COMPLETE: { xp: 50, label: 'Checklist Completo' },
    READ_GUIDE: { xp: 20, label: 'Leitura de Guia' },
    USE_SCANNER: { xp: 30, label: 'Scanner IA' },
    PROFILE_COMPLETE: { xp: 100, label: 'Perfil Completo' },
    VACCINE_SCAN: { xp: 50, label: 'Vacina Escaneada' },
};

const MAX_HISTORY_ITEMS = 50;

class GamificationService {
    constructor() {
        this.listeners = [];
        this.currentXP = 0;
        this.history = [];
        this.toastListener = null;
        this.initPromise = this.init();
    }

    async init() {
        try {
            const [xp, history] = await Promise.all([
                AsyncStorage.getItem(XP_KEY),
                AsyncStorage.getItem(HISTORY_KEY)
            ]);
            this.currentXP = xp ? parseInt(xp, 10) : 0;
            this.history = history ? JSON.parse(history) : [];
            this.notifyListeners();
        } catch (e) {
            if (__DEV__) { console.error('Error init Gamification:', e); }
        }
    }

    getLevel(xp = this.currentXP) { return LEVELS.find(l => xp >= l.minXP && xp <= l.maxXP) || LEVELS[LEVELS.length - 1]; }
    getNextLevel(xp = this.currentXP) { return LEVELS.find(l => l.level === this.getLevel(xp).level + 1); }

    getProgress() {
        const cl = this.getLevel(), nl = this.getNextLevel();
        if (!nl) return 1;
        const range = cl.maxXP - cl.minXP;
        return range <= 0 ? 1 : Math.min(Math.max((this.currentXP - cl.minXP) / range, 0), 1);
    }

    setToastListener(l) { this.toastListener = l; }

    async addPoints(actionKey) {
        await this.initPromise;
        const action = ACTIONS[actionKey];
        if (!action) return null;

        const oldLevel = this.getLevel();
        this.currentXP += action.xp;
        const newLevel = this.getLevel();

        this.history.unshift({ id: Date.now().toString(), action: action.label, xp: action.xp, date: new Date().toISOString() });
        if (this.history.length > MAX_HISTORY_ITEMS) this.history = this.history.slice(0, MAX_HISTORY_ITEMS);

        this.save(); // Non-blocking
        this.notifyListeners();

        const result = { xpGained: action.xp, newTotal: this.currentXP, levelUp: newLevel.level > oldLevel.level, newLevel, actionLabel: action.label };
        if (this.toastListener) this.toastListener(result);
        return result;
    }

    async save() {
        try {
            await Promise.all([
                AsyncStorage.setItem(XP_KEY, this.currentXP.toString()),
                AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(this.history))
            ]);
        } catch (e) {
            if (__DEV__) { console.error('Error saving Gamification:', e); }
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        listener({ xp: this.currentXP, level: this.getLevel() });
        return () => { this.listeners = this.listeners.filter(l => l !== listener); };
    }

    notifyListeners() {
        const state = { xp: this.currentXP, level: this.getLevel(), history: this.history };
        this.listeners.forEach(l => l(state));
    }

    getActions() { return ACTIONS; }
}

export default new GamificationService();
