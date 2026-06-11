// screens/NewHomeWizard/P1_TipoMoradiaStep.js
//
// Passo 1 do wizard — Tipo de moradia + andares.
// Extraído do antigo OndeStep pra dar respiro narrativo e separar o
// "como é a estrutura física" (P1) do "que ambientes existem" (P2).

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = P1_TipoMoradiaStep;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _componentsNeoIcon = require('../../components/NeoIcon');

var _componentsNeoIcon2 = _interopRequireDefault(_componentsNeoIcon);

var _componentsNeoTypography = require('../../components/NeoTypography');

var _utilsDesignSystem2026 = require('../../utils/DesignSystem2026');

var _dataOnboarding_data = require('../../data/onboarding_data');

var _utilsGetLocalizedField = require('../../utils/getLocalizedField');

var _components = require('./components');

var _styles = require('./styles');

var _NarrativeHeader = require('./NarrativeHeader');

var _NarrativeHeader2 = _interopRequireDefault(_NarrativeHeader);

var C = _utilsDesignSystem2026.DS.colors;
var S = _utilsDesignSystem2026.DS.spacing;

function P1_TipoMoradiaStep(_ref) {
    var residenceName = _ref.residenceName;
    var setResidenceName = _ref.setResidenceName;
    var houseType = _ref.houseType;
    var setHouseType = _ref.setHouseType;
    var floors = _ref.floors;
    var setFloors = _ref.setFloors;

    return _react2['default'].createElement(
        _reactNative.ScrollView,
        { contentContainerStyle: { padding: S.lg, paddingBottom: 140 } },
        _react2['default'].createElement(_NarrativeHeader2['default'], {
            stepLabel: 'ONDE • PASSO 1 DE 3',
            intro: 'Vamos começar pela sua casa.',
            subIntro: 'É de onde tudo parte. Me conta o tipo de moradia e quantos andares ela tem.',
            iconName: 'Home2'
        }),
        _react2['default'].createElement(_components.NeoInput, {
            label: 'Identificação do local (ex: Casa Principal, Apartamento da Filha)',
            value: residenceName,
            onChangeText: setResidenceName,
            placeholder: 'Ex: Apartamento da Filha'
        }),
        _react2['default'].createElement(
            _componentsNeoTypography.H3,
            { style: { marginBottom: 12, fontSize: 17, marginTop: 8 } },
            'Tipo de moradia'
        ),
        _react2['default'].createElement(
            _reactNative.View,
            { style: [_styles.ss.chipRow, { marginBottom: 28 }] },
            _dataOnboarding_data.HOUSE_TYPES.map(function (h) {
                return _react2['default'].createElement(_components.Chip, { key: h.id, label: (0, _utilsGetLocalizedField.t_field)(h, 'label'), icon: h.icon, selected: houseType === h.id,
                    onPress: function () {
                        return setHouseType(h.id);
                    } });
            })
        ),
        _react2['default'].createElement(
            _componentsNeoTypography.H3,
            { style: { marginBottom: 12, fontSize: 17 } },
            'Quantos andares?'
        ),
        _react2['default'].createElement(
            _componentsNeoTypography.Body,
            { style: { color: C.neutral[600], marginBottom: 14, lineHeight: 19 } },
            'Conta os pavimentos habitáveis — escada conta como ponto de atenção pra próxima etapa.'
        ),
        _react2['default'].createElement(
            _reactNative.View,
            { style: _styles.ss.stepperRow },
            _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                { style: _styles.ss.stepperBtn, onPress: function () {
                        return floors > 1 && setFloors(floors - 1);
                    } },
                _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'Minus', size: 20, color: floors <= 1 ? C.neutral[300] : C.primary[600] })
            ),
            _react2['default'].createElement(
                _componentsNeoTypography.H2,
                { style: { marginHorizontal: 24, minWidth: 30, textAlign: 'center' } },
                floors
            ),
            _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                { style: _styles.ss.stepperBtn, onPress: function () {
                        return setFloors(floors + 1);
                    } },
                _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'Add', size: 20, color: C.primary[600] })
            )
        )
    );
}

module.exports = exports['default'];
/* Nome do Local */ /* Tipo de Residência */ /* Andares */