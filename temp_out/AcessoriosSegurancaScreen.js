/**
 * AcessoriosSegurancaScreen.js
 * Tela de Acessórios de Segurança (Baby-proof, Idosos, Pets, PCD)
 * Vigilaro Care V6 Neo
 *
 * Padrao card-retangulo 120x120 + filtro por perfil + navegacao para
 * ConceitoDetail (hero = foto do card). Sem expand inline.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = AcessoriosSegurancaScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactI18next = require('react-i18next');

var _reactNative = require('react-native');

var _reactNativeSafeAreaContext = require('react-native-safe-area-context');

var _expoStatusBar = require('expo-status-bar');

var _componentsNeoIcon = require('../components/NeoIcon');

var _componentsNeoIcon2 = _interopRequireDefault(_componentsNeoIcon);

var _utilsTheme = require('../utils/Theme');

var _dataAcessorios_seguranca = require('../data/acessorios_seguranca');

var _componentsAppBackground = require('../components/AppBackground');

var _componentsAppBackground2 = _interopRequireDefault(_componentsAppBackground);

var _utilsDesignSystem2026 = require('../utils/DesignSystem2026');

var _componentsReviewImage = require('../components/ReviewImage');

var _componentsReviewImage2 = _interopRequireDefault(_componentsReviewImage);

var _componentsFadeInView = require('../components/FadeInView');

var _componentsFadeInView2 = _interopRequireDefault(_componentsFadeInView);

var _utilsThemeContext = require('../utils/ThemeContext');

var THEME_COLOR = '#7C3AED'; // violet

function AcessoriosSegurancaScreen(_ref) {
    var navigation = _ref.navigation;

    var insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();

    var _useTranslation = (0, _reactI18next.useTranslation)('common');

    var t = _useTranslation.t;

    var themeColors = (0, _utilsThemeContext.useThemeColors)();
    var isDark = (0, _utilsThemeContext.useIsDark)();
    var textPrimary = themeColors.neutral[900];
    var textBody = themeColors.neutral[700];
    var textMuted = themeColors.neutral[500];
    var cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    var allCategories = _dataAcessorios_seguranca.ACESSORIOS_SEGURANCA.categorias || [];

    var handlePress = function handlePress(cat) {
        // ConceitoDetail ja le imagemUrl/imagem como hero (Lote 7k).
        // Mapeia os campos do data de acessorios para o que o detail espera.
        navigation.navigate('ConceitoDetail', {
            conceito: _extends({}, cat, {
                nome: cat.titulo,
                descricao: cat.descricao,
                iconColor: THEME_COLOR,
                // Tipos vira "como_identificar" pra renderizar como lista
                comoIdentificar: cat.tipos ? cat.tipos.map(function (t) {
                    return t.nome || JSON.stringify(t);
                }) : null,
                // onde / ondeInstalar viram "ondeEncontrada"
                ondeEncontrada: cat.onde || cat.ondeInstalar || null,
                // instalacao e importante viram parte da importancia (precos removidos)
                importancia: [cat.instalacao, cat.importante].filter(Boolean).join('\n\n')
            })
        });
    };

    return _react2['default'].createElement(
        _componentsAppBackground2['default'],
        null,
        _react2['default'].createElement(
            _reactNativeSafeAreaContext.SafeAreaView,
            { style: { flex: 1, backgroundColor: 'transparent' }, edges: ['top'] },
            _react2['default'].createElement(_expoStatusBar.StatusBar, { style: isDark ? 'light' : 'dark' }),
            _react2['default'].createElement(
                _reactNative.View,
                { style: styles.header },
                _react2['default'].createElement(
                    _reactNative.TouchableOpacity,
                    {
                        onPress: function () {
                            return navigation.goBack();
                        },
                        style: [styles.backBtn, { backgroundColor: THEME_COLOR + '20' }],
                        activeOpacity: 0.7,
                        accessibilityRole: 'button',
                        accessibilityLabel: t('common.back', 'Voltar')
                    },
                    _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'ArrowLeft', size: 22, color: THEME_COLOR })
                ),
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: styles.headerContent },
                    _react2['default'].createElement(
                        _reactNative.Text,
                        { style: styles.headerEmoji },
                        '🔐'
                    ),
                    _react2['default'].createElement(
                        _reactNative.Text,
                        { style: [styles.headerTitle, { color: textPrimary }], accessibilityRole: 'header' },
                        t('headersFirst.acessRiosDeSeguranA', 'Dispositivos de Proteção Doméstica')
                    ),
                    _react2['default'].createElement(
                        _reactNative.Text,
                        { style: [styles.headerSubtitle, { color: textBody }] },
                        t('headersFirst.proteOPersonalizadaParaCadaPerfil', 'Proteção personalizada para cada perfil')
                    )
                )
            ),
            _react2['default'].createElement(
                _reactNative.ScrollView,
                {
                    contentContainerStyle: styles.listContent,
                    showsVerticalScrollIndicator: false
                },
                _react2['default'].createElement(
                    _componentsFadeInView2['default'],
                    { delay: 100 },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: styles.infoBar },
                        _react2['default'].createElement(
                            _reactNative.Text,
                            { style: [styles.infoText, { color: textMuted }] },
                            '📋 ',
                            allCategories.length,
                            ' acessórios • Toque para ver detalhes'
                        )
                    )
                ),
                allCategories.map(function (cat, idx) {
                    return _react2['default'].createElement(
                        _componentsFadeInView2['default'],
                        { key: cat.id, delay: 150 + idx * 50 },
                        _react2['default'].createElement(
                            _reactNative.TouchableOpacity,
                            {
                                onPress: function () {
                                    return handlePress(cat);
                                },
                                activeOpacity: 0.8,
                                style: { marginBottom: 16 }
                            },
                            _react2['default'].createElement(
                                _reactNative.View,
                                { style: styles.guideCardOuter },
                                _react2['default'].createElement(
                                    _reactNative.View,
                                    { style: [styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }] },
                                    _react2['default'].createElement(
                                        _reactNative.View,
                                        { style: [styles.guideImageContainer, { backgroundColor: THEME_COLOR + '15' }] },
                                        cat.imagem || cat.imagemUrl ? _react2['default'].createElement(_componentsReviewImage2['default'], {
                                            source: cat.imagem || (typeof cat.imagemUrl === 'string' ? { uri: cat.imagemUrl } : cat.imagemUrl),
                                            tint: THEME_COLOR,
                                            accessibilityLabel: cat.titulo
                                        }) : _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'ShieldTick', size: 48, color: THEME_COLOR, variant: 'Bold' })
                                    ),
                                    _react2['default'].createElement(
                                        _reactNative.View,
                                        { style: styles.guideContent },
                                        _react2['default'].createElement(
                                            _reactNative.Text,
                                            { style: [styles.guideTitle, { color: textPrimary }], numberOfLines: 2 },
                                            cat.titulo
                                        ),
                                        _react2['default'].createElement(_reactNative.View, { style: { flex: 1 } }),
                                        _react2['default'].createElement(
                                            _reactNative.Text,
                                            { style: [styles.guideDesc, { color: textBody }], numberOfLines: 3 },
                                            cat.descricao || 'Toque para ver tipos e instalação.'
                                        )
                                    )
                                )
                            )
                        )
                    );
                }),
                _react2['default'].createElement(_reactNative.View, { style: { height: 140 } })
            )
        )
    );
}

var styles = _reactNative.StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 12,
        alignItems: 'center'
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginBottom: 12
    },
    headerContent: {
        alignItems: 'center'
    },
    headerEmoji: {
        fontSize: 40,
        marginBottom: 6
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4
    },
    headerSubtitle: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18
    },

    listContent: {
        paddingHorizontal: 16
    },
    infoBar: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 12,
        alignItems: 'center'
    },
    infoText: {
        fontSize: 12,
        fontWeight: '500'
    },

    // Card grande estilo Plantas/Animais (imagem retangular a esquerda)
    guideCardOuter: _extends({
        borderRadius: 24
    }, _utilsTheme.Shadows.sm),
    guideCardInner: {
        flexDirection: 'row',
        height: 130,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)'
    },
    guideImageContainer: {
        width: 130,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start'
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6
    },
    guideDesc: {
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 4
    },
    priceText: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 2
    }

});
module.exports = exports['default'];
/* Header padronizado */ /* Info bar */