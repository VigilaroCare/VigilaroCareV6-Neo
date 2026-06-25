'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = AccessibilitySettingsScreen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSafeAreaContext = require('react-native-safe-area-context');

var _reactNavigationNative = require('@react-navigation/native');

var _expoStatusBar = require('expo-status-bar');

var _utilsHaptics = require('../utils/Haptics');

var _utilsHaptics2 = _interopRequireDefault(_utilsHaptics);

var _utilsDesignSystem2026 = require('../utils/DesignSystem2026');

var _componentsNeoCard = require('../components/NeoCard');

var _componentsNeoCard2 = _interopRequireDefault(_componentsNeoCard);

var _componentsNeoIcon = require('../components/NeoIcon');

var _componentsNeoIcon2 = _interopRequireDefault(_componentsNeoIcon);

var _componentsNeoTypography = require('../components/NeoTypography');

var _componentsNeoScreenHeader = require('../components/NeoScreenHeader');

var _componentsNeoScreenHeader2 = _interopRequireDefault(_componentsNeoScreenHeader);

var _componentsAppBackground = require('../components/AppBackground');

var _componentsAppBackground2 = _interopRequireDefault(_componentsAppBackground);

var _reactI18next = require('react-i18next');

var _contextAccessibilityContext = require('../context/AccessibilityContext');

var _utilsThemeContext = require('../utils/ThemeContext');

function AccessibilitySettingsScreen() {
    var navigation = (0, _reactNavigationNative.useNavigation)();

    var _useAccessibility = (0, _contextAccessibilityContext.useAccessibility)();

    var fontSizeLevel = _useAccessibility.fontSizeLevel;
    var updateFontSize = _useAccessibility.updateFontSize;
    var highContrast = _useAccessibility.highContrast;
    var toggleHighContrast = _useAccessibility.toggleHighContrast;
    var reduceMotion = _useAccessibility.reduceMotion;
    var toggleReduceMotion = _useAccessibility.toggleReduceMotion;
    var leftHandedMode = _useAccessibility.leftHandedMode;
    var toggleLeftHanded = _useAccessibility.toggleLeftHanded;

    var _useTranslation = (0, _reactI18next.useTranslation)();

    var t = _useTranslation.t;

    var _useTheme = (0, _utilsThemeContext.useTheme)();

    var mode = _useTheme.mode;
    var setMode = _useTheme.setMode;
    var isDark = _useTheme.isDark;
    var colors = _useTheme.colors;

    // Escala de texto: Normal (1) → Grande (1.4) → Extra Grande (2.0)
    var fontScaleOptions = [{ id: 1, label: t('settings.fontNormal', 'Normal'), sample: 'Aa' }, { id: 1.4, label: t('settings.fontLarge', 'Grande'), sample: 'Aa' }, { id: 2, label: t('settings.fontExtraLarge', 'Extra Grande'), sample: 'Aa' }];

    var hapticToggle = function hapticToggle(toggleFn) {
        return function (val) {
            _utilsHaptics2['default'].toggle();
            toggleFn(val);
        };
    };

    var hapticThemeSet = function hapticThemeSet(newMode) {
        _utilsHaptics2['default'].toggle();
        setMode(newMode);
    };

    var themeOptions = [{ id: 'system', label: t('settings.themeSystem', 'Sistema'), iconName: 'Setting4' }, { id: 'light', label: t('settings.themeLight', 'Claro'), iconName: 'Sun1' }, { id: 'dark', label: t('settings.themeDark', 'Escuro'), iconName: 'Moon' }];

    var dividerColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    var switchTrackFalse = isDark ? colors.neutral[400] : colors.neutral[300];

    var renderSettingItem = function renderSettingItem(_ref) {
        var label = _ref.label;
        var desc = _ref.desc;
        var iconName = _ref.iconName;
        var _ref$iconVariant = _ref.iconVariant;
        var iconVariant = _ref$iconVariant === undefined ? 'Bold' : _ref$iconVariant;
        var color = _ref.color;
        var value = _ref.value;
        var onToggle = _ref.onToggle;
        var _ref$showSwitch = _ref.showSwitch;
        var showSwitch = _ref$showSwitch === undefined ? true : _ref$showSwitch;
        var _ref$isLast = _ref.isLast;
        var isLast = _ref$isLast === undefined ? false : _ref$isLast;
        return _react2['default'].createElement(
            _reactNative.View,
            {
                style: [s.settingRow, !isLast && { borderBottomWidth: 1, borderBottomColor: dividerColor }]
            },
            _react2['default'].createElement(
                _reactNative.View,
                { style: [s.settingIcon, { backgroundColor: color + '33' }] },
                _react2['default'].createElement(_componentsNeoIcon2['default'], { name: iconName, size: 22, color: color, variant: iconVariant })
            ),
            _react2['default'].createElement(
                _reactNative.View,
                { style: s.settingTextCol },
                _react2['default'].createElement(
                    _componentsNeoTypography.Body,
                    { style: [s.settingLabel, { color: colors.neutral[900] }] },
                    label
                ),
                _react2['default'].createElement(
                    _componentsNeoTypography.Small,
                    { style: [s.settingDesc, { color: colors.neutral[700] }] },
                    desc
                )
            ),
            showSwitch ? _react2['default'].createElement(_reactNative.Switch, {
                value: value,
                onValueChange: hapticToggle(onToggle),
                trackColor: { 'false': switchTrackFalse, 'true': color },
                thumbColor: isDark ? colors.neutral[900] : colors.neutral.white
            }) : _react2['default'].createElement(
                _reactNative.View,
                { style: [s.nativeBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)' }] },
                _react2['default'].createElement(
                    _componentsNeoTypography.Caption,
                    { style: [s.nativeBadgeText, { color: colors.neutral[700] }] },
                    t('settings.native')
                )
            )
        );
    };

    return _react2['default'].createElement(
        _componentsAppBackground2['default'],
        null,
        _react2['default'].createElement(
            _reactNativeSafeAreaContext.SafeAreaView,
            { edges: ['top', 'left', 'right'], style: { flex: 1, backgroundColor: 'transparent' } },
            _react2['default'].createElement(_expoStatusBar.StatusBar, { style: isDark ? 'light' : 'dark' }),
            _react2['default'].createElement(_componentsNeoScreenHeader2['default'], {
                title: t('settings.accessibility'),
                onBack: function () {
                    return navigation.goBack();
                }
            }),
            _react2['default'].createElement(
                _reactNative.ScrollView,
                {
                    showsVerticalScrollIndicator: false,
                    contentContainerStyle: s.scrollContent
                },
                _react2['default'].createElement(
                    _componentsNeoCard2['default'],
                    { variant: 'elevated', style: s.introCard },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: s.introIconCircle },
                        _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'Eye', size: 22, color: colors.primary[600] || colors.primary[500], variant: 'Bold' })
                    ),
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: { flex: 1 } },
                        _react2['default'].createElement(
                            _componentsNeoTypography.H3,
                            { style: [s.introTitle, { color: colors.neutral[900] }] },
                            t('settings.adaptForYou', 'Ajustes pra você')
                        ),
                        _react2['default'].createElement(
                            _componentsNeoTypography.Body,
                            { style: [s.introBody, { color: colors.neutral[700] }] },
                            t('settings.adaptForYouDesc', 'Personalize o app para se adequar à sua forma de usar.')
                        )
                    )
                ),
                _react2['default'].createElement(
                    _componentsNeoTypography.Eyebrow,
                    { style: { marginBottom: 10 } },
                    t('settings.appearance', 'Aparência')
                ),
                _react2['default'].createElement(
                    _componentsNeoCard2['default'],
                    { variant: 'elevated', style: s.settingCard },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: s.settingRow },
                        _react2['default'].createElement(
                            _reactNative.View,
                            { style: [s.settingIcon, { backgroundColor: '#8B5CF6' + '33' }] },
                            _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'Moon', size: 22, color: '#8B5CF6', variant: 'Bold' })
                        ),
                        _react2['default'].createElement(
                            _reactNative.View,
                            { style: s.settingTextCol },
                            _react2['default'].createElement(
                                _componentsNeoTypography.Body,
                                { style: [s.settingLabel, { color: colors.neutral[900] }] },
                                t('settings.theme', 'Tema do app')
                            ),
                            _react2['default'].createElement(
                                _componentsNeoTypography.Small,
                                { style: [s.settingDesc, { color: colors.neutral[700] }] },
                                t('settings.themeDesc', 'Acompanhe o sistema ou escolha manualmente')
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: s.themePickerRow },
                        themeOptions.map(function (opt) {
                            var active = mode === opt.id;
                            return _react2['default'].createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    key: opt.id,
                                    onPress: function () {
                                        return hapticThemeSet(opt.id);
                                    },
                                    activeOpacity: 0.85,
                                    accessibilityRole: 'button',
                                    accessibilityState: { selected: active },
                                    accessibilityLabel: opt.label,
                                    style: [s.themeChip, { borderColor: dividerColor, backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' }, active && { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' }]
                                },
                                _react2['default'].createElement(_componentsNeoIcon2['default'], {
                                    name: opt.iconName,
                                    size: 18,
                                    color: active ? '#FFFFFF' : colors.neutral[800],
                                    variant: 'Bold'
                                }),
                                _react2['default'].createElement(
                                    _componentsNeoTypography.Small,
                                    { style: [s.themeChipLabel, { color: active ? '#FFFFFF' : colors.neutral[800] }] },
                                    opt.label
                                )
                            );
                        })
                    )
                ),
                _react2['default'].createElement(
                    _componentsNeoTypography.Eyebrow,
                    { style: { marginTop: 24, marginBottom: 10 } },
                    t('settings.visual', 'Visão')
                ),
                _react2['default'].createElement(
                    _componentsNeoCard2['default'],
                    { variant: 'elevated', style: s.settingCard },
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: s.settingRow },
                        _react2['default'].createElement(
                            _reactNative.View,
                            { style: [s.settingIcon, { backgroundColor: '#10B981' + '33' }] },
                            _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'TextalignJustifycenter', size: 22, color: '#10B981', variant: 'Bold' })
                        ),
                        _react2['default'].createElement(
                            _reactNative.View,
                            { style: s.settingTextCol },
                            _react2['default'].createElement(
                                _componentsNeoTypography.Body,
                                { style: [s.settingLabel, { color: colors.neutral[900] }] },
                                t('settings.largeText')
                            ),
                            _react2['default'].createElement(
                                _componentsNeoTypography.Small,
                                { style: [s.settingDesc, { color: colors.neutral[700] }] },
                                t('settings.largeTextDesc')
                            )
                        )
                    ),
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: s.themePickerRow },
                        fontScaleOptions.map(function (opt) {
                            var active = fontSizeLevel === opt.id;
                            return _react2['default'].createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    key: opt.id,
                                    onPress: function () {
                                        _utilsHaptics2['default'].toggle();updateFontSize(opt.id);
                                    },
                                    activeOpacity: 0.85,
                                    accessibilityRole: 'button',
                                    accessibilityState: { selected: active },
                                    accessibilityLabel: opt.label + ' (' + Math.round(opt.id * 100) + '%)',
                                    style: [s.themeChip, { borderColor: dividerColor, backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' }, active && { backgroundColor: '#10B981', borderColor: '#10B981' }]
                                },
                                _react2['default'].createElement(
                                    _componentsNeoTypography.Small,
                                    { style: [s.themeChipLabel, { color: active ? '#FFFFFF' : colors.neutral[800], fontSize: 12 + opt.id * 2 }] },
                                    opt.sample
                                ),
                                _react2['default'].createElement(
                                    _componentsNeoTypography.Caption,
                                    { style: { color: active ? '#FFFFFF' : colors.neutral[600], marginTop: 1 } },
                                    opt.label
                                )
                            );
                        })
                    ),
                    _react2['default'].createElement(_reactNative.View, { style: { borderTopWidth: 1, borderTopColor: dividerColor } }),
                    renderSettingItem({
                        label: t('settings.highContrast'),
                        desc: t('settings.highContrastDesc'),
                        iconName: 'Colorfilter',
                        color: '#F59E0B', // amber
                        value: highContrast,
                        onToggle: toggleHighContrast,
                        isLast: true
                    })
                ),
                _react2['default'].createElement(
                    _componentsNeoTypography.Eyebrow,
                    { style: { marginTop: 24, marginBottom: 10 } },
                    t('settings.audioFeedback', 'Movimento e Áudio')
                ),
                _react2['default'].createElement(
                    _componentsNeoCard2['default'],
                    { variant: 'elevated', style: s.settingCard },
                    renderSettingItem({
                        label: t('settings.reduceMotion'),
                        desc: t('settings.reduceMotionDesc'),
                        iconName: 'Refresh',
                        color: '#0EA5E9', // sky
                        value: reduceMotion,
                        onToggle: toggleReduceMotion
                    }),
                    renderSettingItem({
                        label: t('settings.screenReader'),
                        desc: t('settings.screenReaderDesc'),
                        iconName: 'VolumeHigh',
                        color: '#16A34A', // success green
                        showSwitch: false,
                        isLast: true
                    })
                ),
                _react2['default'].createElement(
                    _componentsNeoTypography.Eyebrow,
                    { style: { marginTop: 24, marginBottom: 10 } },
                    t('settings.interaction', 'Interação')
                ),
                _react2['default'].createElement(
                    _componentsNeoCard2['default'],
                    { variant: 'elevated', style: s.settingCard },
                    renderSettingItem({
                        label: t('settings.leftHanded'),
                        desc: t('settings.leftHandedDesc'),
                        iconName: 'Hand',
                        color: '#7C3AED', // violet — neutro e distinto
                        value: leftHandedMode,
                        onToggle: toggleLeftHanded,
                        isLast: true
                    })
                )
            )
        )
    );
}

var s = _reactNative.StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _utilsDesignSystem2026.DS.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontWeight: '800',
        letterSpacing: -0.5,
        flex: 1
    },

    scrollContent: {
        paddingHorizontal: _utilsDesignSystem2026.DS.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190
    },

    // Intro card
    introCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 26,
        borderRadius: 18
    },
    introIconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(16,185,129,0.22)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14
    },
    introTitle: {
        color: _utilsDesignSystem2026.DS.colors.neutral[900],
        fontSize: 16,
        marginBottom: 2
    },
    introBody: {
        color: _utilsDesignSystem2026.DS.colors.neutral[600],
        fontSize: 13,
        lineHeight: 18
    },

    // Section labels (consistente com Home/Menu/KnowledgeHub)
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: _utilsDesignSystem2026.DS.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85
    },

    // Setting card e rows
    settingCard: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 18
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14
    },
    settingIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14
    },
    settingTextCol: {
        flex: 1,
        marginRight: 12
    },
    settingLabel: {
        fontWeight: '700',
        color: _utilsDesignSystem2026.DS.colors.neutral[900]
    },
    settingDesc: {
        color: _utilsDesignSystem2026.DS.colors.neutral[600],
        marginTop: 2
    },
    nativeBadge: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    nativeBadgeText: {
        fontWeight: '800',
        color: _utilsDesignSystem2026.DS.colors.neutral[700],
        letterSpacing: 0.3
    },

    // Theme picker row (Sistema / Claro / Escuro)
    themePickerRow: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 10,
        paddingBottom: 14
    },
    themeChip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderWidth: 1
    },
    themeChipLabel: {
        fontWeight: '700',
        fontSize: 13
    }
});
module.exports = exports['default'];
/* INTRO — informacional, sem "magia/IA" */ /* SEÇÃO APARÊNCIA — toggle light/dark/system */ /* SEÇÃO VISÃO */ /* Font Scale Picker (3 níveis) */ /* SEÇÃO MOVIMENTO & ÁUDIO */ /* SEÇÃO INTERAÇÃO */