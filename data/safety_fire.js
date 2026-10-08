/**
 * safety_fire.js — Prevenção de Incêndios
 *
 * Renderizado por screens/GenericCategoryScreen.js via `t_field`: o `title` do
 * topo e, por seção, `title` e `content`.
 *
 * ATENÇÃO: `intro`, `subtitle` e `checklist` NÃO são exibidos por tela nenhuma
 * — o único consumidor deste ficheiro é o GenericCategoryScreen, que lê apenas
 * title e sections. O Agnaldo revisou o `intro` (AE-0031) sem saber que ele não
 * chega ao utilizador. Ficam aqui, traduzidos, porque o texto é bom e a decisão
 * de exibir ou remover é dele; está anotado em docs/PENDENCIAS.md.
 *
 * TRADUÇÃO (08/10/2026): ficheiro sem nenhuma tradução até aqui. `_ptpt` entra
 * onde o termo brasileiro não se usa em Portugal ("benjamim" é ficha tripla,
 * "tomada" e "disjuntor" são iguais, "espelho de tomada" é espelho/tampa).
 */
export const SAFETY_FIRE = {
    id: 'fire_prevention',
    title: 'Prevenção de Incêndios',
    title_en: 'Fire Prevention',
    title_es: 'Prevención de Incendios',
    title_ptpt: 'Prevenção de Incêndios',
    subtitle: 'Segurança contra Fogo',
    subtitle_en: 'Fire safety',
    subtitle_es: 'Seguridad contra incendios',
    icon: 'flame',
    color: '#D32F2F',
    intro: 'A prevenção é a melhor ferramenta contra incêndios. Conheça os riscos e saiba como agir.',
    intro_en: 'Prevention is the best tool against fire. Know the risks and know how to act.',
    intro_es: 'La prevención es la mejor herramienta contra los incendios. Conozca los riesgos y sepa cómo actuar.',
    sections: [
        {
            title: 'Cozinha Segura',
            title_en: 'Kitchen Safety',
            title_es: 'Cocina Segura',
            icon: 'restaurant',
            imagemUrl: 'https://images.pexels.com/photos/3722212/pexels-photo-3722212.jpeg?auto=compress&cs=tinysrgb&w=1200',
            content: 'Nunca jogue água em panelas com óleo pegando fogo. Desligue o fogo e com muito cuidado, cubra a panela com uma tampa para abafar as chamas.',
            content_en: 'Never throw water on a pan of burning oil. Turn off the heat and, very carefully, cover the pan with a lid to smother the flames.',
            content_es: 'Nunca eche agua en una sartén con aceite en llamas. Apague el fuego y, con mucho cuidado, tape la sartén para ahogar las llamas.',
            content_ptpt: 'Nunca atire água para panelas com óleo em chamas. Desligue o bico e, com muito cuidado, tape a panela para abafar as chamas.',
        },
        {
            title: 'Instalações Elétricas',
            title_en: 'Electrical Installations',
            title_es: 'Instalaciones Eléctricas',
            icon: 'flash',
            imagemUrl: null,
            content: 'Evite o uso de adaptadores ("benjamins") de baixa qualidade e o uso de vários na mesma tomada. Fios quentes ou disjuntores desarmando indicam sobrecarga. Observe se os espelhos (tampa) das tomadas e dos interruptores mudam de cor (escurecem). Isso pode sinalizar emendas malfeitas e aquecimento que podem resultar em fonte de incêndio.',
            content_en: 'Avoid low-quality multi-plug adapters, and avoid stacking several of them in the same socket. Warm cables or breakers that keep tripping indicate overload. Watch whether the faceplates of sockets and switches change colour (darken). That can point to badly made joints and heating that may become a source of fire.',
            content_es: 'Evite los ladrones y adaptadores múltiples de baja calidad, y no acumule varios en el mismo enchufe. Cables calientes o magnetotérmicos que saltan indican sobrecarga. Observe si los embellecedores de enchufes e interruptores cambian de color (se oscurecen). Eso puede indicar empalmes mal hechos y calentamiento que pueden convertirse en foco de incendio.',
            content_ptpt: 'Evite fichas triplas e adaptadores de baixa qualidade, e não acumule vários na mesma tomada. Fios quentes ou disjuntores a disparar indicam sobrecarga. Observe se os espelhos das tomadas e dos interruptores mudam de cor (escurecem). Isso pode sinalizar emendas malfeitas e aquecimento que podem dar origem a um incêndio.',
        },
    ],
    checklist: [
        'Instalar detectores de fumaça',
        'Verificar validade do extintor',
        'Não deixar velas acesas sem supervisão',
        'Manter saídas livres de obstáculos',
    ],
    checklist_en: [
        'Fit smoke detectors',
        'Check the extinguisher\'s expiry date',
        'Never leave lit candles unattended',
        'Keep exits clear of obstacles',
    ],
    checklist_es: [
        'Instalar detectores de humo',
        'Comprobar la caducidad del extintor',
        'No dejar velas encendidas sin supervisión',
        'Mantener las salidas libres de obstáculos',
    ],
    checklist_ptpt: [
        'Instalar detetores de fumo',
        'Verificar a validade do extintor',
        'Não deixar velas acesas sem supervisão',
        'Manter as saídas livres de obstáculos',
    ],
};
