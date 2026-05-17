import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft2, ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const KIT_DATA = [
    {
        id: 'medicamentos',
        title: 'Medicamentos',
        icon: 'Lovely',
        color: Neo.colors.feedback.error,
        intro: 'A gestão cuidadosa dos medicamentos é uma das partes mais críticas do preparo para a viagem.',
        sections: [
            {
                subtitle: 'Uso Contínuo',
                items: [
                    'Medicamentos prescritos para condições crônicas (hipertensão, diabetes, etc.)',
                    'Calcule a quantidade para todos os dias + margem de 3 a 5 dias extras',
                    'Mantenha na embalagem original com bula',
                    'Transporte na bagagem de mão (nunca no porão)',
                ],
            },
            {
                subtitle: 'Sintomáticos',
                items: [
                    'Analgésicos e antitérmicos (ex: Paracetamol)',
                    'Anti-inflamatórios (ex: Ibuprofeno)',
                    'Antialérgicos (ex: Loratadina)',
                    'Antigripais e descongestionantes',
                    'Medicamentos para problemas digestivos (antiácidos, antidiarreicos)',
                ],
            },
            {
                subtitle: 'Documentação',
                items: [
                    'Receitas médicas atualizadas e legíveis',
                    'Laudos para medicamentos controlados',
                    'Para viagens internacionais: receitas traduzidas ou em inglês',
                    'Lista de alergias e contatos médicos',
                ],
            },
        ],
    },
    {
        id: 'primeiros_socorros',
        title: 'Primeiros Socorros',
        icon: 'Health',
        color: Neo.colors.feedback.error,
        intro: 'Um kit de primeiros socorros bem montado é essencial, especialmente se a viagem envolve crianças ou atividades ao ar livre.',
        sections: [
            {
                subtitle: 'Material para Curativos',
                items: [
                    'Band-aids (pensos rápidos) de diversos tamanhos',
                    'Compressas de gaze esterilizadas',
                    'Fita adesiva (esparadrapo ou micropore)',
                    'Ligaduras/ataduras elásticas',
                ],
            },
            {
                subtitle: 'Antissépticos e Limpeza',
                items: [
                    'Solução antisséptica (clorexidina ou iodopovidona)',
                    'Álcool 70% em lenços ou spray',
                    'Soro fisiológico para limpeza de ferimentos',
                ],
            },
            {
                subtitle: 'Instrumentos',
                items: [
                    'Tesoura de pontas redondas',
                    'Pinça para remoção de farpas/espinhos',
                    'Termômetro digital',
                    'Luvas descartáveis para proteção',
                ],
            },
            {
                subtitle: 'Itens Específicos',
                items: [
                    'Pomada para queimaduras leves (ex: Bepantol)',
                    'Gel ou roll-on para picadas de insetos',
                    'Analgésico de uso tópico',
                    'Colírio lubrificante',
                ],
            },
        ],
    },
    {
        id: 'higiene',
        title: 'Higiene e Proteção',
        icon: 'Shield',
        color: Neo.colors.secondary[500],
        intro: 'Manter a higiene pessoal e se proteger de fatores ambientais são medidas preventivas cruciais em qualquer viagem.',
        sections: [
            {
                subtitle: 'Higiene Pessoal',
                items: [
                    'Escova, pasta e fio dental',
                    'Sabonete e shampoo (tamanho viagem)',
                    'Desodorante e itens de cuidado pessoal',
                    'Absorventes ou itens de higiene íntima',
                ],
            },
            {
                subtitle: 'Proteção Solar e Ambiental',
                items: [
                    'Protetor solar FPS 30 ou superior',
                    'Protetor labial com FPS',
                    'Hidratante corporal (o clima seco do avião resseca)',
                    'Repelente de insetos (especialmente para destinos tropicais)',
                ],
            },
            {
                subtitle: 'Sanitização',
                items: [
                    'Álcool em gel para as mãos (tamanho viagem)',
                    'Lenços umedecidos antissépticos',
                    'Máscaras descartáveis (para locais com aglomeração)',
                ],
            },
        ],
    },
    {
        id: 'adicionais',
        title: 'Itens Adicionais',
        icon: 'Bag2',
        color: Neo.colors.feedback.success,
        intro: 'Itens que contribuem para a saúde e segurança geral do viajante e que são frequentemente esquecidos.',
        sections: [
            {
                subtitle: 'Hidratação e Purificação',
                items: [
                    'Garrafa de água reutilizável',
                    'Purificador ou pastilha desinfetante de água (destinos rurais)',
                    'Sais de reidratação oral',
                ],
            },
            {
                subtitle: 'Segurança Pessoal',
                items: [
                    'Preservativos',
                    'Cartão de informações de emergência (tipo sanguíneo, alergias, contatos)',
                    'Cópias dos documentos (físicas e digitais)',
                    'Seguro viagem impresso ou acessível offline',
                ],
            },
            {
                subtitle: 'Para Quem Viaja com Pets',
                items: [
                    'Carteira de vacinação atualizada do pet',
                    'Medicamentos específicos do animal',
                    'Identificação (coleira com tag + microchip)',
                    'Comedouro e bebedouro portáteis',
                    'Saquinhos coletores',
                ],
            },
        ],
    },
];

const TRANSPORT_TIP = {
    title: 'Regras de Transporte Aéreo',
    text: 'Medicamentos devem ir na bagagem de mão, na embalagem original e com receita. Líquidos em frascos de até 100ml, em saco plástico transparente. Medicamentos com receita não têm restrição de volume.',
};

function CategoryCard({ category }) {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <NeoCard variant="elevated" style={{ marginBottom: 14, overflow: 'hidden' }}>
            <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                <View style={{
                    width: 44, height: 44, borderRadius: 22,
                    backgroundColor: category.color + '18',
                    alignItems: 'center', justifyContent: 'center', marginRight: 14
                }}>
                    <NeoIcon name={category.icon} size={24} color={category.color} />
                </View>
                <View style={{ flex: 1 }}>
                    <H3 style={{ color: Neo.colors.neutral[900], fontSize: 15 }}>{category.title}</H3>
                    <Small style={{ color: Neo.colors.neutral[500], fontSize: 11, marginTop: 2 }}>{category.sections.reduce((acc, s) => acc + s.items.length, 0)} itens</Small>
                </View>
                {expanded ? <ArrowUp2 size={20} color={category.color} /> : <ArrowDown2 size={20} color={category.color} />}
            </TouchableOpacity>

            {expanded && (
                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, marginBottom: 14, fontStyle: 'italic', lineHeight: 18 }}>{category.intro}</Body>

                    {category.sections.map((section, si) => (
                        <View key={si} style={{ marginBottom: si < category.sections.length - 1 ? 16 : 0 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: category.color, marginRight: 8 }} />
                                <Body style={{ fontWeight: 'bold', color: category.color, fontSize: 13 }}>{section.subtitle}</Body>
                            </View>
                            {section.items.map((item, ii) => (
                                <View key={ii} style={{ flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 14, marginBottom: 6 }}>
                                    <Body style={{ color: Neo.colors.neutral[400], fontSize: 12, marginRight: 8, marginTop: 1 }}>•</Body>
                                    <Body style={{ color: Neo.colors.neutral[700], fontSize: 12, flex: 1, lineHeight: 18 }}>{item}</Body>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            )}
        </NeoCard>
    );
}

export default function KitViagemScreen({ navigation }) {
    const { t } = useTranslation('common');
    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 44, height: 44, borderRadius: 22,
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
                        }}
                    >
                        <ArrowLeft2 size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 44 }}>
                        <H2>{t('headersFirst.travelKit', 'Kit de Viagem')}</H2>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{t('headersFirst.checklistEssencial', 'Checklist essencial')}</Small>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 190 }}>

                    {/* Intro */}
                    <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], marginBottom: 20, paddingHorizontal: 8, lineHeight: 20 }}>
                        {t('headersFirst.monteSeuKitEssencialDeViagemComFocoEmSaD', 'Monte seu kit essencial de viagem com foco em saúde, higiene e primeiros socorros. Toque em cada categoria para expandir.')}
                    </Body>

                    {/* Categories */}
                    {KIT_DATA.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}

                    {/* Transport Tip */}
                    <NeoCard variant="elevated" style={{ marginTop: 8, padding: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Neo.colors.feedback.warning + '26', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <NeoIcon name="Airplane" size={20} color={Neo.colors.feedback.warning} />
                            </View>
                            <H3 style={{ color: Neo.colors.feedback.warning, fontSize: 14, flex: 1 }}>{TRANSPORT_TIP.title}</H3>
                        </View>
                        <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, lineHeight: 18 }}>{TRANSPORT_TIP.text}</Body>
                    </NeoCard>

                    {/* Footer note */}
                    <Caption style={{ textAlign: 'center', marginTop: 20, color: Neo.colors.neutral[400], paddingHorizontal: 16 }}>
                        {t('headersFirst.adapteEsteKitAoSeuDestinoENecessidadesCo', 'Adapte este kit ao seu destino e necessidades. Consulte seu médico antes de viajar.')}
                    </Caption>

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
