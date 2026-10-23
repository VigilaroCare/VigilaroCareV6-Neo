import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ReviewImage from '../../components/ReviewImage';
import NeoIcon from '../../components/NeoIcon';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { t_deep } from '../../utils/getLocalizedField';

export default function JardinagemSeguraScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    const THEME_COLOR = '#16A34A'; // Verde folha (Jardinagem)

    // Conteúdo nos 4 idiomas (sufixo inline) — t_deep entrega o tópico já no
    // idioma atual, inclusive ao PremiumArticle, que recebe o objeto inteiro.
    const topics = t_deep([
        {
            id: 'epis',
            titulo: t('headersFirst.proteOObrigatRia', 'A "Armadura" do Jardineiro'),
            subtitulo: 'Proteção obrigatória: luvas, calçados fechados e camisas de manga longa.',
            subtitulo_en: 'Essential protection: gloves, closed shoes and long-sleeved shirts.',
            subtitulo_es: 'Protección obligatoria: guantes, calzado cerrado y camisas de manga larga.',
            subtitulo_ptpt: 'Proteção obrigatória: luvas, calçado fechado e camisas de manga comprida.',
            icon: 'ShieldTick',
            imagemUrl: require('../../assets/illustrations/pad/generated_jardim_tools_centered.png'),
            conteudo: 'A prática da jardinagem e a manutenção de hortas apresentam riscos específicos. É essencial e obrigatório o uso de luvas de jardinagem de boa qualidade, calçados fechados (ou botas de cano longo), além de camisas de manga comprida e calças com as barras fechadas.',
            conteudo_en: 'Gardening and looking after vegetable plots carry specific risks. Good-quality gardening gloves, closed shoes (or tall boots), long-sleeved shirts and trousers with closed hems are essential.',
            conteudo_es: 'La jardinería y el cuidado de huertos tienen riesgos específicos. Es esencial y obligatorio usar guantes de jardinería de buena calidad, calzado cerrado (o botas de caña alta), camisas de manga larga y pantalones con los bajos cerrados.',
            conteudo_ptpt: 'A prática da jardinagem e a manutenção de hortas apresentam riscos específicos. É essencial e obrigatório usar luvas de jardinagem de boa qualidade, calçado fechado (ou botas de cano alto), camisas de manga comprida e calças com as bainhas fechadas.',
            prevencao: [
                'Essa armadura dificulta que insetos entrem na roupa e piquem a pele.',
                'Reduz o risco de a pele ser queimada pelo contato com seiva leitosa (látex) de plantas nocivas ao podá-las.'
            ],
            prevencao_en: [
                'This armour makes it harder for insects to get into your clothes and sting your skin.',
                'It lowers the risk of skin burns from the milky sap (latex) of harmful plants when pruning them.'
            ],
            prevencao_es: [
                'Esta armadura dificulta que los insectos se metan en la ropa y piquen la piel.',
                'Reduce el riesgo de que la piel se queme con la savia lechosa (látex) de plantas dañinas al podarlas.'
            ],
            prevencao_ptpt: [
                'Esta armadura dificulta que os insetos entrem na roupa e piquem a pele.',
                'Reduz o risco de a pele ser queimada pelo contacto com a seiva leitosa (látex) de plantas nocivas ao podá-las.'
            ]
        },
        {
            id: 'riscos_quimicos',
            titulo: 'Fertilizantes e Pesticidas',
            titulo_en: 'Fertilisers and Pesticides',
            titulo_es: 'Abonos y Pesticidas',
            titulo_ptpt: 'Adubos e Pesticidas',
            subtitulo: 'Armazenamento inadequado é um alto risco de intoxicação.',
            subtitulo_en: 'Poor storage carries a high risk of poisoning.',
            subtitulo_es: 'Un almacenamiento inadecuado supone un alto riesgo de intoxicación.',
            subtitulo_ptpt: 'O armazenamento inadequado é um alto risco de intoxicação.',
            icon: 'Danger',
            imagemUrl: require('../../assets/illustrations/pad/generated_jardim_chemicals.png'),
            conteudo: 'O uso e, principalmente, o armazenamento inadequado de produtos químicos de jardinagem (como adubos, inseticidas e pesticidas) representam um alto risco de intoxicação letal para crianças pequenas e pets, que podem ingerir esses produtos acidentalmente.',
            conteudo_en: 'Improper use and, above all, improper storage of garden chemicals (such as fertilisers, insecticides and pesticides) carry a high risk of fatal poisoning for young children and pets, who may swallow them by accident.',
            conteudo_es: 'El uso y, sobre todo, el almacenamiento inadecuados de productos químicos de jardinería (como abonos, insecticidas y pesticidas) suponen un alto riesgo de intoxicación mortal para niños pequeños y mascotas, que pueden ingerirlos por accidente.',
            conteudo_ptpt: 'O uso e, sobretudo, o armazenamento inadequado de produtos químicos de jardinagem (como adubos, inseticidas e pesticidas) representam um alto risco de intoxicação letal para crianças pequenas e animais, que os podem ingerir por acidente.',
            prevencao: [
                'Fertilizantes e pesticidas devem ser mantidos trancados em armários altos.',
                'Sempre manter na caixa original bem rotulada.',
                'Dê preferência a fertilizantes e pesticidas orgânicos/naturais.'
            ],
            prevencao_en: [
                'Keep fertilisers and pesticides locked in high cupboards.',
                'Always keep them in the original, clearly labelled box.',
                'Prefer organic/natural fertilisers and pesticides.'
            ],
            prevencao_es: [
                'Los abonos y pesticidas deben guardarse bajo llave en armarios altos.',
                'Manténgalos siempre en su caja original bien etiquetada.',
                'Prefiera abonos y pesticidas orgánicos/naturales.'
            ],
            prevencao_ptpt: [
                'Os adubos e pesticidas devem ser guardados fechados à chave em armários altos.',
                'Manter sempre na caixa original bem rotulada.',
                'Dê preferência a adubos e pesticidas orgânicos/naturais.'
            ]
        },
        {
            id: 'riscos_clima',
            titulo: 'Exposição ao Clima e Insolação',
            titulo_en: 'Weather Exposure and Sunstroke',
            titulo_es: 'Exposición al Clima e Insolación',
            titulo_ptpt: 'Exposição ao Clima e Insolação',
            subtitulo: 'Proteção contra o sol ardente durante o cultivo.',
            subtitulo_en: 'Protection from the scorching sun while gardening.',
            subtitulo_es: 'Protección contra el sol abrasador mientras cultiva.',
            subtitulo_ptpt: 'Proteção contra o sol forte durante o cultivo.',
            icon: 'Sun1',
            imagemUrl: require('../../assets/illustrations/pad/plantas-toxicas_equinacea-flor_014.jpg'),
            conteudo: 'Ficar exposto ao sol quente por longos períodos durante o cuidado com o jardim também é considerado um risco silencioso, podendo causar forte desidratação e mal-estar térmico (insolação).',
            conteudo_en: 'Spending long periods in hot sun while tending the garden is also a silent risk, and can cause severe dehydration and heat illness (sunstroke).',
            conteudo_es: 'Estar expuesto al sol fuerte durante mucho tiempo mientras cuida el jardín también es un riesgo silencioso, y puede causar una deshidratación fuerte y malestar por calor (insolación).',
            conteudo_ptpt: 'Ficar exposto ao sol quente durante muito tempo a cuidar do jardim também é um risco silencioso, que pode causar desidratação forte e mal-estar térmico (insolação).',
            prevencao: [
                'Priorize o trabalho nas primeiras horas da manhã ou no fim da tarde.',
                'Utilizar chapéus ou bonés e protetor solar sempre que estiver no jardim.',
                'Mantenha-se hidratado constantemente.'
            ],
            prevencao_en: [
                'Work early in the morning or late in the afternoon.',
                'Wear a hat or cap and sunscreen whenever you are in the garden.',
                'Keep drinking water throughout.'
            ],
            prevencao_es: [
                'Trabaje a primera hora de la mañana o al final de la tarde.',
                'Use sombrero o gorra y protector solar siempre que esté en el jardín.',
                'Manténgase hidratado en todo momento.'
            ],
            prevencao_ptpt: [
                'Dê prioridade ao trabalho logo de manhã ou ao fim da tarde.',
                'Use chapéu ou boné e protetor solar sempre que estiver no jardim.',
                'Mantenha-se sempre hidratado.'
            ]
        },
        {
            id: 'riscos_biologicos',
            titulo: 'Plantas Tóxicas',
            titulo_en: 'Toxic Plants',
            titulo_es: 'Plantas Tóxicas',
            titulo_ptpt: 'Plantas Tóxicas',
            subtitulo: 'Contato e ingestão de plantas ornamentais tóxicas.',
            subtitulo_en: 'Touching and swallowing toxic ornamental plants.',
            subtitulo_es: 'Contacto e ingestión de plantas ornamentales tóxicas.',
            subtitulo_ptpt: 'Contacto e ingestão de plantas ornamentais tóxicas.',
            icon: 'Danger',
            imagemUrl: require('../../assets/illustrations/pad/plantas-toxicas_plantas-toxicas_030.jpg'),
            conteudo: 'Plantas muito comuns (Comigo-ninguém-pode, Bico-de-papagaio, Tinhorão, Coroa-de-cristo, Aroeira e Mamona) oferecem grande risco de intoxicação para crianças e pets.',
            conteudo_en: 'Very common plants (dumb cane/Dieffenbachia, poinsettia, caladium, crown of thorns, Brazilian peppertree and castor bean) pose a high risk of poisoning for children and pets.',
            conteudo_es: 'Plantas muy comunes (difenbaquia, flor de Pascua, caladio, corona de Cristo, pimentero brasileño y ricino) suponen un gran riesgo de intoxicación para niños y mascotas.',
            conteudo_ptpt: 'Plantas muito comuns (diefembáquia, estrela-de-natal, tinhorão, coroa-de-cristo, aroeira e rícino) oferecem um grande risco de intoxicação para crianças e animais.',
            prevencao: [
                'Identificar e evitar o cultivo dessas plantas em áreas de fácil acesso.',
                'Ao podá-las, o uso de luvas é fundamental.',
                'Lembrar que reações vão desde bolhas na pele até asfixia e convulsões se ingeridas.'
            ],
            prevencao_en: [
                'Identify these plants and avoid growing them where they are easy to reach.',
                'Gloves are essential when pruning them.',
                'Remember that reactions range from skin blisters to choking and seizures if swallowed.'
            ],
            prevencao_es: [
                'Identifique estas plantas y evite cultivarlas en zonas de fácil acceso.',
                'Al podarlas, el uso de guantes es fundamental.',
                'Recuerde que las reacciones van desde ampollas en la piel hasta asfixia y convulsiones si se ingieren.'
            ],
            prevencao_ptpt: [
                'Identificar e evitar o cultivo destas plantas em zonas de fácil acesso.',
                'Ao podá-las, o uso de luvas é fundamental.',
                'Lembrar que as reações vão desde bolhas na pele até asfixia e convulsões, se ingeridas.'
            ]
        },
        {
            id: 'riscos_ferramentas',
            titulo: 'Ferramentas Manuais e Elétricas',
            titulo_en: 'Hand and Power Tools',
            titulo_es: 'Herramientas Manuales y Eléctricas',
            titulo_ptpt: 'Ferramentas Manuais e Elétricas',
            subtitulo: 'Atenção redobrada com lâminas e pontas.',
            subtitulo_en: 'Extra care with blades and points.',
            subtitulo_es: 'Atención redoblada con cuchillas y puntas.',
            subtitulo_ptpt: 'Atenção redobrada com lâminas e pontas.',
            icon: 'Setting2',
            imagemUrl: require('../../assets/illustrations/pad/generated_jardim_tools_centered.png'),
            conteudo: 'Acidentes com tesouras de poda, ancinhos ou cortadores de grama causam lesões sérias e profundas.',
            conteudo_en: 'Accidents with pruning shears, rakes or lawnmowers cause serious, deep injuries.',
            conteudo_es: 'Los accidentes con tijeras de podar, rastrillos o cortacéspedes causan lesiones serias y profundas.',
            conteudo_ptpt: 'Acidentes com tesouras de poda, ancinhos ou corta-relvas causam lesões sérias e profundas.',
            prevencao: [
                'Sempre desligue cortadores de grama da tomada antes de mexer na lâmina para limpá-la.',
                'Guarde enxadas, ancinhos e tesouras em local alto e trancado, longe do alcance de crianças.',
                'Ao caminhar pelo jardim, não deixe ferramentas com pontas viradas para cima na grama.'
            ],
            prevencao_en: [
                'Always unplug the lawnmower before touching the blade to clean it.',
                'Store hoes, rakes and shears somewhere high and locked, out of children’s reach.',
                'Do not leave tools lying on the grass with their points facing up.'
            ],
            prevencao_es: [
                'Desenchufe siempre el cortacésped antes de tocar la cuchilla para limpiarla.',
                'Guarde azadas, rastrillos y tijeras en un lugar alto y cerrado, lejos del alcance de los niños.',
                'No deje herramientas en el césped con las puntas hacia arriba.'
            ],
            prevencao_ptpt: [
                'Desligue sempre o corta-relva da tomada antes de mexer na lâmina para a limpar.',
                'Guarde enxadas, ancinhos e tesouras num local alto e trancado, longe do alcance das crianças.',
                'Não deixe ferramentas na relva com as pontas viradas para cima.'
            ]
        },
        {
            id: 'riscos_ergonomicos_animais',
            titulo: 'Vasos Pesados e Animais Escondidos',
            titulo_en: 'Heavy Pots and Hidden Animals',
            titulo_es: 'Macetas Pesadas y Animales Escondidos',
            titulo_ptpt: 'Vasos Pesados e Animais Escondidos',
            subtitulo: 'Proteja a coluna e fuja dos insetos e escorpiões.',
            subtitulo_en: 'Protect your back and keep clear of insects and scorpions.',
            subtitulo_es: 'Proteja la espalda y evite insectos y escorpiones.',
            subtitulo_ptpt: 'Proteja a coluna e fuja dos insetos e escorpiões.',
            icon: 'Health',
            imagemUrl: require('../../assets/illustrations/pad/fotos-stock-genericas_vespa-inseto_001.jpg'),
            conteudo: 'Abaixo de vasos pesados e úmidos costumam se abrigar aranhas e escorpiões. Além disso, levantar o peso de forma incorreta pode lesar e travar a sua coluna lombar.',
            conteudo_en: 'Spiders and scorpions often shelter under heavy, damp pots. Lifting the weight the wrong way can also injure your lower back or put it out.',
            conteudo_es: 'Bajo las macetas pesadas y húmedas suelen refugiarse arañas y escorpiones. Además, levantar peso de forma incorrecta puede lesionar y bloquear la zona lumbar.',
            conteudo_ptpt: 'Debaixo de vasos pesados e húmidos costumam abrigar-se aranhas e escorpiões. Além disso, levantar peso de forma incorreta pode lesionar e bloquear a zona lombar.',
            prevencao: [
                'Antes de mover um vaso no chão, bata levemente nas laterais e sacuda-o usando um graveto para afugentar animais peçonhentos.',
                'Evite carregar vasos muito pesados sozinho. Se for levantar, dobre os joelhos e mantenha a coluna reta.',
                'Sempre use luvas de raspa de couro ao mexer em entulhos de jardim.'
            ],
            prevencao_en: [
                'Before moving a pot on the ground, tap its sides and shake it with a stick to scare off venomous animals.',
                'Avoid carrying very heavy pots on your own. If you lift, bend your knees and keep your back straight.',
                'Always wear leather work gloves when handling garden debris.'
            ],
            prevencao_es: [
                'Antes de mover una maceta del suelo, golpee suavemente los lados y sacúdala con un palo para ahuyentar animales venenosos.',
                'Evite cargar macetas muy pesadas usted solo. Si las levanta, doble las rodillas y mantenga la espalda recta.',
                'Use siempre guantes de cuero de trabajo al manipular restos del jardín.'
            ],
            prevencao_ptpt: [
                'Antes de mover um vaso no chão, bata levemente nas laterais e abane-o com um pau para afugentar animais venenosos.',
                'Evite carregar vasos muito pesados sozinho. Se os levantar, dobre os joelhos e mantenha a coluna direita.',
                'Use sempre luvas de couro de trabalho ao mexer em entulho do jardim.'
            ]
        }
    ]);

    const handlePress = (item) => {
        navigation.navigate('PremiumArticle', {
            conceito: {
                ...item,
                color: THEME_COLOR,
                tags: [t('headersFirst.gardening', 'Jardinagem Segura')]
            }
        });
    };

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);
    const surface = isDark ? themeColors.neutral[100] : '#FFFFFF';

    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
            })
        }
    ];

    const capaUrl = require('../../assets/illustrations/pad/ambientes-casa_jardim_019.jpg'); // Jardinagem // Gardening

    const title = t('headersFirst.gardening', 'Jardinagem Segura');

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button */}
            <SafeAreaView edges={['top']} style={styles.safeHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtnFlat}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: THEME_COLOR,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                    
                    {/* Hero title — viaja junto com a parallax */}
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }} accessibilityRole="header">
                            {title}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[styles.content, { marginTop: 20 }]}>

                <View style={{ marginTop: 24 }}>
                    {topics.map((item) => (
                        <NeoHorizontalCard
                            key={item.id}
                            title={item.titulo}
                            description={item.subtitulo}
                            iconName={item.icon}
                              imageUrl={item.imagemUrl}
                            color={THEME_COLOR}
                            onPress={() => handlePress(item)}
                        />
                    ))}
                </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
});
