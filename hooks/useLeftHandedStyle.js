/**
 * useLeftHandedStyle.js
 * Hook utilitário para adaptar estilos ao Modo Canhoto.
 * Vigilaro Care V6 Neo
 *
 * USO:
 *   const { isLeftHanded, fabPosition, rowDirection } = useLeftHandedStyle();
 *
 *   <View style={{ flexDirection: rowDirection }}>
 *   <View style={fabPosition('right')}>   // FAB padrão à direita → espelha para esquerda
 */

import { useAccessibility } from '../context/AccessibilityContext';

export function useLeftHandedStyle() {
    const { leftHandedMode } = useAccessibility();

    return {
        /** Boolean: modo canhoto ativo */
        isLeftHanded: leftHandedMode,

        /**
         * Retorna o style de posicionamento para FABs.
         * @param {'left'|'right'} defaultSide - Lado padrão do FAB
         * @param {number} offset - Distância da borda (default: 20)
         * @returns {Object} Style object com left ou right
         */
        fabPosition: (defaultSide, offset = 20) => {
            const side = leftHandedMode
                ? (defaultSide === 'left' ? 'right' : 'left')
                : defaultSide;
            return { [side]: offset };
        },

        /**
         * Retorna flexDirection para rows que devem espelhar.
         * @returns {'row'|'row-reverse'}
         */
        rowDirection: leftHandedMode ? 'row-reverse' : 'row',

        /**
         * Retorna o lado oposto para tooltips e popovers.
         * @param {'left'|'right'} defaultSide
         * @param {number} offset
         * @returns {Object} Style object
         */
        tooltipPosition: (defaultSide, offset = 70) => {
            const side = leftHandedMode
                ? (defaultSide === 'left' ? 'right' : 'left')
                : defaultSide;
            return { [side]: offset };
        },
    };
}
