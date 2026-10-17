/**
 * politica_privacidade.js — uma política POR REGIME JURÍDICO.
 *
 * ── POR QUE NÃO É TRADUÇÃO ───────────────────────────────────────────────
 * Verter a política brasileira para inglês não produz um documento conforme
 * nos EUA, e para espanhol não produz um documento conforme na UE. Cada
 * regime exige CONTEÚDO diferente, não só idioma:
 *
 *   pt-BR → LGPD (Lei 13.709/2018). Base legal, direitos do art. 18,
 *           encarregado, reclamação à ANPD.
 *   pt-PT → RGPD, com a autoridade portuguesa (CNPD).
 *   es    → RGPD, com a autoridade espanhola (AEPD).
 *   en    → EUA. Não há lei federal geral: o que se aplica é a FTC Act §5
 *           (a promessa feita tem de ser verdadeira), a COPPA para menores de
 *           13, a My Health My Data de Washington para dado de saúde fora do
 *           HIPAA, e os direitos das leis estaduais (CCPA/CPRA e afins).
 *
 * As versões RGPD trazem itens que a brasileira não precisa ter — base legal
 * por finalidade, transferência internacional, decisão automatizada — e a
 * americana traz os que só fazem sentido lá — venda de dados, sinal de opt-out,
 * COPPA. Ver `docs/CONFORMIDADE_LEGAL.md` para as fontes de cada exigência.
 *
 * ── O QUE AQUI É FATO VERIFICADO NO CÓDIGO ───────────────────────────────
 * Tudo que estas políticas afirmam foi conferido no repositório:
 *   • nenhum SDK de anúncio ou rastreio nas 57 dependências — só @sentry/
 *     react-native (falhas) e react-native-purchases (assinatura);
 *   • armazenamento local, com as chaves sensíveis em SecureStore
 *     (utils/SecureStorage.js);
 *   • o app não exige conta nem login;
 *   • os terceiros contatados são exatamente os listados.
 *
 * ── O QUE SÓ O TITULAR DO NEGÓCIO PODE PREENCHER ─────────────────────────
 * `razaoSocial` e `representanteUE` são obrigatórios e ainda não existem.
 *
 * Eles ficam `null`, e NÃO viram texto na tela: a primeira versão deste
 * arquivo mostrava ao usuário final um marcador pedindo a razão social, o
 * que é a mesma falha que este projeto passou a sessão inteira removendo —
 * botão que não leva a lugar nenhum, card que promete o que o app não faz.
 * Usuário não é o público do nosso recado.
 *
 * Enquanto forem `null`, a frase que dependeria deles simplesmente não é
 * escrita — o documento fica mais curto, nunca quebrado. E o aviso vai para
 * quem pode agir: `npm run validate:legal` falha, e em DEV sai um warning no
 * console. É assim que isto não passa batido sem cobrar o preço do usuário.
 */

/** Identidade do controlador. Ver docs/CONFORMIDADE_LEGAL.md, itens L1 e L2. */
export const CONTROLADOR = {
    // Razão social completa + CNPJ (LGPD art. 9º, I; RGPD art. 13(1)(a)).
    razaoSocial: 'Vigilaro Care LTDA, CNPJ 65.297.217/0001-50',
    email: 'contato@vigilarocare.ia.br',
    // Representante no território da União (RGPD art. 27): obrigatório para
    // controlador fora da UE que oferece serviço a residentes da UE.
    representanteUE: null,
};

/** Campos legais obrigatórios que ainda não foram preenchidos. */
export const pendenciasDoControlador = () => {
    const faltam = [];
    if (!CONTROLADOR.razaoSocial) faltam.push('razaoSocial (LGPD art. 9º, I; RGPD art. 13(1)(a))');
    if (!CONTROLADOR.representanteUE) faltam.push('representanteUE (RGPD art. 27 — obrigatório para publicar na UE)');
    return faltam;
};

if (__DEV__ && pendenciasDoControlador().length) {
    console.warn('[legal] Política de privacidade incompleta — não publicar. Falta: ' + pendenciasDoControlador().join(' · '));
}

/** Trecho de identificação, omitido por inteiro enquanto não houver dado. */
const identifica = (rotulo) => (CONTROLADOR.razaoSocial ? `${rotulo}: ${CONTROLADOR.razaoSocial}. ` : '');
const identificaUE = (rotulo) => (CONTROLADOR.representanteUE ? `${rotulo}: ${CONTROLADOR.representanteUE}. ` : '');

const TERCEIROS_COMUNS = {
    ia: 'OpenAI (análise de texto, imagem e voz) e ElevenLabs (síntese de voz)',
    sms: 'Zenvia ou Twilio',
    bases: 'Open Food Facts, Open Beauty Facts, Open Products Facts, UPCitemdb, PubChem (NCBI) e EPA CompTox',
    erros: 'Sentry (Functional Software, Inc.)',
    assinatura: 'RevenueCat, com a App Store ou o Google Play',
};

// ═══════════════════════════════════════════════════════════════════════
// pt-BR — LGPD
// ═══════════════════════════════════════════════════════════════════════
const PT_BR = {
    titulo: 'Política de Privacidade',
    subtitulo: `Tratamento de dados conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018). ${identifica('Controlador')}Contato: ${CONTROLADOR.email}.`,
    secoes: [
        {
            titulo: '1. Compromisso com sua privacidade',
            texto: 'O Vigilaro Care trata dados pessoais e dados de saúde como informações sensíveis, na definição do art. 5º, II, da LGPD. Esta política descreve como o app acessa, armazena, usa, compartilha e exclui esses dados.',
        },
        {
            titulo: '2. O app guarda seus dados no seu aparelho',
            texto: 'Perfis, contatos de emergência, medicamentos, histórico médico, registro de atividade e estado de pânico ficam no seu dispositivo. As informações sensíveis são gravadas no armazenamento seguro do sistema operacional sempre que o aparelho oferece esse recurso. Dados operacionais não sensíveis, como preferências visuais e progresso de vistoria, ficam no armazenamento local comum do app. Não há conta, login ou servidor que guarde o seu cadastro.',
        },
        {
            titulo: '3. Dados que você informa',
            texto: 'O app pode armazenar nome, idade, foto de perfil, tipo sanguíneo, alergias, condições de saúde, medicamentos, contatos de emergência, características da residência, fotos escolhidas por você e anotações de prevenção. O app não pede CPF, RG nem criação de conta.',
        },
        {
            titulo: '4. Base legal do tratamento',
            texto: 'Os dados comuns são tratados para executar o serviço que você contratou ao instalar e usar o app (art. 7º, V). Os dados de saúde e os dados de crianças e adolescentes são sensíveis e dependem do seu consentimento específico e destacado (art. 11, I, e art. 14), que você dá ao preencher esses campos e pode retirar apagando a informação ou usando Resetar Aplicativo. Retirar o consentimento não afeta o que foi feito antes, e pode limitar funções que dependem daquele dado.',
        },
        {
            titulo: '5. Dados de crianças e adolescentes',
            texto: 'O app é feito para adultos responsáveis. Quem cadastra o perfil de uma criança é o pai, a mãe ou o responsável legal, no melhor interesse dela (art. 14 da LGPD). A criança não usa o app nem fornece dados diretamente. Esses dados não são compartilhados com terceiros para finalidade diferente da que você pediu, e nunca para publicidade.',
        },
        {
            titulo: '6. Permissões do aparelho',
            texto: 'Câmera e fotos: perfil e scanner de riscos. Microfone: recursos de voz e gravação acionada por função de emergência. Localização: SOS e recursos de segurança — inclusive identificar, no próprio aparelho, o país em que você está, para mostrar os números de emergência certos; desse uso só o país é guardado, nunca a posição. Notificações: lembretes e check-ins. Você pode negar ou revogar qualquer permissão nas configurações do sistema; as funções que dependem dela ficam limitadas.',
        },
        {
            titulo: '7. Compartilhamento com terceiros',
            texto: `Recursos opcionais de inteligência artificial enviam, através do servidor intermediário do Vigilaro, o texto ou a foto que você submeter e um contexto reduzido do lar para ${TERCEIROS_COMUNS.ia}. O módulo de cuidador remoto, quando ativado, envia o número e a mensagem que você configurar para ${TERCEIROS_COMUNS.sms}. O scanner e o Info Rótulos consultam ${TERCEIROS_COMUNS.bases}, enviando apenas o código de barras ou o nome da substância. Relatórios de falha vão para ${TERCEIROS_COMUNS.erros}. Assinaturas são validadas por ${TERCEIROS_COMUNS.assinatura}. Se você não usar IA nem o cuidador remoto, esses dados não saem do aparelho.`,
        },
        {
            titulo: '8. O que o app nunca faz',
            texto: 'O Vigilaro Care não vende seus dados, não os cede para publicidade e não embarca nenhuma biblioteca de anúncio ou de rastreamento de comportamento. Antes de enviar um relatório de falha, nomes, telefones, endereços, dados de saúde e identificadores são removidos do evento, e captura de tela está desligada.',
        },
        {
            titulo: '9. Seus direitos',
            texto: 'O art. 18 da LGPD lhe garante confirmação do tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento e revogação do consentimento. Como os dados ficam no seu aparelho, você exerce a maior parte deles direto no app: editar um perfil corrige, apagar elimina, Resetar Aplicativo elimina tudo. Para os demais pedidos, escreva para ' + CONTROLADOR.email + '. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).',
        },
        {
            titulo: '10. Retenção e exclusão',
            texto: 'Os dados permanecem no aparelho até você removê-los. Resetar Aplicativo apaga perfis, contatos, dados de saúde, consentimentos, lembretes, registros locais, vistorias e arquivos gerados pelo app, incluindo fotos e gravações, e cancela as notificações agendadas. Desinstalar o app remove os dados locais do sandbox.',
        },
        {
            titulo: '11. Limites em emergência',
            texto: 'SOS, SMS, WhatsApp, ligação, localização e check-in dependem do sistema operacional, do sinal, da bateria, das permissões e de aplicativos externos. O Vigilaro Care prepara e abre canais de contato; ele não substitui os serviços oficiais de emergência.',
        },
    ],
};

// ═══════════════════════════════════════════════════════════════════════
// pt-PT — RGPD (autoridade: CNPD)
// ═══════════════════════════════════════════════════════════════════════
const PT_PT = {
    titulo: 'Política de Privacidade',
    subtitulo: `Tratamento de dados ao abrigo do Regulamento (UE) 2016/679 (RGPD). ${identifica('Responsável pelo tratamento')}Contacto: ${CONTROLADOR.email}. ${identificaUE('Representante na União')}`.trim(),
    secoes: [
        {
            titulo: '1. Quem trata os seus dados',
            texto: `O responsável pelo tratamento tem contacto em ${CONTROLADOR.email}.${CONTROLADOR.representanteUE ? ` Por estar estabelecido fora da União Europeia e oferecer a aplicação a residentes na União, designou como representante na União, nos termos do artigo 27.º do RGPD: ${CONTROLADOR.representanteUE}.` : ''}`,
        },
        {
            titulo: '2. Os dados ficam no seu equipamento',
            texto: 'Perfis, contactos de emergência, medicamentos, historial clínico, registo de atividade e estado de pânico são guardados no seu equipamento. As categorias sensíveis são gravadas no armazenamento seguro do sistema operativo sempre que o aparelho o suporta. Não existe conta, autenticação nem servidor que guarde o seu registo — o que reduz ao mínimo o tratamento por nossa conta.',
        },
        {
            titulo: '3. Que dados são tratados',
            texto: 'Nome, idade, fotografia, grupo sanguíneo, alergias, condições de saúde, medicação, contactos de emergência, características da habitação, fotografias que escolher e notas de prevenção. Saúde é categoria especial de dados na aceção do artigo 9.º.',
        },
        {
            titulo: '4. Finalidades e fundamentos de licitude',
            texto: 'Funcionamento da aplicação e das suas funcionalidades de prevenção: execução do contrato, artigo 6.º, n.º 1, alínea b). Dados de saúde e dados relativos a menores: consentimento explícito, artigo 9.º, n.º 2, alínea a), dado ao preencher esses campos. Relatórios de falha e validação de subscrição: interesse legítimo em manter a aplicação segura e operacional, artigo 6.º, n.º 1, alínea f). Pode retirar o consentimento a qualquer momento, sem afetar a licitude do tratamento anterior; as funcionalidades que dependam desses dados deixam de funcionar.',
        },
        {
            titulo: '5. Dados de menores',
            texto: 'A aplicação destina-se a adultos responsáveis. O perfil de um menor é criado pelo titular das responsabilidades parentais, nunca pelo próprio menor, que não interage com a aplicação. O artigo 8.º do RGPD fixa em 16 anos a idade de consentimento para serviços da sociedade da informação, podendo cada Estado-Membro baixá-la até aos 13; em Portugal, o limite é 13 anos. Os dados de menores não são partilhados para finalidade diversa da solicitada nem para publicidade.',
        },
        {
            titulo: '6. Permissões do equipamento',
            texto: 'Câmara e fotografias: perfil e leitura de riscos. Microfone: funções de voz e gravação acionada por emergência. Localização: SOS e funções de segurança — incluindo identificar, no próprio aparelho, o país em que se encontra, para mostrar os números de emergência certos; deste uso só o país é guardado, nunca a posição. Notificações: lembretes e verificações de bem-estar. Pode recusar ou revogar qualquer permissão nas definições do sistema.',
        },
        {
            titulo: '7. Destinatários',
            texto: `Funcionalidades opcionais de inteligência artificial enviam, através do servidor intermédio do Vigilaro, o texto ou a imagem que submeter e um contexto reduzido da habitação para ${TERCEIROS_COMUNS.ia}. O módulo de cuidador remoto, quando ativado, envia o número e a mensagem que configurar para ${TERCEIROS_COMUNS.sms}. O leitor de códigos e o Info Rótulos consultam ${TERCEIROS_COMUNS.bases}, enviando apenas o código de barras ou o nome da substância. Relatórios de erro seguem para ${TERCEIROS_COMUNS.erros}. As subscrições são validadas por ${TERCEIROS_COMUNS.assinatura}. Estes destinatários atuam como subcontratantes.`,
        },
        {
            titulo: '8. Transferências para fora da União',
            texto: 'Os prestadores de inteligência artificial, de relatórios de erro e de validação de subscrição estão estabelecidos nos Estados Unidos. Quando usa essas funcionalidades, há transferência de dados para fora do Espaço Económico Europeu, ao abrigo do capítulo V do RGPD, com base em cláusulas contratuais-tipo aprovadas pela Comissão Europeia ou, quando aplicável, na decisão de adequação do EU-US Data Privacy Framework. Se não usar a inteligência artificial nem o cuidador remoto, não há transferência de dados de saúde.',
        },
        {
            titulo: '9. Conservação',
            texto: 'Os dados permanecem no equipamento enquanto os mantiver. A opção Repor Aplicação elimina perfis, contactos, dados de saúde, consentimentos, lembretes, registos locais, vistorias e ficheiros gerados, incluindo fotografias e gravações, e cancela as notificações agendadas. Desinstalar remove os dados locais.',
        },
        {
            titulo: '10. Os seus direitos',
            texto: `Tem direito de acesso (artigo 15.º), retificação (16.º), apagamento (17.º), limitação (18.º), portabilidade (20.º) e oposição (21.º), e a retirar o consentimento a qualquer momento. Por os dados residirem no seu equipamento, exerce a maioria destes direitos diretamente: editar corrige, apagar elimina, Repor Aplicação elimina tudo. Para os restantes pedidos escreva para ${CONTROLADOR.email}. Pode ainda apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), a autoridade de controlo portuguesa.`,
        },
        {
            titulo: '11. Decisões automatizadas',
            texto: 'As sugestões de prevenção e as respostas de inteligência artificial são informativas e não produzem decisões automatizadas com efeitos jurídicos ou que o afetem significativamente, na aceção do artigo 22.º. O conteúdo gerado por inteligência artificial é identificado como tal na própria aplicação.',
        },
        {
            titulo: '12. O que a aplicação nunca faz',
            texto: 'Não vende dados, não os cede para publicidade e não integra qualquer biblioteca de anúncios ou de rastreio comportamental. Antes do envio de um relatório de erro, nomes, telefones, moradas, dados de saúde e identificadores são removidos, e a captura de ecrã está desativada.',
        },
        {
            titulo: '13. Limites em emergência',
            texto: 'SOS, SMS, WhatsApp, chamada, localização e verificação de bem-estar dependem do sistema operativo, da rede, da bateria, das permissões e de aplicações externas. A aplicação prepara e abre canais de contacto; não substitui os serviços oficiais de emergência.',
        },
    ],
};

// ═══════════════════════════════════════════════════════════════════════
// es — RGPD (autoridad: AEPD)
// ═══════════════════════════════════════════════════════════════════════
const ES = {
    titulo: 'Política de Privacidad',
    subtitulo: `Tratamiento de datos conforme al Reglamento (UE) 2016/679 (RGPD). ${identifica('Responsable del tratamiento')}Contacto: ${CONTROLADOR.email}. ${identificaUE('Representante en la Unión')}`.trim(),
    secoes: [
        {
            titulo: '1. Quién trata sus datos',
            texto: `El responsable del tratamiento tiene contacto en ${CONTROLADOR.email}.${CONTROLADOR.representanteUE ? ` Al estar establecido fuera de la Unión Europea y ofrecer la aplicación a residentes en la Unión, ha designado como representante en la Unión, conforme al artículo 27 del RGPD: ${CONTROLADOR.representanteUE}.` : ''}`,
        },
        {
            titulo: '2. Los datos permanecen en su dispositivo',
            texto: 'Perfiles, contactos de emergencia, medicación, historial de salud, registro de actividad y estado de pánico se guardan en su dispositivo. Las categorías sensibles se almacenan en el almacenamiento seguro del sistema operativo siempre que el aparato lo permita. No hay cuenta, registro ni servidor que conserve sus datos, lo que reduce al mínimo el tratamiento por nuestra parte.',
        },
        {
            titulo: '3. Qué datos se tratan',
            texto: 'Nombre, edad, fotografía, grupo sanguíneo, alergias, condiciones de salud, medicación, contactos de emergencia, características de la vivienda, fotografías que usted elija y notas de prevención. Los datos de salud son categoría especial conforme al artículo 9.',
        },
        {
            titulo: '4. Finalidades y bases jurídicas',
            texto: 'Funcionamiento de la aplicación y de sus funciones de prevención: ejecución del contrato, artículo 6.1.b). Datos de salud y datos de menores: consentimiento explícito, artículo 9.2.a), otorgado al cumplimentar esos campos. Informes de error y validación de la suscripción: interés legítimo en mantener la aplicación segura y operativa, artículo 6.1.f). Puede retirar el consentimiento en cualquier momento, sin afectar a la licitud del tratamiento anterior; las funciones que dependan de esos datos dejarán de operar.',
        },
        {
            titulo: '5. Datos de menores',
            texto: 'La aplicación está dirigida a personas adultas responsables. El perfil de un menor lo crea quien ostenta la patria potestad o tutela, nunca el propio menor, que no interactúa con la aplicación. El artículo 8 del RGPD fija en 16 años la edad de consentimiento para servicios de la sociedad de la información y permite a cada Estado rebajarla hasta los 13; en España, la Ley Orgánica 3/2018 la fija en 14 años. Los datos de menores no se comparten para finalidad distinta de la solicitada ni con fines publicitarios.',
        },
        {
            titulo: '6. Permisos del dispositivo',
            texto: 'Cámara y fotos: perfil y escáner de riesgos. Micrófono: funciones de voz y grabación activada por emergencia. Ubicación: SOS y funciones de seguridad — incluido identificar, en el propio dispositivo, el país en el que se encuentra, para mostrar los números de emergencia correctos; de este uso solo se guarda el país, nunca la posición. Notificaciones: recordatorios y comprobaciones de bienestar. Puede denegar o revocar cualquier permiso en los ajustes del sistema.',
        },
        {
            titulo: '7. Destinatarios',
            texto: `Las funciones opcionales de inteligencia artificial envían, a través del servidor intermedio de Vigilaro, el texto o la imagen que usted remita y un contexto reducido del hogar a ${TERCEIROS_COMUNS.ia}. El módulo de cuidador remoto, cuando se activa, envía el número y el mensaje que configure a ${TERCEIROS_COMUNS.sms}. El escáner y el módulo Info Etiquetas consultan ${TERCEIROS_COMUNS.bases}, enviando únicamente el código de barras o el nombre de la sustancia. Los informes de error se envían a ${TERCEIROS_COMUNS.erros}. Las suscripciones se validan mediante ${TERCEIROS_COMUNS.assinatura}. Estos destinatarios actúan como encargados del tratamiento.`,
        },
        {
            titulo: '8. Transferencias fuera de la Unión',
            texto: 'Los proveedores de inteligencia artificial, de informes de error y de validación de suscripción están establecidos en Estados Unidos. Al usar esas funciones se produce una transferencia fuera del Espacio Económico Europeo, amparada en el capítulo V del RGPD mediante cláusulas contractuales tipo aprobadas por la Comisión Europea o, cuando resulte aplicable, la decisión de adecuación del EU-US Data Privacy Framework. Si no utiliza la inteligencia artificial ni el cuidador remoto, no se transfieren datos de salud.',
        },
        {
            titulo: '9. Conservación',
            texto: 'Los datos permanecen en el dispositivo mientras usted los mantenga. La opción Restablecer Aplicación elimina perfiles, contactos, datos de salud, consentimientos, recordatorios, registros locales, inspecciones y archivos generados, incluidas fotografías y grabaciones, y cancela las notificaciones programadas. Desinstalar la aplicación elimina los datos locales.',
        },
        {
            titulo: '10. Sus derechos',
            texto: `Tiene derecho de acceso (artículo 15), rectificación (16), supresión (17), limitación (18), portabilidad (20) y oposición (21), y a retirar el consentimiento en cualquier momento. Como los datos residen en su dispositivo, ejerce la mayoría directamente: editar rectifica, borrar suprime, Restablecer Aplicación elimina todo. Para el resto de solicitudes escriba a ${CONTROLADOR.email}. También puede reclamar ante la Agencia Española de Protección de Datos (AEPD), autoridad de control competente.`,
        },
        {
            titulo: '11. Decisiones automatizadas',
            texto: 'Las sugerencias de prevención y las respuestas de inteligencia artificial son informativas y no constituyen decisiones automatizadas con efectos jurídicos o que le afecten significativamente, conforme al artículo 22. El contenido generado por inteligencia artificial se identifica como tal dentro de la aplicación.',
        },
        {
            titulo: '12. Lo que la aplicación nunca hace',
            texto: 'No vende sus datos, no los cede con fines publicitarios y no incorpora ninguna biblioteca de anuncios ni de rastreo de comportamiento. Antes de enviar un informe de error se eliminan nombres, teléfonos, direcciones, datos de salud e identificadores, y la captura de pantalla está desactivada.',
        },
        {
            titulo: '13. Límites en emergencias',
            texto: 'SOS, SMS, WhatsApp, llamada, ubicación y comprobación de bienestar dependen del sistema operativo, la cobertura, la batería, los permisos y aplicaciones externas. La aplicación prepara y abre canales de contacto; no sustituye a los servicios oficiales de emergencia.',
        },
    ],
};

// ═══════════════════════════════════════════════════════════════════════
// en — Estados Unidos (FTC Act §5, COPPA, My Health My Data, CCPA/CPRA)
// ═══════════════════════════════════════════════════════════════════════
const EN = {
    titulo: 'Privacy Policy',
    subtitulo: `How Vigilaro Care handles your information. ${identifica('Operator')}Contact: ${CONTROLADOR.email}.`,
    secoes: [
        {
            titulo: '1. The short version',
            texto: 'Vigilaro Care keeps your information on your own phone. There is no account, no login, and no server holding your profile. We do not sell your data, we do not share it for advertising, and the app contains no advertising or behavioral tracking software of any kind. Everything below explains the exceptions to that, which happen only when you choose to use a feature that needs them.',
        },
        {
            titulo: '2. Information the app stores on your device',
            texto: 'Names, ages, profile photos, blood type, allergies, health conditions, medication, emergency contacts, details about your home, photos you choose, activity history and prevention notes. Sensitive categories are written to the operating system’s secure storage whenever your device supports it. Other operational data, such as display preferences and inspection progress, is kept in the app’s ordinary local storage.',
        },
        {
            titulo: '3. Consumer health data',
            texto: 'Some of what the app stores is consumer health data under state laws such as the Washington My Health My Data Act, and it is treated accordingly. We do not sell consumer health data, and we would not do so without the separate written authorization those laws require. You may delete this data at any time, in the app, using Reset Application; that removes it from the device, and we hold no copy on a server to remove. We do not use geofencing around health care facilities for any purpose.',
        },
        {
            titulo: '4. Children',
            texto: 'Vigilaro Care is a general audience app intended for responsible adults. It is not directed to children, and children do not use it or provide information through it. A parent or legal guardian may create a profile describing a child in their household. That information stays on the parent’s device, is never used for advertising or profiling, and is never shared for any purpose other than the one the parent asked for. If you believe a child has provided information directly, write to us and we will explain how to remove it.',
        },
        {
            titulo: '5. Device permissions',
            texto: 'Camera and photos: profiles and the hazard scanner. Microphone: voice features and recording triggered by an emergency function. Location: SOS and safety features — including working out, on the device itself, which country you are in, so the right emergency numbers are shown; for this, only the country is stored, never your position. Notifications: reminders and wellbeing check-ins. You may deny or revoke any permission in your system settings; features that depend on it will stop working.',
        },
        {
            titulo: '6. When information leaves your device',
            texto: `Optional artificial intelligence features send the text or photo you submit, plus a reduced description of your home, through Vigilaro’s intermediary server to ${TERCEIROS_COMUNS.ia}. The remote caregiver module, when you turn it on, sends the phone number and message you configure to ${TERCEIROS_COMUNS.sms}. The barcode scanner and label information module query ${TERCEIROS_COMUNS.bases}, sending only the barcode or the substance name — nothing about you or your household. Crash reports go to ${TERCEIROS_COMUNS.erros}. Subscriptions are validated by ${TERCEIROS_COMUNS.assinatura}. If you use none of those features, none of this data leaves your phone.`,
        },
        {
            titulo: '7. Crash reports and subscriptions',
            texto: 'Before a crash report is sent, names stored in the app, phone numbers, addresses, health information and user identifiers are stripped from the event; screenshots and view hierarchy capture are turned off. What remains is technical: device model, operating system version, app version and the place in the code where the error happened. For subscriptions, payment is handled by the App Store or Google Play. We never receive or store card details. RevenueCat receives an anonymous installation identifier and the purchase history needed to validate your access.',
        },
        {
            titulo: '8. We do not sell or share your data',
            texto: 'We do not sell your personal information, and we do not share it for cross-context behavioral advertising, as those terms are used in the California Consumer Privacy Act and comparable state laws. Because we do not, there is nothing to opt out of; the app honors no advertising identifiers because it collects none.',
        },
        {
            titulo: '9. Your rights',
            texto: `Depending on where you live, you may have the right to know what personal information is collected, to access it, to correct it, to delete it, to obtain a copy, and not to be discriminated against for exercising those rights. Because your information is stored on your own device, you exercise most of these directly and immediately: editing a profile corrects it, deleting removes it, and Reset Application erases everything the app holds. For any other request, or to ask how this policy applies to you, write to ${CONTROLADOR.email}. We will not charge you or reduce the app’s functionality for making a request.`,
        },
        {
            titulo: '10. Retention and deletion',
            texto: 'Information stays on your device until you remove it. Reset Application erases profiles, contacts, health data, consents, reminders, local logs, inspections and files the app generated, including photos and recordings, and cancels scheduled notifications. Uninstalling the app removes the local data in the app sandbox.',
        },
        {
            titulo: '11. Emergency features have limits',
            texto: 'SOS, SMS, WhatsApp, calling, location and check-in depend on your operating system, signal, battery, permissions and third-party apps. Vigilaro Care helps you prepare and open a channel of contact. It is not a substitute for official emergency services, and it does not summon them on your behalf.',
        },
        {
            titulo: '12. Changes to this policy',
            texto: 'If we change how the app handles your information, we will update this page and the date shown with it. Material changes will be presented in the app before they take effect.',
        },
    ],
};

const POR_IDIOMA = { 'pt-BR': PT_BR, 'pt-PT': PT_PT, es: ES, en: EN };

/**
 * Política do idioma ativo. Cai no pt-BR, que é o regime da sede.
 * Recebe o código de idioma do i18n (ex.: 'pt-PT', 'en-US', 'es').
 */
export function getPoliticaPrivacidade(idioma) {
    if (!idioma) return PT_BR;
    if (POR_IDIOMA[idioma]) return POR_IDIOMA[idioma];
    const base = String(idioma).split('-')[0].toLowerCase();
    if (base === 'es') return ES;
    if (base === 'en') return EN;
    return PT_BR;
}

export default POR_IDIOMA;
