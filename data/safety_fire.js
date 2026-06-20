export const SAFETY_FIRE = {
    id: 'fire_prevention',
    title: 'Prevenção de Incêndios',
    subtitle: 'Segurança contra Fogo',
    icon: 'flame',
    color: '#D32F2F',
    intro: 'A prevenção é a melhor ferramenta contra incêndios. Conheça os riscos e saiba como agir.',
    sections: [
        {
            title: 'Cozinha Segura',
            icon: 'restaurant',
            imagemUrl: 'https://images.pexels.com/photos/3722212/pexels-photo-3722212.jpeg?auto=compress&cs=tinysrgb&w=1200',
            content: 'Nunca jogue água em panelas com óleo pegando fogo. Desligue o fogo e com calma, cubra a panela com uma tampa para abafar as chamas.'
        },
        {
            title: 'Instalações Elétricas',
            icon: 'flash',
            imagemUrl: null,
            content: 'Evite o uso de muitos adaptadores ("benjamins") na mesma tomada. Fios quentes ou disjuntores desarmando indicam sobrecarga.'
        }
    ],
    checklist: [
        'Instalar detectores de fumaça',
        'Verificar validade do extintor',
        'Não deixar velas acesas sem supervisão',
        'Manter saídas livres de obstáculos'
    ]
};
