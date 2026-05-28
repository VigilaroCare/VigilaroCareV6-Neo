import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';
import * as Iconsax from 'iconsax-react-native';

/**
 * NeoIcon — API ÚNICA de iconografia do Vigilaro Care (DS2026).
 *
 * Toda tela/componente deve consumir ícones via este wrapper. Imports
 * diretos de `iconsax-react-native` em código novo estão deprecated;
 * telas existentes serão migradas incrementalmente conforme forem tocadas.
 *
 * ──────────────────────────────────────────────────────────────────────
 * CONTRATO SEMÂNTICO (governança visual do app):
 *
 *   "Bold ancora, Linear atua."
 *
 *   - variant="Bold"    →  ícones que ANCORAM uma seção/contexto.
 *                          Uso em: cards hero, círculos/quadrados
 *                          decorativos dentro de cards, navegação
 *                          principal (tab bar), status ativos.
 *
 *   - variant="Linear"  →  ícones que ATUAM (ações). Stroke 1.5px.
 *                          Uso em: botões inline (Edit, Trash, Add),
 *                          setas (ArrowRight, ArrowLeft), back buttons,
 *                          itens em listas densas, modais, secundários.
 *
 * A regra não é rígida — é um padrão consistente do DS. O caller decide
 * passando `variant` explicitamente. NUNCA omita (default é 'Linear').
 *
 * ──────────────────────────────────────────────────────────────────────
 * Catálogo:
 *  1. Iconsax (biblioteca) — qualquer nome PascalCase da iconsax-react-native
 *  2. SVGs custom Linear — Kitchen, Bathroom, BabyCrib, Elder, Stairs,
 *     WashingMachine, Tree, Pool, ShareNetwork (stroke 1.5, currentColor)
 *  3. SVGs custom Bold — Metodologia3D, RiscoAmbiente, ProtejaPet,
 *     PrevencaoIncendio (fill, ignoram variant prop pois são fixos)
 *
 *  Os 4 SVGs Bold também são re-exportados como named exports para
 *  back-compat com callsites que ainda os importam diretamente.
 */

// SVGs custom Bold (fill) — assinaturas semânticas do Vigilaro Care.
// São fill-only e ignoram o prop `variant` (sempre renderizam como Bold).
const Metodologia3DSvg = ({ size = 24, color = "#000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M8.71973 15.52C7.72973 15.52 6.86973 14.85 6.60973 13.9C6.49973 13.5 6.73973 13.09 7.13973 12.98C7.53973 12.87 7.94973 13.11 8.05973 13.51C8.13973 13.81 8.41972 14.02 8.72972 14.02C9.11972 14.02 9.43972 13.7 9.43972 13.31C9.43972 13 9.18973 12.75 8.87973 12.75C8.46973 12.75 8.12973 12.41 8.12973 12C8.12973 11.59 8.46973 11.25 8.87973 11.25C9.18973 11.25 9.43972 11 9.43972 10.69C9.43972 10.29 9.11972 9.96997 8.72972 9.96997C8.41972 9.96997 8.14972 10.18 8.06972 10.48C7.95972 10.88 7.54973 11.12 7.14973 11.01C6.74973 10.9 6.50973 10.49 6.61973 10.09C6.87973 9.13997 7.73972 8.47997 8.72972 8.46997C9.95972 8.46997 10.9497 9.45997 10.9497 10.69C10.9497 11.19 10.7697 11.65 10.4797 12C10.7697 12.36 10.9497 12.81 10.9497 13.31C10.9497 14.53 9.95972 15.52 8.73972 15.52H8.71973Z" fill={color} />
        <Path d="M14.53 15.52H12.96C12.55 15.52 12.21 15.18 12.21 14.77V9.21002C12.21 8.80002 12.55 8.46002 12.96 8.46002H14.53C16.12 8.46002 17.42 9.76002 17.42 11.35V12.63C17.42 14.22 16.12 15.52 14.53 15.52ZM13.71 14.02H14.53C15.29 14.02 15.92 13.4 15.92 12.63V11.35C15.92 10.58 15.3 9.96002 14.53 9.96002H13.71V14.02Z" fill={color} />
        <Path d="M17 22.75H7C3.83 22.75 1.25 20.17 1.25 17V7C1.25 3.83 3.83 1.25 7 1.25H17C20.17 1.25 22.75 3.83 22.75 7V17C22.75 20.17 20.17 22.75 17 22.75ZM7 2.75C4.66 2.75 2.75 4.66 2.75 7V17C2.75 19.34 4.66 21.25 7 21.25H17C19.34 21.25 21.25 19.34 21.25 17V7C21.25 4.66 19.34 2.75 17 2.75H7Z" fill={color} />
    </Svg>
);

const RiscoAmbienteSvg = ({ size = 24, color = "#000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M10.89 22.7502H6.44C3.58 22.7502 1.25 20.4202 1.25 17.5602V11.0002C1.25 9.24018 2.04 7.61018 3.41 6.51018L8.41 2.51018C10.53 0.820176 13.48 0.820176 15.59 2.51018L20.59 6.51018C21.96 7.61018 22.75 9.24018 22.75 11.0002V12.0002C22.75 12.4102 22.41 12.7502 22 12.7502C21.59 12.7502 21.25 12.4102 21.25 12.0002V11.0002C21.25 9.70018 20.67 8.49018 19.66 7.68018L14.65 3.68018C13.09 2.43018 10.9 2.43018 9.34 3.68018L4.35 7.68018C3.34 8.49018 2.75 9.70018 2.75 11.0002V17.5602C2.75 19.6002 4.41 21.2502 6.44 21.2502H10.88C11.29 21.2502 11.63 21.5902 11.63 22.0002C11.63 22.4102 11.29 22.7502 10.88 22.7502H10.89Z" fill={color} />
        <Path d="M18.3903 22.1902C16.6203 22.1902 15.0403 21.1302 14.3603 19.5002C13.6803 17.8602 14.0503 16.0002 15.3103 14.7502C16.1303 13.9302 17.2303 13.4702 18.3903 13.4702C19.5503 13.4702 20.6603 13.9402 21.4703 14.7502C22.7203 16.0002 23.0903 17.8702 22.4103 19.5002C21.7303 21.1302 20.1503 22.1902 18.3803 22.1902H18.3903ZM18.3903 14.9702C17.6203 14.9702 16.9103 15.2702 16.3703 15.8102C15.5503 16.6302 15.3103 17.8602 15.7503 18.9302C16.2003 20.0002 17.2303 20.7002 18.3903 20.7002C19.5503 20.7002 20.5903 20.0102 21.0303 18.9302C21.4803 17.8602 21.2303 16.6302 20.4103 15.8102C19.8803 15.2802 19.1403 14.9702 18.3903 14.9702Z" fill={color} />
        <Path d="M14.2998 22.7499C14.1098 22.7499 13.9198 22.6799 13.7698 22.5299C13.6198 22.3799 13.5498 22.1899 13.5498 21.9999C13.5498 21.8099 13.6198 21.6199 13.7698 21.4699L15.3498 19.8899C15.6398 19.5999 16.1198 19.5999 16.4098 19.8899C16.5598 20.0399 16.6298 20.2299 16.6298 20.4199C16.6298 20.6099 16.5598 20.7999 16.4098 20.9499L14.8298 22.5299C14.6798 22.6799 14.4898 22.7499 14.2998 22.7499Z" fill={color} />
    </Svg>
);

const ProtejaPetSvg = ({ size = 24, color = "#000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M14.04 22.75H9.24996C7.62996 22.75 6.15996 22.12 5.09996 20.96C4.03996 19.81 3.52996 18.29 3.66996 16.68C4.00996 12.58 7.62996 9.25 11.75 9.25C15.54 9.25 19.12 12.29 19.75 16.02C20.05 17.8 19.61 19.48 18.53 20.76C17.43 22.04 15.84 22.75 14.04 22.75ZM11.74 10.75C8.38996 10.75 5.43996 13.47 5.15996 16.81C5.05996 18 5.42996 19.11 6.19996 19.95C6.96996 20.79 8.04996 21.25 9.23996 21.25H14.03C15.38 21.25 16.57 20.73 17.36 19.8C18.15 18.87 18.47 17.61 18.25 16.27C17.75 13.23 14.83 10.75 11.74 10.75Z" fill={color} />
        <Path d="M10.47 8.25C8.67997 8.25 7.21997 6.79 7.21997 5C7.21997 3.21 8.67997 1.75 10.47 1.75C12.26 1.75 13.72 3.21 13.72 5C13.72 6.79 12.27 8.25 10.47 8.25ZM10.47 3.25C9.50997 3.25 8.71997 4.04 8.71997 5C8.71997 5.96 9.50997 6.75 10.47 6.75C11.43 6.75 12.22 5.96 12.22 5C12.22 4.04 11.44 3.25 10.47 3.25Z" fill={color} />
        <Path d="M17.3 9.44922C15.78 9.44922 14.55 8.21922 14.55 6.69922C14.55 5.17922 15.78 3.94922 17.3 3.94922C18.82 3.94922 20.05 5.17922 20.05 6.69922C20.05 8.21922 18.82 9.44922 17.3 9.44922ZM17.3 5.44922C16.61 5.44922 16.05 6.00922 16.05 6.69922C16.05 7.38922 16.61 7.94922 17.3 7.94922C17.99 7.94922 18.55 7.38922 18.55 6.69922C18.55 6.00922 17.99 5.44922 17.3 5.44922Z" fill={color} />
        <Path d="M21 13.4492C19.76 13.4492 18.75 12.4392 18.75 11.1992C18.75 9.95922 19.76 8.94922 21 8.94922C22.24 8.94922 23.25 9.95922 23.25 11.1992C23.25 12.4392 22.24 13.4492 21 13.4492ZM21 10.4492C20.59 10.4492 20.25 10.7892 20.25 11.1992C20.25 11.6092 20.59 11.9492 21 11.9492C21.41 11.9492 21.75 11.6092 21.75 11.1992C21.75 10.7892 21.41 10.4492 21 10.4492Z" fill={color} />
        <Path d="M3.96997 11.4492C2.44997 11.4492 1.21997 10.2192 1.21997 8.69922C1.21997 7.17922 2.44997 5.94922 3.96997 5.94922C5.48997 5.94922 6.71997 7.17922 6.71997 8.69922C6.71997 10.2192 5.48997 11.4492 3.96997 11.4492ZM3.96997 7.44922C3.27997 7.44922 2.71997 8.00922 2.71997 8.69922C2.71997 9.38922 3.27997 9.94922 3.96997 9.94922C4.65997 9.94922 5.21997 9.38922 5.21997 8.69922C5.21997 8.00922 4.65997 7.44922 3.96997 7.44922Z" fill={color} />
    </Svg>
);

const PrevencaoIncendioSvg = ({ size = 24, color = "#000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M18.25 22.7499H9.75V12.4999C9.75 10.8599 10.71 9.35988 12.18 8.66988C13.26 8.11988 14.71 8.10988 15.84 8.67988C17.29 9.35988 18.25 10.8599 18.25 12.4999V22.7499ZM11.25 21.2499H16.75V12.4999C16.75 11.4399 16.13 10.4699 15.18 10.0299C14.44 9.64988 13.54 9.65988 12.84 10.0199C11.86 10.4799 11.25 11.4499 11.25 12.4999V21.2499Z" fill={color} />
        <Path d="M16.25 10.57L15.16 10.01C14.46 9.65004 13.54 9.65004 12.84 10.01L11.75 10.57V3.50004L13.12 4.88004C13.61 5.39004 14.48 5.35004 14.93 4.83004L16.25 3.29004V10.59V10.57ZM14 8.25004C14.26 8.25004 14.51 8.27004 14.75 8.32004V6.65004C14.27 6.79004 13.73 6.79004 13.25 6.65004V8.32004C13.49 8.28004 13.74 8.25004 14 8.25004Z" fill={color} />
        <Path d="M14.0002 6.74965C13.2602 6.74965 12.5702 6.45965 12.0502 5.92965L11.9702 5.83965C11.4902 5.31965 11.2402 4.66965 11.2402 3.98965C11.2402 3.24965 11.5302 2.55965 12.0602 2.03965C13.0602 1.00965 14.9102 0.999648 15.9402 2.04965C16.4502 2.54965 16.7402 3.23965 16.7402 3.97965C16.7402 4.65965 16.4902 5.30965 16.0402 5.79965C15.5402 6.38965 14.7802 6.72965 13.9902 6.72965L14.0002 6.74965ZM14.0002 2.74965C13.6702 2.74965 13.3502 2.87965 13.1302 3.10965C12.8802 3.34965 12.7502 3.65965 12.7502 3.99965C12.7502 4.30965 12.8502 4.58965 13.0502 4.79965L13.1302 4.88965C13.5902 5.35965 14.4802 5.34965 14.9302 4.81965C15.1402 4.57965 15.2502 4.30965 15.2502 3.99965C15.2502 3.66965 15.1202 3.35965 14.8902 3.12965C14.6502 2.87965 14.3402 2.74965 14.0002 2.74965Z" fill={color} />
        <Path d="M8.95906 19.75H3.03906L4.41906 14.25H7.58906L8.95906 19.75ZM7.03906 18.25L6.40907 15.75H5.57906L4.94906 18.25H7.03906Z" fill={color} />
        <Path d="M6.75 14.9604H5.25V4.21039L12.64 3.15039L12.85 4.64039L6.75 5.51039V14.9604Z" fill={color} />
        <Path d="M20.7491 6.39961L15.1191 5.34961L15.3691 3.99961L15.1191 2.64961L20.7491 1.59961V6.40961V6.39961ZM16.0691 3.99961L19.2491 4.59961V3.40961L16.0691 3.99961Z" fill={color} />
    </Svg>
);

// Re-exports nominais (back-compat com callsites legados que importavam
// estes ícones diretamente do antigo CustomIconsax).
export const Metodologia3D = Metodologia3DSvg;
export const RiscoAmbiente = RiscoAmbienteSvg;
export const ProtejaPet = ProtejaPetSvg;
export const PrevencaoIncendio = PrevencaoIncendioSvg;

// Custom SVGs designed to perfectly match the Iconsax Linear style
// (strokeWidth=1.5, strokeLinecap=round, viewBox=0 0 24 24, size=24, color=currentColor)

const SvgBase = ({ size, color, children }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {React.Children.map(children, child =>
            React.cloneElement(child, {
                stroke: color,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
            })
        )}
    </Svg>
);

const CustomIcons = {
    // Cozinha
    Kitchen: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M4 14C4 17.3137 6.68629 20 10 20H14C17.3137 20 20 17.3137 20 14V13C20 12.4477 19.5523 12 19 12H5C4.44772 12 4 12.4477 4 13V14Z" />
            <Path d="M4 12V10" />
            <Path d="M20 12V10" />
            <Path d="M9 12V8C9 6.89543 9.89543 6 11 6H13C14.1046 6 15 6.89543 15 8V12" />
            <Path d="M11 3V5" />
            <Path d="M13 3V5" />
        </SvgBase>
    ),
    // Banheiro (Chuveiro)
    Bathroom: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M12 4V8" />
            <Path d="M12 4C14.2091 4 16 5.79086 16 8H8C8 5.79086 9.79086 4 12 4Z" />
            <Path d="M8 12V14" />
            <Path d="M12 12V16" />
            <Path d="M16 12V14" />
            <Path d="M6 10H18" />
        </SvgBase>
    ),
    // Quarto do Bebê (Berço)
    BabyCrib: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M3 5V21" />
            <Path d="M21 5V21" />
            <Path d="M3 17H21" />
            <Path d="M3 10H21" />
            <Path d="M8 10V17" />
            <Path d="M12 10V17" />
            <Path d="M16 10V17" />
            <Circle cx="12" cy="7" r="2" />
        </SvgBase>
    ),
    // Quarto do Idoso (Bengala)
    Elder: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M14 20L11 9" />
            <Path d="M11 9C10.5 7 11 5 13 4C15 3 17 4 17 6V7" />
            <Path d="M5 20L19 20" />
        </SvgBase>
    ),
    // Escadas
    Stairs: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M4 20H9V15H14V10H19V5" />
            <Path d="M4 20L19 5" strokeDasharray="2 2" />
        </SvgBase>
    ),
    // Lavanderia / Máquina de Lavar
    WashingMachine: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Rect x="5" y="3" width="14" height="18" rx="3" />
            <Circle cx="12" cy="13" r="4" />
            <Line x1="12" y1="13" x2="12" y2="13.01" />
            <Path d="M8 6H10" />
            <Path d="M14 6H16" />
        </SvgBase>
    ),
    // Área Externa / Jardim (Árvore)
    Tree: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M12 21V11" />
            <Path d="M12 15C9 15 8 12 8 12" />
            <Path d="M12 13C15 13 16 10 16 10" />
            <Path d="M12 3C7.5 3 5 6.5 7 10C5 11.5 6 15 12 15C18 15 19 11.5 17 10C19 6.5 16.5 3 12 3Z" />
        </SvgBase>
    ),
    // Piscina (Ondas e Escada)
    Pool: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M3 15C5 15 6 13 8 13C10 13 11 15 13 15C15 15 16 13 18 13C20 13 21 15 21 15" />
            <Path d="M3 19C5 19 6 17 8 17C10 17 11 19 13 19C15 19 16 17 18 17C20 17 21 19 21 19" />
            <Path d="M6 5V13" />
            <Path d="M10 5V13" />
            <Path d="M6 7H10" />
            <Path d="M6 10H10" />
        </SvgBase>
    ),
    // Compartilhamento (Nós conectados)
    ShareNetwork: ({ size, color }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M6.40991 15.91C4.24991 15.91 2.5 14.16 2.5 12C2.5 9.83997 4.24991 8.08997 6.40991 8.08997C8.56991 8.08997 10.3201 9.83997 10.3201 12C10.3201 14.16 8.56991 15.91 6.40991 15.91ZM6.40991 9.58997C5.07991 9.58997 4 10.67 4 12C4 13.33 5.07991 14.41 6.40991 14.41C7.73991 14.41 8.82007 13.33 8.82007 12C8.82007 10.67 7.73991 9.58997 6.40991 9.58997Z" fill={color} />
            <Path d="M17.5898 9.07001C15.4298 9.07001 13.6797 7.32 13.6797 5.16C13.6797 3 15.4298 1.25 17.5898 1.25C19.7498 1.25 21.4998 3 21.4998 5.16C21.4998 7.32 19.7498 9.07001 17.5898 9.07001ZM17.5898 2.75C16.2598 2.75 15.1797 3.83 15.1797 5.16C15.1797 6.49 16.2598 7.57001 17.5898 7.57001C18.9198 7.57001 19.9998 6.49 19.9998 5.16C19.9998 3.83 18.9198 2.75 17.5898 2.75Z" fill={color} />
            <Path d="M17.5898 22.75C15.4298 22.75 13.6797 21 13.6797 18.84C13.6797 16.68 15.4298 14.93 17.5898 14.93C19.7498 14.93 21.4998 16.68 21.4998 18.84C21.4998 21 19.7498 22.75 17.5898 22.75ZM17.5898 16.43C16.2598 16.43 15.1797 17.51 15.1797 18.84C15.1797 20.17 16.2598 21.25 17.5898 21.25C18.9198 21.25 19.9998 20.17 19.9998 18.84C19.9998 17.51 18.9198 16.43 17.5898 16.43Z" fill={color} />
            <Path d="M9.10007 11.09C8.85007 11.09 8.59994 10.96 8.45994 10.73C8.23994 10.38 8.35994 9.92 8.70994 9.7L14.5 6.16001C14.85 5.94001 15.32 6.06001 15.53 6.41001C15.75 6.76001 15.63 7.22001 15.28 7.44001L9.48997 10.98C9.36997 11.05 9.23007 11.09 9.10007 11.09Z" fill={color} />
            <Path d="M14.8898 17.95C14.7598 17.95 14.6199 17.91 14.4999 17.84L8.70989 14.3C8.35989 14.08 8.24989 13.62 8.45989 13.27C8.66989 12.92 9.12992 12.8 9.48992 13.02L15.28 16.56C15.63 16.78 15.74 17.24 15.53 17.59C15.39 17.83 15.1398 17.95 14.8898 17.95Z" fill={color} />
        </Svg>
    ),
    // Vigilaro Bold (semantic, fill-only) — usados como ancoragens premium
    Metodologia3D: Metodologia3DSvg,
    RiscoAmbiente: RiscoAmbienteSvg,
    ProtejaPet: ProtejaPetSvg,
    PrevencaoIncendio: PrevencaoIncendioSvg,
};

const mapName = (name) => {
    if (!name) return name;
    
    // Custom explicit overrides for legacy names or custom semantic maps
    const overrides = {
        'pet': 'Heart',
        'Pet': 'Heart',
        'profile-circle': 'User',
        'ProfileCircle': 'User',
        'profile-add': 'UserAdd',
        'ProfileAdd': 'UserAdd',
        'gas-station': 'GasStation',
        'GasStation': 'GasStation',
        'happyemoji': 'Happyemoji',
        'Happyemoji': 'Happyemoji',
        'tick-square': 'TickSquare',
        'TickSquare': 'TickSquare',
        'arrow-right': 'ArrowRight',
        'ArrowRight': 'ArrowRight',
        'trash': 'Trash',
        'Trash': 'Trash',
        'minus': 'Minus',
        'Minus': 'Minus',
        'add': 'Add',
        'Add': 'Add',
        'camera': 'Camera',
        'Camera': 'Camera',
    };
    
    if (overrides[name]) return overrides[name];
    
    // Convert kebab-case to PascalCase (e.g., house-2 -> House2, tick-square -> TickSquare)
    const pascal = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
        
    return pascal;
};

export default function NeoIcon({
    name: rawName,
    size = 24,
    color = '#000000',
    variant = 'Linear', // Linear, Bold, Broken, Bulk, TwoTone
    style
}) {
    const name = mapName(rawName);

    // Check if it's a Custom SVG map
    if (CustomIcons[name]) {
        const CustomIconComponent = CustomIcons[name];
        return (
            <View style={style}>
                <CustomIconComponent size={size} color={color} />
            </View>
        );
    }

    // Otherwise, check Iconsax
    const IconsaxComponent = Iconsax[name];

    if (IconsaxComponent) {
        return (
            <View style={style}>
                <IconsaxComponent size={size} color={color} variant={variant} />
            </View>
        );
    }

    // Default Fallback
    const DefaultFallback = Iconsax.Danger;
    return (
        <View style={style}>
            <DefaultFallback size={size} color={color} variant={variant} />
        </View>
    );
}
