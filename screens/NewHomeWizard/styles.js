/**
 * styles.js
 * Estilos compartilhados das etapas do NewHomeWizard.
 */
import { Platform, StyleSheet } from 'react-native';
import { DS } from '../../utils/DesignSystem2026';

const C = DS.colors;

export const ss = StyleSheet.create({
    phaseLabel: {
        color: DS.colors.primary[600], fontWeight: 'bold', letterSpacing: 1.5,
        marginBottom: 6, fontSize: 12,
    },
    header: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 20, paddingVertical: 12,
    },
    progressBar: {
        flex: 1, height: 6, backgroundColor: C.neutral[200],
        borderRadius: 3, marginLeft: 16, overflow: 'hidden',
    },
    progressFill: {
        height: '100%', backgroundColor: C.primary[500], borderRadius: 3,
    },
    profileCard: {
        flexDirection: 'row', alignItems: 'center', padding: 16,
        backgroundColor: '#FFF', borderRadius: DS.borderRadius.md,
        ...DS.shadows.sm,
    },
    avatar: {
        width: 48, height: 48, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center', marginRight: 16,
    },
    addBtn: {
        flexDirection: 'row', alignItems: 'center', padding: 18,
        backgroundColor: C.primary[100], borderRadius: DS.borderRadius.md,
    },
    input: {
        backgroundColor: C.neutral[200], borderRadius: 12, padding: 16,
        fontSize: 16, color: C.neutral[900],
    },
    chipRow: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8,
    },
    chip: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
        backgroundColor: C.neutral[200], borderWidth: 1, borderColor: C.neutral[300],
    },
    saveBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: C.primary[600], padding: 18, borderRadius: DS.borderRadius.md,
        marginTop: 32, ...DS.shadows.md,
    },
    stepperRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#FFF', padding: 16, borderRadius: DS.borderRadius.md,
        marginBottom: 8, ...DS.shadows.sm,
    },
    stepperBtn: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: C.neutral[200],
        alignItems: 'center', justifyContent: 'center',
    },
    footer: {
        // paddingBottom aumentado pra acomodar GlobalFloatingFooter (botão SOS + tab bar)
        // quando o wizard é aberto pós-onboarding via "Refazer mapeamento". No onboarding
        // inicial o GlobalFloatingFooter não está montado, mas o espaço extra não atrapalha.
        padding: 20, paddingBottom: Platform.OS === 'ios' ? 120 : 110,
    },
    mainBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 10, paddingVertical: 18, borderRadius: DS.borderRadius.md,
        backgroundColor: C.primary[700], ...DS.shadows.premium4K,
    },
    photoCircle: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: C.neutral[200],
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
    },
    cameraBadge: {
        position: 'absolute', bottom: 0, right: 0,
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: C.primary[600],
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: '#FFF',
    },
});
