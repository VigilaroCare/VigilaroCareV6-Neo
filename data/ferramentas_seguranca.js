/**
 * ferramentas_seguranca.js
 * Dados sobre segurança com Ferramentas
 * Vigilaro Care V5
 *
 * Lido pela FerramentasTrabalhoScreen com t_deep(): cada campo tem _en, _es e
 * _ptpt. Até 22/10/2026 só existia em português (a tela saía em português em
 * qualquer idioma). Na revisão AV saíram a marca comercial ("Serra Mármore
 * (Makita)") e as contagens "10 itens", que não batiam com as listas.
 */


export const FERRAMENTAS_DATA = {
    goldenRules: [
        {
            id: 1,
            title: 'Organização e Inspeção', title_en: 'Organization and Inspection', title_es: 'Orden e Inspección',
            text: 'Mantenha a caixa organizada. Descarte ferramentas danificadas ou com cabos soltos.',
            text_en: 'Keep the toolbox tidy. Throw away damaged tools or ones with loose handles.',
            text_es: 'Mantenga la caja ordenada. Deseche las herramientas dañadas o con mangos sueltos.',
            text_ptpt: 'Mantenha a caixa arrumada. Deite fora ferramentas danificadas ou com cabos soltos.',
        },
        {
            id: 2,
            title: 'EPIs', title_en: 'PPE', title_es: 'EPI', title_ptpt: 'EPI',
            text: 'Sempre utilize os EPIs adequados (óculos, luvas, protetores auriculares). Eles são a principal linha de defesa.',
            text_en: 'Always use the right PPE (goggles, gloves, hearing protection). It is your main line of defense.',
            text_es: 'Utilice siempre los EPI adecuados (gafas, guantes, protectores auditivos). Son la principal línea de defensa.',
            text_ptpt: 'Utilize sempre o EPI adequado (óculos, luvas, protetores auriculares). É a principal linha de defesa.',
        },
        {
            id: 3,
            title: 'Desconexão', title_en: 'Unplug', title_es: 'Desconexión',
            text: 'Sempre desligar da TOMADA (não apenas o botão) após uso e antes de trocar acessórios.',
            text_en: 'Always UNPLUG (not just switch off) after use and before changing accessories.',
            text_es: 'Desenchufe siempre de la TOMA (no solo el interruptor) después de usar y antes de cambiar accesorios.',
            text_ptpt: 'Desligue sempre da TOMADA (não apenas no botão) depois de usar e antes de trocar acessórios.',
        },
        {
            id: 4,
            title: 'Guarda Segura', title_en: 'Safe Storage', title_es: 'Almacenamiento Seguro',
            text: 'Armazene em local seco, trancado e longe de crianças.',
            text_en: 'Store in a dry, locked place away from children.',
            text_es: 'Guárdelas en un lugar seco, bajo llave y lejos de los niños.',
            text_ptpt: 'Guarde num local seco, fechado à chave e longe das crianças.',
        },
        {
            id: 5,
            title: 'Não Improvise', title_en: 'Don\'t Improvise', title_es: 'No Improvise',
            text: 'Use a ferramenta correta para a função correta. Improviso é um ato inseguro.',
            text_en: 'Use the right tool for the job. Improvising is an unsafe act.',
            text_es: 'Use la herramienta correcta para cada tarea. Improvisar es un acto inseguro.',
        },
        {
            id: 6,
            title: 'Proteções de Fábrica', title_en: 'Factory Guards', title_es: 'Protecciones de Fábrica',
            text: 'Nunca retire as capas de proteção originais de serras ou lixadeiras.',
            text_en: 'Never remove the original guards from saws or sanders.',
            text_es: 'Nunca retire las protecciones originales de sierras o lijadoras.',
            text_ptpt: 'Nunca retire as proteções originais de serras ou lixadoras.',
        },
    ],
    categories: [
        {
            id: 'manuais',
            title: 'Ferramentas Manuais', title_en: 'Hand Tools', title_es: 'Herramientas Manuales',
            subtitle: 'Itens essenciais', subtitle_en: 'The essentials', subtitle_es: 'Lo esencial',
            image: null,
            imagemUrl: require('../assets/illustrations/pad/ferramentas-bricolagem_ferramentas-domesticas_006.jpg'),
            color: '#FFA000',
            icon: 'Setting2',
            items: [
                {
                    name: 'Estilete / Faca Utilitária', risk: 'Cortes profundos.', epi: 'Luvas resistentes, Óculos.', care: 'Corte na direção oposta ao corpo. Retraia a lâmina após uso.',
                    name_en: 'Utility Knife', risk_en: 'Deep cuts.', epi_en: 'Sturdy gloves, goggles.', care_en: 'Cut away from your body. Retract the blade after use.',
                    name_es: 'Cúter / Cuchillo multiusos', risk_es: 'Cortes profundos.', epi_es: 'Guantes resistentes, gafas.', care_es: 'Corte en dirección contraria al cuerpo. Retraiga la hoja después de usarlo.',
                    name_ptpt: 'X-ato / Faca Utilitária', risk_ptpt: 'Cortes profundos.', epi_ptpt: 'Luvas resistentes, óculos.', care_ptpt: 'Corte na direção oposta ao corpo. Recolha a lâmina depois de usar.',
                },
                {
                    name: 'Serrote / Serra Manual', risk: 'Cortes e lacerações.', epi: 'Luvas, Óculos.', care: 'Prenda a peça firmemente. Mantenha o olhar na linha de corte.',
                    name_en: 'Handsaw', risk_en: 'Cuts and lacerations.', epi_en: 'Gloves, goggles.', care_en: 'Clamp the workpiece firmly. Keep your eyes on the cutting line.',
                    name_es: 'Serrucho / Sierra Manual', risk_es: 'Cortes y laceraciones.', epi_es: 'Guantes, gafas.', care_es: 'Sujete bien la pieza. Mantenga la vista en la línea de corte.',
                    name_ptpt: 'Serrote', risk_ptpt: 'Cortes e lacerações.', epi_ptpt: 'Luvas, óculos.', care_ptpt: 'Prenda bem a peça. Mantenha o olhar na linha de corte.',
                },
                {
                    name: 'Formão', risk: 'Cortes e perfurações.', epi: 'Óculos.', care: 'Corte longe do corpo. Use martelo de madeira/borracha.',
                    name_en: 'Chisel', risk_en: 'Cuts and puncture wounds.', epi_en: 'Goggles.', care_en: 'Cut away from your body. Use a wooden or rubber mallet.',
                    name_es: 'Formón', risk_es: 'Cortes y perforaciones.', epi_es: 'Gafas.', care_es: 'Corte lejos del cuerpo. Use un mazo de madera o goma.',
                    name_ptpt: 'Formão', risk_ptpt: 'Cortes e perfurações.', epi_ptpt: 'Óculos.', care_ptpt: 'Corte longe do corpo. Use um maço de madeira ou borracha.',
                },
                {
                    name: 'Martelo', risk: 'Pancadas, fragmentos nos olhos.', epi: 'Óculos.', care: 'Verificar se o cabo está firme antes de cada uso.',
                    name_en: 'Hammer', risk_en: 'Blows, fragments in the eyes.', epi_en: 'Goggles.', care_en: 'Check the handle is secure before each use.',
                    name_es: 'Martillo', risk_es: 'Golpes, fragmentos en los ojos.', epi_es: 'Gafas.', care_es: 'Compruebe que el mango esté firme antes de cada uso.',
                    name_ptpt: 'Martelo', risk_ptpt: 'Pancadas, fragmentos nos olhos.', epi_ptpt: 'Óculos.', care_ptpt: 'Verifique se o cabo está firme antes de cada utilização.',
                },
                {
                    name: 'Alicate', risk: 'Cortes, projeção de arame.', epi: 'Óculos (essencial).', care: 'Nunca usar como martelo.',
                    name_en: 'Pliers', risk_en: 'Cuts, flying wire ends.', epi_en: 'Goggles (essential).', care_en: 'Never use them as a hammer.',
                    name_es: 'Alicates', risk_es: 'Cortes, proyección de alambre.', epi_es: 'Gafas (imprescindibles).', care_es: 'Nunca los use como martillo.',
                    name_ptpt: 'Alicate', risk_ptpt: 'Cortes, projeção de arame.', epi_ptpt: 'Óculos (essencial).', care_ptpt: 'Nunca use como martelo.',
                },
                {
                    name: 'Chave de Fenda / Phillips', risk: 'Perfuração da mão.', epi: 'Óculos.', care: 'Usar o tamanho correto para o parafuso. Não improvisar.',
                    name_en: 'Screwdriver (flat / Phillips)', risk_en: 'Puncture wounds to the hand.', epi_en: 'Goggles.', care_en: 'Use the right size for the screw. Don\'t improvise.',
                    name_es: 'Destornillador (plano / Phillips)', risk_es: 'Perforación de la mano.', epi_es: 'Gafas.', care_es: 'Use el tamaño correcto para el tornillo. No improvise.',
                    name_ptpt: 'Chave de Fendas / Philips', risk_ptpt: 'Perfuração da mão.', epi_ptpt: 'Óculos.', care_ptpt: 'Use o tamanho certo para o parafuso. Não improvise.',
                },
                {
                    name: 'Chave Inglesa', risk: 'Lesões por escorregamento.', epi: 'Luvas.', care: 'Ajuste firmemente. Puxe a chave em sua direção.',
                    name_en: 'Adjustable Wrench', risk_en: 'Injuries if it slips.', epi_en: 'Gloves.', care_en: 'Adjust it tightly. Pull the wrench towards you.',
                    name_es: 'Llave Inglesa', risk_es: 'Lesiones por deslizamiento.', epi_es: 'Guantes.', care_es: 'Ajústela firmemente. Tire de la llave hacia usted.',
                    name_ptpt: 'Chave Inglesa', risk_ptpt: 'Lesões por escorregamento.', epi_ptpt: 'Luvas.', care_ptpt: 'Ajuste bem. Puxe a chave na sua direção.',
                },
                {
                    name: 'Machadinha', risk: 'Cortes graves.', epi: 'Óculos, Luvas, Botas.', care: 'Mantenha afiada e com capa. Cuidado com a área de balanço.',
                    name_en: 'Hatchet', risk_en: 'Serious cuts.', epi_en: 'Goggles, gloves, boots.', care_en: 'Keep it sharp and sheathed. Watch the swing area.',
                    name_es: 'Hacha de mano', risk_es: 'Cortes graves.', epi_es: 'Gafas, guantes, botas.', care_es: 'Manténgala afilada y con funda. Cuidado con la zona de balanceo.',
                    name_ptpt: 'Machadinha', risk_ptpt: 'Cortes graves.', epi_ptpt: 'Óculos, luvas, botas.', care_ptpt: 'Mantenha afiada e com capa. Cuidado com a zona de balanço.',
                },
                {
                    name: 'Arco de Serra', risk: 'Cortes, quebra da lâmina.', epi: 'Óculos, Luvas.', care: 'Tensione corretamente a lâmina.',
                    name_en: 'Hacksaw', risk_en: 'Cuts, blade breakage.', epi_en: 'Goggles, gloves.', care_en: 'Tension the blade correctly.',
                    name_es: 'Arco de Sierra', risk_es: 'Cortes, rotura de la hoja.', epi_es: 'Gafas, guantes.', care_es: 'Tense correctamente la hoja.',
                    name_ptpt: 'Serrote de Arco', risk_ptpt: 'Cortes, quebra da lâmina.', epi_ptpt: 'Óculos, luvas.', care_ptpt: 'Tensione corretamente a lâmina.',
                },
                {
                    name: 'Raspador / Espátula', risk: 'Cortes e perfurações.', epi: 'Luvas resistentes.', care: 'Mantenha as mãos atrás da linha de corte.',
                    name_en: 'Scraper / Putty Knife', risk_en: 'Cuts and puncture wounds.', epi_en: 'Sturdy gloves.', care_en: 'Keep your hands behind the cutting edge.',
                    name_es: 'Rasqueta / Espátula', risk_es: 'Cortes y perforaciones.', epi_es: 'Guantes resistentes.', care_es: 'Mantenga las manos detrás de la línea de corte.',
                },
                {
                    name: 'Trena', risk: 'Cortes.', epi: 'Óculos.', care: 'Cuidado ao recolher (mola forte pode cortar).',
                    name_en: 'Tape Measure', risk_en: 'Cuts.', epi_en: 'Goggles.', care_en: 'Take care when it retracts (the strong spring can cut).',
                    name_es: 'Cinta Métrica', risk_es: 'Cortes.', epi_es: 'Gafas.', care_es: 'Cuidado al recogerla (el muelle fuerte puede cortar).',
                    name_ptpt: 'Fita Métrica', risk_ptpt: 'Cortes.', epi_ptpt: 'Óculos.', care_ptpt: 'Cuidado ao recolher (a mola forte pode cortar).',
                },
            ]
        },
        {
            id: 'eletricas',
            title: 'Ferramentas Elétricas', title_en: 'Power Tools', title_es: 'Herramientas Eléctricas',
            subtitle: 'Itens de atenção', subtitle_en: 'Use with care', subtitle_es: 'Requieren atención',
            image: null,
            imagemUrl: require('../assets/illustrations/pad/ferramentas-bricolagem_teal-and-black-bosch-cordless-hand-drill_015.jpg'),
            color: '#D32F2F',
            icon: 'Flash',
            items: [
                {
                    name: 'Furadeira / Parafusadeira', risk: 'Perfuração, choque, ruído.', epi: 'Óculos de proteção, sempre.', care: 'Verifique se há canos ou fios na parede antes de furar. Segure firme.',
                    name_en: 'Drill / Driver', risk_en: 'Puncture wounds, electric shock, noise.', epi_en: 'Safety goggles — always.', care_en: 'Check the wall for pipes and wires before drilling. Hold it firmly.',
                    name_es: 'Taladro / Atornillador', risk_es: 'Perforación, descarga eléctrica, ruido.', epi_es: 'Gafas de protección, siempre.', care_es: 'Compruebe si hay tuberías o cables en la pared antes de taladrar. Sujételo con firmeza.',
                    name_ptpt: 'Berbequim / Aparafusadora', risk_ptpt: 'Perfuração, choque, ruído.', epi_ptpt: 'Óculos de proteção, sempre.', care_ptpt: 'Verifique se há canos ou fios na parede antes de furar. Segure com firmeza.',
                },
                {
                    name: 'Serra Tico-Tico', risk: 'Cortes, projeção de cavacos.', epi: 'EPI completo (óculos, luvas, protetor auricular).', care: 'Prenda a peça. Espere a lâmina parar antes de pousar.',
                    name_en: 'Jigsaw', risk_en: 'Cuts, flying chips.', epi_en: 'Full PPE (goggles, gloves, hearing protection).', care_en: 'Clamp the workpiece. Wait for the blade to stop before putting it down.',
                    name_es: 'Sierra de Calar', risk_es: 'Cortes, proyección de virutas.', epi_es: 'EPI completo (gafas, guantes, protector auditivo).', care_es: 'Sujete la pieza. Espere a que la hoja se detenga antes de soltarla.',
                    name_ptpt: 'Serra Tico-Tico', risk_ptpt: 'Cortes, projeção de aparas.', epi_ptpt: 'EPI completo (óculos, luvas, protetor auricular).', care_ptpt: 'Prenda a peça. Espere que a lâmina pare antes de a pousar.',
                },
                {
                    name: 'Lixadeira Orbital', risk: 'Vibração, poeira, ruído.', epi: 'Máscara, Óculos, Protetor Auricular.', care: 'Use saco coletor. Limpe o pó acumulado.',
                    name_en: 'Orbital Sander', risk_en: 'Vibration, dust, noise.', epi_en: 'Mask, goggles, hearing protection.', care_en: 'Use the dust bag. Clean up built-up dust.',
                    name_es: 'Lijadora Orbital', risk_es: 'Vibración, polvo, ruido.', epi_es: 'Mascarilla, gafas, protector auditivo.', care_es: 'Use la bolsa colectora. Limpie el polvo acumulado.',
                    name_ptpt: 'Lixadora Orbital', risk_ptpt: 'Vibração, pó, ruído.', epi_ptpt: 'Máscara, óculos, protetor auricular.', care_ptpt: 'Use o saco coletor. Limpe o pó acumulado.',
                },
                {
                    name: 'Esmerilhadeira', risk: 'Quebra do disco, queimaduras.', epi: 'Óculos, Protetor Facial, Luvas Couro.', care: 'Disco deve estar em bom estado, sem trincas.',
                    name_en: 'Angle Grinder', risk_en: 'Disc breakage, burns.', epi_en: 'Goggles, face shield, leather gloves.', care_en: 'The disc must be in good condition, with no cracks.',
                    name_es: 'Amoladora', risk_es: 'Rotura del disco, quemaduras.', epi_es: 'Gafas, pantalla facial, guantes de cuero.', care_es: 'El disco debe estar en buen estado, sin grietas.',
                    name_ptpt: 'Rebarbadora', risk_ptpt: 'Quebra do disco, queimaduras.', epi_ptpt: 'Óculos, viseira, luvas de couro.', care_ptpt: 'O disco deve estar em bom estado, sem fissuras.',
                },
                {
                    name: 'Serra Circular', risk: 'Amputação, cortes, ruído.', epi: 'EPI completo (óculos, luvas, protetor auricular).', care: 'Nunca trave a guarda de segurança. Verifique cabos.',
                    name_en: 'Circular Saw', risk_en: 'Amputation, cuts, noise.', epi_en: 'Full PPE (goggles, gloves, hearing protection).', care_en: 'Never lock back the blade guard. Check the cord.',
                    name_es: 'Sierra Circular', risk_es: 'Amputación, cortes, ruido.', epi_es: 'EPI completo (gafas, guantes, protector auditivo).', care_es: 'Nunca bloquee la protección. Revise los cables.',
                    name_ptpt: 'Serra Circular', risk_ptpt: 'Amputação, cortes, ruído.', epi_ptpt: 'EPI completo (óculos, luvas, protetor auricular).', care_ptpt: 'Nunca bloqueie a proteção. Verifique os cabos.',
                },
                {
                    name: 'Tupia Manual', risk: 'Cortes graves.', epi: 'Óculos, Protetor Auricular.', care: 'Prenda a peça firmemente. Remova a fresa após uso.',
                    name_en: 'Router', risk_en: 'Serious cuts.', epi_en: 'Goggles, hearing protection.', care_en: 'Clamp the workpiece firmly. Remove the bit after use.',
                    name_es: 'Fresadora', risk_es: 'Cortes graves.', epi_es: 'Gafas, protector auditivo.', care_es: 'Sujete bien la pieza. Retire la fresa después de usarla.',
                    name_ptpt: 'Tupia Manual', risk_ptpt: 'Cortes graves.', epi_ptpt: 'Óculos, protetor auricular.', care_ptpt: 'Prenda bem a peça. Retire a fresa depois de usar.',
                },
                {
                    name: 'Pistola de Cola Quente', risk: 'Queimaduras.', epi: 'Luvas.', care: 'Não toque no bico. Espere esfriar para guardar.',
                    name_en: 'Hot Glue Gun', risk_en: 'Burns.', epi_en: 'Gloves.', care_en: 'Don\'t touch the nozzle. Let it cool before putting it away.',
                    name_es: 'Pistola de Silicona Caliente', risk_es: 'Quemaduras.', epi_es: 'Guantes.', care_es: 'No toque la boquilla. Espere a que se enfríe para guardarla.',
                    name_ptpt: 'Pistola de Cola Quente', risk_ptpt: 'Queimaduras.', epi_ptpt: 'Luvas.', care_ptpt: 'Não toque no bico. Espere que arrefeça antes de guardar.',
                },
                {
                    name: 'Soprador Térmico', risk: 'Queimaduras, incêndio.', epi: 'Luvas térmicas, Óculos.', care: 'Longe de inflamáveis. Deixe esfriar antes de guardar.',
                    name_en: 'Heat Gun', risk_en: 'Burns, fire.', epi_en: 'Heat-resistant gloves, goggles.', care_en: 'Keep away from flammables. Let it cool before putting it away.',
                    name_es: 'Decapador Térmico', risk_es: 'Quemaduras, incendio.', epi_es: 'Guantes térmicos, gafas.', care_es: 'Lejos de inflamables. Deje que se enfríe antes de guardarlo.',
                    name_ptpt: 'Soprador de Ar Quente', risk_ptpt: 'Queimaduras, incêndio.', epi_ptpt: 'Luvas térmicas, óculos.', care_ptpt: 'Longe de inflamáveis. Deixe arrefecer antes de guardar.',
                },
                {
                    name: 'Plaina Elétrica', risk: 'Cortes graves.', epi: 'Óculos, Protetor Auricular.', care: 'Mãos longe da área de corte. Proteja as lâminas.',
                    name_en: 'Power Planer', risk_en: 'Serious cuts.', epi_en: 'Goggles, hearing protection.', care_en: 'Keep hands away from the cutting area. Cover the blades.',
                    name_es: 'Cepillo Eléctrico', risk_es: 'Cortes graves.', epi_es: 'Gafas, protector auditivo.', care_es: 'Manos lejos de la zona de corte. Proteja las cuchillas.',
                    name_ptpt: 'Plaina Elétrica', risk_ptpt: 'Cortes graves.', epi_ptpt: 'Óculos, protetor auricular.', care_ptpt: 'Mãos longe da zona de corte. Proteja as lâminas.',
                },
                {
                    name: 'Serra Mármore', risk: 'Cortes profundos, poeira.', epi: 'Máscara PFF2, Óculos, Protetor Auricular.', care: 'Use com água. Nunca use disco de madeira.',
                    name_en: 'Tile / Masonry Saw', risk_en: 'Deep cuts, dust.', epi_en: 'FFP2/N95 mask, goggles, hearing protection.', care_en: 'Use it wet. Never fit a wood-cutting blade.',
                    name_es: 'Cortadora de Mármol / Azulejo', risk_es: 'Cortes profundos, polvo.', epi_es: 'Mascarilla FFP2, gafas, protector auditivo.', care_es: 'Úsela con agua. Nunca monte un disco para madera.',
                    name_ptpt: 'Serra de Mármore', risk_ptpt: 'Cortes profundos, pó.', epi_ptpt: 'Máscara FFP2, óculos, protetor auricular.', care_ptpt: 'Use com água. Nunca use disco de madeira.',
                },
            ]
        },
        {
            id: 'motorizadas',
            title: 'Motorizadas & Pesadas', title_en: 'Motorized & Heavy-Duty', title_es: 'Motorizadas y Pesadas',
            subtitle: 'Itens de alto risco', subtitle_en: 'High-risk tools', subtitle_es: 'Alto riesgo',
            image: null, // Reusing power tools image for now
            imagemUrl: 'https://images.pexels.com/photos/4206054/pexels-photo-4206054.jpeg?auto=compress&cs=tinysrgb&w=1200',
            color: '#455A64',
            icon: 'Setting4',
            items: [
                {
                    name: 'Roçadeira', risk: 'Projeção de pedras, ruído.', epi: 'Óculos, Protetor Facial, Botas, Calça, Protetor Auricular.', care: 'Inspecione a área. Mantenha distância de pessoas.',
                    name_en: 'Brush Cutter / String Trimmer', risk_en: 'Flying stones, noise.', epi_en: 'Goggles, face shield, boots, long trousers, hearing protection.', care_en: 'Check the area first. Keep people at a distance.',
                    name_es: 'Desbrozadora', risk_es: 'Proyección de piedras, ruido.', epi_es: 'Gafas, pantalla facial, botas, pantalón largo, protector auditivo.', care_es: 'Inspeccione la zona. Mantenga a las personas a distancia.',
                    name_ptpt: 'Roçadora', risk_ptpt: 'Projeção de pedras, ruído.', epi_ptpt: 'Óculos, viseira, botas, calças, protetor auricular.', care_ptpt: 'Inspecione a zona. Mantenha as pessoas à distância.',
                },
                {
                    name: 'Motosserra', risk: 'Risco EXTREMO de amputação.', epi: 'Capacete, Luvas, Calça Anticorte, Protetor Auricular.', care: 'Duas mãos firmes. Nunca corte acima do ombro.',
                    name_en: 'Chainsaw', risk_en: 'EXTREME risk of amputation.', epi_en: 'Helmet, gloves, cut-resistant trousers, hearing protection.', care_en: 'Both hands, firm grip. Never cut above shoulder height.',
                    name_es: 'Motosierra', risk_es: 'Riesgo EXTREMO de amputación.', epi_es: 'Casco, guantes, pantalón anticorte, protector auditivo.', care_es: 'Las dos manos firmes. Nunca corte por encima del hombro.',
                    name_ptpt: 'Motosserra', risk_ptpt: 'Risco EXTREMO de amputação.', epi_ptpt: 'Capacete, luvas, calças anticorte, protetor auricular.', care_ptpt: 'As duas mãos firmes. Nunca corte acima do ombro.',
                },
                {
                    name: 'Lavadora Alta Pressão', risk: 'Injeção de água, choque.', epi: 'Óculos, Botas de Borracha.', care: 'Nunca aponte para pessoas. Use tomada com DR.',
                    name_en: 'Pressure Washer', risk_en: 'Water-injection injuries, electric shock.', epi_en: 'Goggles, rubber boots.', care_en: 'Never point it at people. Use a socket protected by an RCD.',
                    name_es: 'Hidrolimpiadora', risk_es: 'Inyección de agua, descarga eléctrica.', epi_es: 'Gafas, botas de goma.', care_es: 'Nunca apunte a personas. Use una toma con interruptor diferencial.',
                    name_ptpt: 'Máquina de Lavar de Alta Pressão', risk_ptpt: 'Injeção de água, choque.', epi_ptpt: 'Óculos, botas de borracha.', care_ptpt: 'Nunca aponte para pessoas. Use tomada protegida por diferencial.',
                },
                {
                    name: 'Furadeira de Bancada', risk: 'Aprisionamento (roupas/cabelo).', epi: 'Óculos, Protetor Auricular.', care: 'NÃO use luvas. Prenda a peça firmemente.',
                    name_en: 'Drill Press', risk_en: 'Entanglement (clothing/hair).', epi_en: 'Goggles, hearing protection.', care_en: 'Do NOT wear gloves. Clamp the workpiece firmly.',
                    name_es: 'Taladro de Columna', risk_es: 'Atrapamiento (ropa/pelo).', epi_es: 'Gafas, protector auditivo.', care_es: 'NO use guantes. Sujete bien la pieza.',
                    name_ptpt: 'Engenho de Furar', risk_ptpt: 'Aprisionamento (roupa/cabelo).', epi_ptpt: 'Óculos, protetor auricular.', care_ptpt: 'NÃO use luvas. Prenda bem a peça.',
                },
                {
                    name: 'Compressor de Ar', risk: 'Explosão, pressão, ruído.', epi: 'Protetor Auricular, Óculos.', care: 'Drene a umidade regularmente. Nunca aponte para o corpo.',
                    name_en: 'Air Compressor', risk_en: 'Bursting, pressure, noise.', epi_en: 'Hearing protection, goggles.', care_en: 'Drain the moisture regularly. Never point the air at anyone\'s body.',
                    name_es: 'Compresor de Aire', risk_es: 'Explosión, presión, ruido.', epi_es: 'Protector auditivo, gafas.', care_es: 'Purgue la humedad con regularidad. Nunca apunte al cuerpo.',
                    name_ptpt: 'Compressor de Ar', risk_ptpt: 'Explosão, pressão, ruído.', epi_ptpt: 'Protetor auricular, óculos.', care_ptpt: 'Purgue a humidade regularmente. Nunca aponte para o corpo.',
                },
                {
                    name: 'Serra de Mesa', risk: 'Risco EXTREMO de amputação.', epi: 'Óculos, Protetor Auricular.', care: 'Use um empurrador ("push stick") para peças pequenas. Mantenha a proteção.',
                    name_en: 'Table Saw', risk_en: 'EXTREME risk of amputation.', epi_en: 'Goggles, hearing protection.', care_en: 'Use a push stick for small pieces. Keep the guard on.',
                    name_es: 'Sierra de Mesa', risk_es: 'Riesgo EXTREMO de amputación.', epi_es: 'Gafas, protector auditivo.', care_es: 'Use un empujador para piezas pequeñas. Mantenga la protección.',
                    name_ptpt: 'Serra de Mesa', risk_ptpt: 'Risco EXTREMO de amputação.', epi_ptpt: 'Óculos, protetor auricular.', care_ptpt: 'Use um empurrador para peças pequenas. Mantenha a proteção.',
                },
                {
                    name: 'Cortador de Grama', risk: 'Cortes, projeção.', epi: 'Óculos, Botas.', care: 'Inspecione a área. Desligue e espere a lâmina parar antes de limpar.',
                    name_en: 'Lawn Mower', risk_en: 'Cuts, flying debris.', epi_en: 'Goggles, boots.', care_en: 'Check the area first. Switch off and wait for the blade to stop before cleaning.',
                    name_es: 'Cortacésped', risk_es: 'Cortes, proyección de objetos.', epi_es: 'Gafas, botas.', care_es: 'Inspeccione la zona. Apáguelo y espere a que la cuchilla se detenga antes de limpiarlo.',
                    name_ptpt: 'Corta-Relva', risk_ptpt: 'Cortes, projeção.', epi_ptpt: 'Óculos, botas.', care_ptpt: 'Inspecione a zona. Desligue e espere que a lâmina pare antes de limpar.',
                },
                {
                    name: 'Serra de Esquadria', risk: 'Cortes e amputação.', epi: 'Óculos, Protetor Auricular.', care: 'Prenda a peça. Mãos longe da linha de corte.',
                    name_en: 'Miter Saw', risk_en: 'Cuts and amputation.', epi_en: 'Goggles, hearing protection.', care_en: 'Clamp the workpiece. Keep hands away from the cutting line.',
                    name_es: 'Ingletadora', risk_es: 'Cortes y amputación.', epi_es: 'Gafas, protector auditivo.', care_es: 'Sujete la pieza. Manos lejos de la línea de corte.',
                    name_ptpt: 'Serra de Esquadria', risk_ptpt: 'Cortes e amputação.', epi_ptpt: 'Óculos, protetor auricular.', care_ptpt: 'Prenda a peça. Mãos longe da linha de corte.',
                },
                {
                    name: 'Gerador Portátil', risk: 'Intoxicação (CO), choque.', epi: 'Luvas, Protetor Auricular.', care: 'NUNCA use em local fechado. Apenas ao ar livre, longe de janelas.',
                    name_en: 'Portable Generator', risk_en: 'Carbon monoxide (CO) poisoning, electric shock.', epi_en: 'Gloves, hearing protection.', care_en: 'NEVER use it indoors. Outdoors only, away from windows.',
                    name_es: 'Generador Portátil', risk_es: 'Intoxicación por CO, descarga eléctrica.', epi_es: 'Guantes, protector auditivo.', care_es: 'NUNCA lo use en un lugar cerrado. Solo al aire libre, lejos de ventanas.',
                    name_ptpt: 'Gerador Portátil', risk_ptpt: 'Intoxicação (CO), choque.', epi_ptpt: 'Luvas, protetor auricular.', care_ptpt: 'NUNCA use em local fechado. Apenas ao ar livre, longe de janelas.',
                },
                {
                    name: 'Bomba Submersa', risk: 'Choque elétrico.', epi: 'Luvas/Botas de Borracha.', care: 'Verifique cabos. Use disjuntor DR.',
                    name_en: 'Submersible Pump', risk_en: 'Electric shock.', epi_en: 'Rubber gloves/boots.', care_en: 'Check the cables. Use an RCD-protected circuit.',
                    name_es: 'Bomba Sumergible', risk_es: 'Descarga eléctrica.', epi_es: 'Guantes/botas de goma.', care_es: 'Revise los cables. Use un interruptor diferencial.',
                    name_ptpt: 'Bomba Submersível', risk_ptpt: 'Choque elétrico.', epi_ptpt: 'Luvas/botas de borracha.', care_ptpt: 'Verifique os cabos. Use disjuntor diferencial.',
                },
            ]
        }
    ]
};
