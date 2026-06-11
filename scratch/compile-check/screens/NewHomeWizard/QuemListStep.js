/**
 * QuemListStep.js
 * Lista de moradores/pets do app + checkbox "mora nesta residência?".
 *
 * Padrão B++ "briefing vivo": perfis são GLOBAIS (existem uma vez), mas
 * cada residência declara QUEM mora lá via moradia.habitantes[]. Quando
 * o user cria uma nova residência (ex: Casa de Praia), ele decide quais
 * perfis existentes moram lá marcando os checkboxes.
 *
 * Estado do checkbox vem do ProfileService.isProfileLinkedToActiveResidence.
 * Tap → link/unlink na residência ATIVA, sem deletar o perfil global.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = QuemListStep;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _componentsNeoIcon = require('../../components/NeoIcon');

var _componentsNeoIcon2 = _interopRequireDefault(_componentsNeoIcon);

var _componentsNeoTypography = require('../../components/NeoTypography');

var _utilsDesignSystem2026 = require('../../utils/DesignSystem2026');

var _styles = require('./styles');

var C = _utilsDesignSystem2026.DS.colors;
var S = _utilsDesignSystem2026.DS.spacing;

function formatBirthdate(dateStr) {
    if (!dateStr) return 'Sem data';
    var normalized = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    var yyyymmddRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    var match = normalized.match(yyyymmddRegex);
    if (match) {
        var _match = _slicedToArray(match, 4);

        var year = _match[1];
        var month = _match[2];
        var day = _match[3];

        return day + '/' + month + '/' + year;
    }
    return normalized;
}

function QuemListStep(_ref) // (perfilId, currentlyLinked) => void
{
    var profiles = _ref.profiles;
    var _ref$linkedIds = _ref.linkedIds;
    var linkedIds = _ref$linkedIds === undefined ? [] : _ref$linkedIds;
    var // IDs vinculados à residência ATIVA
    onAddHuman = _ref.onAddHuman;
    var onAddPet = _ref.onAddPet;
    var onRemove = _ref.onRemove;
    var onToggleLink = _ref.onToggleLink;

    var linkedSet = new Set(linkedIds);

    return _react2['default'].createElement(
        _reactNative.ScrollView,
        { contentContainerStyle: { padding: S.lg, paddingBottom: 140 } },
        _react2['default'].createElement(
            _componentsNeoTypography.Caption,
            { style: _styles.ss.phaseLabel },
            'PASSO • QUEM'
        ),
        _react2['default'].createElement(
            _componentsNeoTypography.H2,
            { style: { marginBottom: 8 } },
            'Quem vamos proteger?'
        ),
        _react2['default'].createElement(
            _componentsNeoTypography.Body,
            { style: { color: C.neutral[700], marginBottom: 24, lineHeight: 21 } },
            'Marque quem mora ou frequenta esta residência. Você pode adicionar pessoas e pets, e usar os mesmos perfis em outras residências (casa de praia, sítio…).'
        ),
        profiles.length > 0 && _react2['default'].createElement(
            _reactNative.View,
            { style: { gap: 12, marginBottom: 24 } },
            profiles.map(function (p) {
                var isLinked = linkedSet.has(p.id);
                return _react2['default'].createElement(
                    _reactNative.View,
                    { key: p.id, style: [_styles.ss.profileCard, isLinked && {
                            borderWidth: 1.5,
                            borderColor: C.primary[500],
                            backgroundColor: 'rgba(16,185,129,0.06)'
                        }] },
                    _react2['default'].createElement(
                        _reactNative.TouchableOpacity,
                        {
                            onPress: function () {
                                return onToggleLink && onToggleLink(p.id, isLinked);
                            },
                            hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
                            style: {
                                width: 28, height: 28, borderRadius: 14,
                                borderWidth: 2,
                                borderColor: isLinked ? C.primary[600] : C.neutral[400],
                                backgroundColor: isLinked ? C.primary[600] : 'transparent',
                                alignItems: 'center', justifyContent: 'center',
                                marginRight: 14
                            },
                            accessibilityRole: 'checkbox',
                            accessibilityState: { checked: isLinked },
                            accessibilityLabel: p.nome + ' ' + (isLinked ? 'mora' : 'não mora') + ' aqui. Toque para alterar.'
                        },
                        isLinked && _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'TickCircle', size: 18, color: '#FFF', variant: 'Bold' })
                    ),
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: [_styles.ss.avatar, { backgroundColor: p.tipo === 'pet' ? '#FFF3E0' : C.primary[100], marginRight: 12 }] },
                        _react2['default'].createElement(_componentsNeoIcon2['default'], {
                            name: p.tipo === 'pet' ? 'pet' : 'profile-circle',
                            size: 24,
                            color: p.tipo === 'pet' ? '#EF6C00' : C.primary[600]
                        })
                    ),
                    _react2['default'].createElement(
                        _reactNative.View,
                        { style: { flex: 1 } },
                        _react2['default'].createElement(
                            _componentsNeoTypography.H3,
                            { style: { fontSize: 16 } },
                            p.nome
                        ),
                        _react2['default'].createElement(
                            _componentsNeoTypography.Caption,
                            { style: { color: C.neutral[500] } },
                            p.tipo === 'pet' ? p.especie || 'Pet' : (p.vinculo === 'frequentador' ? 'Visitante Eventual' : 'Morador Fixo') + ' • ' + formatBirthdate(p.dataNascimento)
                        )
                    ),
                    _react2['default'].createElement(
                        _reactNative.TouchableOpacity,
                        {
                            onPress: function () {
                                return onRemove(p.id);
                            },
                            hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
                            accessibilityRole: 'button',
                            accessibilityLabel: 'Apagar perfil de ' + p.nome
                        },
                        _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'trash', size: 20, color: C.neutral[400] })
                    )
                );
            })
        ),
        profiles.length === 0 && _react2['default'].createElement(
            _reactNative.View,
            { style: { paddingVertical: 16, paddingHorizontal: 4, marginBottom: 16 } },
            _react2['default'].createElement(
                _componentsNeoTypography.Small,
                { style: { color: C.neutral[600], fontStyle: 'italic', textAlign: 'center', lineHeight: 19 } },
                'Nenhum perfil ainda. Adicione um morador ou pet abaixo.'
            )
        ),
        _react2['default'].createElement(
            _reactNative.View,
            { style: { gap: 12 } },
            _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                { style: _styles.ss.addBtn, onPress: onAddHuman, activeOpacity: 0.8 },
                _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'profile-add', size: 24, color: C.primary[600] }),
                _react2['default'].createElement(
                    _componentsNeoTypography.Body,
                    { style: { color: C.primary[700], fontWeight: '600', marginLeft: 12 } },
                    'Adicionar Morador / Visitante'
                )
            ),
            _react2['default'].createElement(
                _reactNative.TouchableOpacity,
                { style: [_styles.ss.addBtn, { backgroundColor: '#FFF8E1' }], onPress: onAddPet, activeOpacity: 0.8 },
                _react2['default'].createElement(_componentsNeoIcon2['default'], { name: 'pet', size: 24, color: '#EF6C00' }),
                _react2['default'].createElement(
                    _componentsNeoTypography.Body,
                    { style: { color: '#E65100', fontWeight: '600', marginLeft: 12 } },
                    'Adicionar Pet'
                )
            )
        )
    );
}

module.exports = exports['default'];
/* Checkbox grande à esquerda — "mora aqui?" */ /* Lixeira — apaga o perfil GLOBAL (confirmação no orquestrador) */