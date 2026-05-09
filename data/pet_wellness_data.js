/**
 * pet_wellness_data.js
 * Dados para o Hub de Bem-Estar Pet (Vigilaro Care V6 Neo)
 * Foco: Cuidados preventivos, rotina e enriquecimento ambiental.
 */

export const PET_WELLNESS_DATA = {
    categorias: [
        {
            id: 'hidratacao',
            titulo: 'Hidratação Vital', titulo_en: 'Vital Hydration', titulo_es: 'Hidratación Vital',
            icone: 'water-outline',
            cor: '#03A9F4',
            dicas: [
                {
                    pet: 'Cães e Gatos', pet_en: 'Dogs and Cats', pet_es: 'Perros y Gatos',
                    texto: 'Troque a água pelo menos 2 vezes ao dia. Gatos preferem água corrente (fontes) para evitar problemas renais.',
                    texto_en: 'Change the water at least twice a day. Cats prefer running water (fountains) to avoid kidney problems.',
                    texto_es: 'Cambie el agua al menos 2 veces al día. Los gatos prefieren agua corriente (fuentes) para evitar problemas renales.'
                },
                {
                    pet: 'Aves', pet_en: 'Birds', pet_es: 'Aves',
                    texto: 'Mantenha bebedouros limpos. No calor, ofereça banheiras rasas para as aves se refrescarem.',
                    texto_en: 'Keep water dispensers clean. In the heat, offer shallow baths for birds to cool off.',
                    texto_es: 'Mantenga limpios los bebederos. En el calor, ofrezca bañeras poco profundas para que las aves se refresquen.'
                }
            ]
        },
        {
            id: 'enriquecimento',
            titulo: 'Enriquecimento Ambiental', titulo_en: 'Environmental Enrichment', titulo_es: 'Enriquecimiento Ambiental',
            icone: 'extension-puzzle-outline',
            cor: '#4CAF50',
            dicas: [
                {
                    pet: 'Cães', pet_en: 'Dogs', pet_es: 'Perros',
                    texto: 'Use brinquedos recheáveis com comida para estimular o instinto de busca e reduzir ansiedade.',
                    texto_en: 'Use food-stuffed toys to stimulate their hunting instinct and reduce anxiety.',
                    texto_es: 'Use juguetes rellenables con comida para estimular el instinto de búsqueda y reducir la ansiedad.'
                },
                {
                    pet: 'Gatos', pet_en: 'Cats', pet_es: 'Gatos',
                    texto: 'Verticalização: Prateleiras e nichos altos aumentam a sensação de segurança e território.',
                    texto_en: 'Verticalization: High shelves and niches increase their sense of security and territory.',
                    texto_es: 'Verticalización: Estantes y nichos altos aumentan la sensación de seguridad y territorio.'
                },
                {
                    pet: 'Aves', pet_en: 'Birds', pet_es: 'Aves',
                    texto: 'Rodízio de brinquedos: Troque os objetos da gaiola toda semana para evitar o tédio e a autoflagelação.',
                    texto_en: 'Toy rotation: Change cage items every week to avoid boredom and self-mutilation.',
                    texto_es: 'Rotación de juguetes: Cambie los objetos de la jaula cada semana para evitar el aburrimiento y la automutilación.'
                }
            ]
        },
        {
            id: 'exercicio',
            titulo: 'Passeio e Exercício', titulo_en: 'Walks and Exercise', titulo_es: 'Paseo y Ejercicio',
            icone: 'walk-outline',
            cor: '#FF9800',
            dicas: [
                {
                    pet: 'Cães', pet_en: 'Dogs', pet_es: 'Perros',
                    texto: 'Evite passeios entre 10h e 16h devido ao calor do asfalto (pode queimar as patas).',
                    texto_en: 'Avoid walks between 10 AM and 4 PM due to hot asphalt (can burn their paws).',
                    texto_es: 'Evite paseos entre las 10 a.m. y las 4 p.m. debido al calor del asfalto (puede quemar sus patas).'
                },
                {
                    pet: 'Pequenos Mamíferos', pet_en: 'Small Mammals', pet_es: 'Pequeños Mamíferos',
                    texto: 'Mantenha-os ativos com túneis e rodas de exercícios apropriadas para o tamanho da espécie.',
                    texto_en: 'Keep them active with tunnels and exercise wheels appropriate for their species\' size.',
                    texto_es: 'Manténgalos activos con túneles y ruedas de ejercicio apropiadas para el tamaño de la especie.'
                }
            ]
        },
        {
            id: 'higiene',
            titulo: 'Higiene e Saúde', titulo_en: 'Hygiene and Health', titulo_es: 'Higiene y Salud',
            icone: 'medical-outline',
            cor: '#E91E63',
            dicas: [
                {
                    pet: 'Cães e Gatos', pet_en: 'Dogs and Cats', pet_es: 'Perros y Gatos',
                    texto: 'Escovação dental semanal reduz riscos de doenças cardíacas causadas por bactérias bucais.',
                    texto_en: 'Weekly dental brushing reduces the risk of heart diseases caused by oral bacteria.',
                    texto_es: 'El cepillado dental semanal reduce el riesgo de enfermedades cardíacas causadas por bacterias bucales.'
                },
                {
                    pet: 'Aves', pet_en: 'Birds', pet_es: 'Aves',
                    texto: 'Inspecione as fezes diariamente; mudanças de cor ou consistência são sinais precoces de doenças.',
                    texto_en: 'Inspect droppings daily; changes in color or consistency are early signs of disease.',
                    texto_es: 'Inspeccione las heces a diario; los cambios de color o consistencia son signos tempranos de enfermedad.'
                }
            ]
        }
    ]
};
