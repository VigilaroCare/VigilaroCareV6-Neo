/**
 * ConsentimentoIAService — permissão explícita antes de enviar dados pessoais
 * a um serviço de inteligência artificial de terceiro (17/10/2026).
 *
 * Por que existe:
 *   • Apple App Review 5.1.2(i), em vigor desde 13/11/2025: o app precisa
 *     informar com clareza quando dados pessoais vão para IA de terceiro e
 *     obter permissão EXPLÍCITA antes. Menção na política não basta.
 *   • LGPD art. 33, VIII: a transferência para os EUA (OpenAI) se apoia no
 *     consentimento específico e destacado para a transferência.
 *
 * Antes, o relatório com IA era gerado SOZINHO ao abrir o resumo de riscos do
 * perfil — e enviava condições de saúde e nomes de medicamentos à OpenAI sem
 * nenhuma pergunta naquele momento. Desde 17/10/2026 NENHUM dado de saúde vai
 * para a IA (decisão do autor: o app informa, não opina): vão a foto do
 * Scanner, a faixa etária, a casa e o resultado da vistoria.
 *
 * A trava é CENTRAL: OpenAIService e VisionService chamam `exigir()` antes de
 * enviar. Nenhuma tela consegue contornar. As telas usam `pedir()` para
 * perguntar no momento certo (quando a pessoa toca para gerar/analisar).
 * Revogável em Privacidade → Suas escolhas.
 *
 * Mudou o que é enviado? Suba VERSAO: o consentimento antigo deixa de valer e
 * a pessoa é perguntada de novo, com o texto novo.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import i18n from '../i18n';
import NeoAlert from '../utils/NeoAlert';

const CHAVE = '@vigilaro_consentimento_ia';
export const VERSAO_CONSENTIMENTO_IA = 1;
export const EVENTO_CONSENTIMENTO_IA = 'consentimento_ia_mudou';

export class SemConsentimentoIA extends Error {
    constructor() {
        super('SEM_CONSENTIMENTO_IA');
        this.name = 'SemConsentimentoIA';
    }
}

const tx = (k, padrao) => i18n.t(`consentimentoIA.${k}`, { defaultValue: padrao });

async function ler() {
    try {
        const v = JSON.parse((await AsyncStorage.getItem(CHAVE)) || 'null');
        return v && v.versao === VERSAO_CONSENTIMENTO_IA ? v : null;
    } catch (_) {
        return null;
    }
}

const ConsentimentoIAService = {
    /** true só com permissão dada na versão atual do texto. */
    async temConsentimento() {
        return (await ler())?.aceito === true;
    },

    /** 'aceito' | 'recusado' | null (nunca perguntado nesta versão). */
    async situacao() {
        const v = await ler();
        return v ? (v.aceito ? 'aceito' : 'recusado') : null;
    },

    async definir(aceito) {
        await AsyncStorage.setItem(CHAVE, JSON.stringify({ versao: VERSAO_CONSENTIMENTO_IA, aceito: !!aceito, em: new Date().toISOString() }));
        DeviceEventEmitter.emit(EVENTO_CONSENTIMENTO_IA);
    },

    /** Trava dos serviços: lança SemConsentimentoIA se não houver permissão. */
    async exigir() {
        if (!(await this.temConsentimento())) throw new SemConsentimentoIA();
    },

    /**
     * Pergunta (se ainda não houver permissão) e resolve true/false.
     * Chamar só por ação da pessoa — nunca ao abrir uma tela.
     */
    async pedir() {
        if (await this.temConsentimento()) return true;
        return new Promise((resolve) => {
            NeoAlert.alert(
                tx('titulo', 'Análise com inteligência artificial'),
                tx('texto', 'Para gerar esta análise, o Vigilaro envia à OpenAI (Estados Unidos), pelo servidor do Vigilaro:\n\n• a foto que você escolher, quando usar o Scanner;\n• a faixa etária do perfil, o tipo de casa, os ambientes, a cidade e o resultado da vistoria.\n\nNenhum nome e nenhum dado de saúde (condições, medicamentos, alergias) é enviado. A OpenAI não usa esses dados para treinar modelos e os guarda por até 30 dias apenas para prevenir abuso. Você pode retirar esta permissão a qualquer momento em Privacidade → Suas escolhas. Sem ela, o resto do app funciona normalmente.'),
                [
                    { text: tx('agoraNao', 'Agora não'), style: 'cancel', onPress: async () => { await this.definir(false); resolve(false); } },
                    { text: tx('permitir', 'Permitir'), onPress: async () => { await this.definir(true); resolve(true); } },
                ],
                { cancelable: false },
            );
        });
    },
};

export default ConsentimentoIAService;
