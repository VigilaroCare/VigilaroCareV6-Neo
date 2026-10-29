/**
 * MembrosDaCasa.js — a fileira de cartões com a FOTO de cada pessoa OU de cada animal da casa, para
 * trocar de ficha ("Trocar pessoa" em Minha Saúde, "Trocar pet" em Saúde Pet).
 *
 * POR QUE EXISTE
 * Minha Saúde abria direto na ficha da pessoa ativa e Saúde Pet abria numa lista. O Agnaldo
 * (28/10/2026) pediu que cada pessoa e cada animal seja um CARTÃO com a foto que ele cadastrou, no
 * padrão da Home. A fileira é a mesma nas duas telas, mas cada tela lista só o SEU tipo: ele
 * corrigiu a primeira versão, que misturava os dois ("não faz sentido ter pet em Minha Saúde, nem
 * pessoas em Saúde Pet"). Quem está aberto fica marcado; tocar em outro troca a ficha, sem
 * empilhar telas.
 *
 * Com um membro só não há o que trocar: não desenha nada.
 *
 * @param {Array<{ id: string, nome: string, foto?: any }>} membros
 *   `foto` já é uma ImageSource (use fotoDoPerfil); sem ela, aparece a inicial do nome.
 * @param {string} selecionadoId
 * @param {(membro: object) => void} onSelect
 * @param {string} titulo   rótulo da fileira ("Trocar pessoa" / "Trocar pet")
 * @param {'pessoa'|'pet'} tipo   só para o rótulo de acessibilidade de cada cartão
 */
import { useMemo } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import NeoCard from './NeoCard';
import ProfileService from '../services/ProfileService';
import { useThemeDS } from '../utils/ThemeContext';
import { withAlpha } from '../utils/DesignSystem2026';

/** Foto cadastrada → ImageSource. O pet pode trazer um `require` (número); a pessoa, um caminho. */
export const fotoDoPerfil = (foto) => {
    if (!foto) return null;
    if (typeof foto === 'number') return foto;
    const uri = ProfileService.resolveImageUri(foto);
    return uri ? { uri } : null;
};

/** Primeira letra do nome, para quem não tem foto. */
export const inicialDoNome = (nome) => String(nome || '?').trim().charAt(0).toUpperCase() || '?';

export default function MembrosDaCasa({ membros = [], selecionadoId, onSelect, titulo, tipo = 'pessoa', style }) {
    const { t } = useTranslation();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);

    if (membros.length < 2) return null;

    return (
        <View style={style}>
            <Text style={s.titulo}>{String(titulo || '').toUpperCase()}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.fila}>
                {membros.map((m) => {
                    const ativo = m.id === selecionadoId;
                    return (
                        <NeoCard
                            key={m.id}
                            variant="elevated"
                            padding={8}
                            onPress={() => { if (!ativo) onSelect?.(m); }}
                            style={[s.card, ativo && s.cardAtivo]}
                        >
                            <View
                                accessible
                                accessibilityRole="button"
                                accessibilityState={{ selected: ativo }}
                                accessibilityLabel={`${m.nome}, ${tipo === 'pet' ? t('health.petLabel', 'pet') : t('health.personLabel', 'pessoa')}`}
                                style={s.conteudo}
                            >
                                <View style={s.foto}>
                                    {m.foto
                                        ? <Image source={m.foto} style={StyleSheet.absoluteFill} resizeMode="cover" />
                                        : <Text style={s.inicial}>{inicialDoNome(m.nome)}</Text>}
                                </View>
                                <Text style={[s.nome, ativo && s.nomeAtivo]} numberOfLines={1}>{m.nome}</Text>
                            </View>
                        </NeoCard>
                    );
                })}
            </ScrollView>
        </View>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    titulo: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.6,
        color: Neo.colors.textOn.muted,
        marginBottom: Neo.spacing.sm,
    },
    fila: {
        gap: 10,
        paddingRight: Neo.spacing.md,
        paddingBottom: 4,
    },
    card: {
        width: 88,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardAtivo: {
        borderColor: Neo.colors.primary[500],
    },
    conteudo: {
        alignItems: 'center',
        gap: 6,
    },
    foto: {
        width: 60,
        height: 60,
        borderRadius: 18,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: withAlpha(Neo.colors.primary[500], 0.16),
    },
    inicial: {
        fontSize: 24,
        fontWeight: '800',
        color: Neo.colors.textOn.brand,
    },
    nome: {
        maxWidth: 72,
        fontSize: 12,
        fontWeight: '600',
        color: Neo.colors.textOn.muted,
    },
    nomeAtivo: {
        color: Neo.colors.textOn.ink,
        fontWeight: '800',
    },
});
