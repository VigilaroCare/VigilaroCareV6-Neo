/**
 * HumanFormStep.js
 * Formulário de cadastro de morador (humano).
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = HumanFormStep;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _componentsNeoIcon = require('../../components/NeoIcon');

var _componentsNeoIcon2 = _interopRequireDefault(_componentsNeoIcon);

var _componentsNeoTypography = require('../../components/NeoTypography');

var _utilsDesignSystem2026 = require('../../utils/DesignSystem2026');

var _dataOnboarding_data = require('../../data/onboarding_data');

var _components = require('./components');

var _styles = require('./styles');

var C = _utilsDesignSystem2026.DS.colors;
var S = _utilsDesignSystem2026.DS.spacing;

function HumanFormStep(_ref) {
    var formName = _ref.formName;
    var setFormName = _ref.setFormName;
    var formDOB = _ref.formDOB;
    var setFormDOB = _ref.setFormDOB;
    var formGender = _ref.formGender;
    var setFormGender = _ref.setFormGender;
    var formBond = _ref.formBond;
    var setFormBond = _ref.setFormBond;
    var formConditions = _ref.formConditions;
    var setFormConditions = _ref.setFormConditions;
    var formComodos = _ref.formComodos;
    var setFormComodos = _ref.setFormComodos;
    var _ref$availableRooms = _ref.availableRooms;
    var availableRooms = _ref$availableRooms === undefined ? [] : _ref$availableRooms;
    var formPhoto = _ref.formPhoto;
    var onPickPhoto = _ref.onPickPhoto;
    var onSave = _ref.onSave;
    var onToggleArray = _ref.onToggleArray;

    return _react2['default'].createElement(
        _reactNative.KeyboardAvoidingView,
        { style: { flex: 1 }, behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : undefined },
        _react2['default'].createElement(
            _reactNative.ScrollView,
            { contentContainerStyle: { padding: S.lg, paddingBottom: 140 } },
            _react2['default'].createElement(
                _componentsNeoTypography.Caption,
                { style: _styles.ss.phaseLabel },
                'PASSO 1 — NOVO INTEGRANTE (PESSOA)'
            ),
            _react2['default'].createElement(
                _componentsNeoTypography.H2,
                { style: { marginBottom: 24 } },
                'Dados Essenciais'
            ),
            _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                { onPress: onPickPhoto, activeOpacity: 0.8, style: { alignSelf: 'center', marginBottom: 24 } },
                _react2['default'].createElement(
                    _reactNative.View,
                    { style: _styles.ss.photoCircle },
                    formPhoto ? _react2['default'].createElement(_reactNative.Image, { source: { uri: formPhoto }, style: { width: 100, height: 100, borderRadius: 50 } }) : _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'User', size: 48, color: C.neutral[400] }),
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: _styles.ss.cameraBadge },
                        _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'Camera', size: 16, color: '#FFF' })
                    )
                ),
                _react2['default'].createElement(
                    _componentsNeoTypography.Caption,
                    { style: { textAlign: 'center', marginTop: 8, color: C.primary[600] } },
                    'Adicionar Foto'
                )
            ),
            _react2['default'].createElement(_components.NeoInput, { label: 'Nome Completo', value: formName, onChangeText: setFormName, placeholder: 'Ex: João Silva' }),
            _react2['default'].createElement(_components.NeoInput, {
                label: 'Data de Nascimento',
                value: formDOB,
                onChangeText: function (t) {
                    return setFormDOB((0, _dataOnboarding_data.formatDOB)(t));
                },
                placeholder: 'DD/MM/AAAA',
                keyboardType: 'numeric',
                maxLength: 10
            }),
            _react2['default'].createElement(
                _componentsNeoTypography.Caption,
                { style: { marginBottom: 8, color: C.neutral[700], fontWeight: '600' } },
                'Gênero'
            ),
            _react2['default'].createElement(
                _reactNative.View,
                { style: _styles.ss.chipRow },
                _dataOnboarding_data.GENDERS.map(function (g) {
                    return _react2['default'].createElement(_components.Chip, { key: g.id, label: g.label, selected: formGender === g.id, onPress: function () {
                            return setFormGender(g.id);
                        } });
                })
            ),
            _react2['default'].createElement(
                _componentsNeoTypography.Caption,
                { style: { marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' } },
                'Vínculo'
            ),
            _react2['default'].createElement(
                _reactNative.View,
                { style: _styles.ss.chipRow },
                _dataOnboarding_data.BOND_TYPES.map(function (b) {
                    return _react2['default'].createElement(_components.Chip, { key: b.id, label: b.label, selected: formBond === b.id, onPress: function () {
                            return setFormBond(b.id);
                        } });
                })
            ),
            _react2['default'].createElement(
                _componentsNeoTypography.Caption,
                { style: { marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' } },
                'Condições Especiais (opcional)'
            ),
            _react2['default'].createElement(
                _reactNative.View,
                { style: _styles.ss.chipRow },
                _dataOnboarding_data.SPECIAL_CONDITIONS.map(function (c) {
                    return _react2['default'].createElement(_components.Chip, { key: c.id, label: c.label, selected: formConditions.includes(c.id), onPress: function () {
                            return onToggleArray(formConditions, setFormConditions, c.id);
                        } });
                })
            ),
            _react2['default'].createElement(
                _componentsNeoTypography.Caption,
                { style: { marginBottom: 6, marginTop: 22, color: C.neutral[700], fontWeight: '600' } },
                'Quais ambientes essa pessoa usa?'
            ),
            _react2['default'].createElement(
                _componentsNeoTypography.Body,
                { style: { color: C.neutral[600], marginBottom: 12, lineHeight: 19, fontSize: 13 } },
                'Marca tudo que ela frequenta. Ajuda o app a priorizar o cuidado certo, no lugar certo.'
            ),
            availableRooms.length === 0 ? _react2['default'].createElement(
                _componentsNeoTypography.Caption,
                { style: { color: C.neutral[500], fontStyle: 'italic', marginBottom: 8 } },
                'Volta ao passo "Onde" e marca os ambientes da casa primeiro.'
            ) : _react2['default'].createElement(
                _reactNative.View,
                { style: _styles.ss.chipRow },
                availableRooms.map(function (r) {
                    return _react2['default'].createElement(_components.Chip, {
                        key: r.id,
                        label: r.label,
                        selected: formComodos.includes(r.id),
                        onPress: function () {
                            return onToggleArray(formComodos, setFormComodos, r.id);
                        }
                    });
                })
            ),
            _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                { style: _styles.ss.saveBtn, onPress: onSave, activeOpacity: 0.9 },
                _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'TickCircle', size: 22, color: '#FFF' }),
                _react2['default'].createElement(
                    _componentsNeoTypography.Body,
                    { style: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 } },
                    'Salvar perfil'
                )
            )
        )
    );
}

module.exports = exports['default'];
/* FOTO DO MORADOR */ /* ── Vínculo Morador↔Cômodo ──
                         O coração do briefing vivo: o app aprende quem usa cada
                         ambiente pra priorizar o que importa pra cada pessoa. */