import { isAreaRelevant } from './utils/ProfileFilterEngine.js';
import { AMBIENTES } from './data/mapeamento_dados.js';

const mapping = ['area_servico'];
const areaServico = AMBIENTES.find(a => a.id === 'area_servico');

console.log("Area found:", !!areaServico);
if (areaServico) {
    const isRelevant = isAreaRelevant(areaServico, {}, [], mapping);
    console.log("Is Relevant?", isRelevant);
}
