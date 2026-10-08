/**
 * instituicoesPorPais.js
 *
 * Orgaos, selos e normas tecnicas por pais (ISO 3166-1 alpha-2), no idioma do
 * utilizador.
 *
 * ================================================================
 * POR QUE ESTE FICHEIRO EXISTE
 * ================================================================
 * Decisao de produto do Agnaldo em 08/10/2026, nas palavras dele: "nunca sera
 * apenas uma questao de traducao pois nao faz sentido (...) proceda com todas
 * as adequacoes que se fizerem necessarias para que cada usuario veja aquilo
 * que lhe diz respeito".
 *
 * O caso que abriu a discussao: a ficha do extintor em condominio mandava
 * conferir "a data de validade no selo do INMETRO". Traduzida ao pe da letra,
 * manda um utilizador em Lisboa procurar um selo brasileiro que nao existe
 * ali. Nao e erro de traducao — e conteudo certo para o pais errado, o mesmo
 * defeito do numero de emergencia brasileiro em texto traduzido.
 *
 * A varredura encontrou 184 referencias desse tipo no conteudo: 39 dentro de
 * strings traduzidas (erro para quem le) e 145 em prosa pt-BR (certas no
 * Brasil, nao acompanham o pais).
 *
 * ================================================================
 * REGRA DE CONFIANCA (herdada de data/emergencyNumbersByCountry.js)
 * ================================================================
 * So entra orgao ou norma de existencia publica, estavel e verificavel. Pais
 * sem entrada cai no DEFAULT, que usa uma formulacao GENERICA — "certificacao
 * de seguranca reconhecida" — e nunca um orgao de outro pais. Uma frase
 * generica e correta serve o utilizador; um selo que nao existe no pais dele
 * manda procurar o que nao ha, e e pior que nao dizer nada.
 *
 * Por isso cada entrada abaixo nomeia a fonte. Ampliar com a mesma cautela.
 */

/**
 * Selo/marca de conformidade que o utilizador deve procurar no produto.
 * Usado por {{CERT_SEAL}}.
 */
export const SELO_CERTIFICACAO = {
    // Brasil — certificacao compulsoria do Inmetro para brinquedos, EPI,
    // escadas, extintores e afins. Fonte: gov.br/inmetro
    BR: {
        pt: 'o selo do INMETRO',
        ptPT: 'o selo do INMETRO',
        en: 'the INMETRO certification seal',
        es: 'el sello del INMETRO',
    },
    // UE — marcacao CE, obrigatoria para brinquedos (Diretiva 2009/48/CE),
    // EPI (Regulamento 2016/425) e material eletrico.
    PT: {
        pt: 'a marcação CE',
        ptPT: 'a marcação CE',
        en: 'the CE marking',
        es: 'el marcado CE',
    },
    ES: {
        pt: 'a marcação CE',
        ptPT: 'a marcação CE',
        en: 'the CE marking',
        es: 'el marcado CE',
    },
    // EUA — a marca de laboratorio reconhecido (UL, ETL) e o indicador
    // pratico que o consumidor ve no produto; a CPSC regula mas nao sela.
    US: {
        pt: 'a marca de um laboratório certificador (UL, ETL)',
        ptPT: 'a marca de um laboratório certificador (UL, ETL)',
        en: 'a recognised testing lab mark (UL, ETL)',
        es: 'la marca de un laboratorio certificador (UL, ETL)',
    },
    // Reino Unido — UKCA substituiu a CE para o mercado britanico.
    GB: {
        pt: 'a marcação UKCA',
        ptPT: 'a marcação UKCA',
        en: 'the UKCA marking',
        es: 'el marcado UKCA',
    },
    DEFAULT: {
        pt: 'uma certificação de segurança reconhecida',
        ptPT: 'uma certificação de segurança reconhecida',
        en: 'a recognised safety certification',
        es: 'una certificación de seguridad reconocida',
    },
};

/**
 * Organismo de normas tecnicas. Usado por {{STANDARDS_BODY}}.
 */
export const ORGAO_DE_NORMAS = {
    // Brasil — ABNT, com as normas NBR. Fonte: abnt.org.br
    BR: {
        pt: 'a norma técnica da ABNT',
        ptPT: 'a norma técnica da ABNT',
        en: 'the ABNT technical standard',
        es: 'la norma técnica de ABNT',
    },
    // UE — normas harmonizadas EN, adotadas pelo CEN.
    PT: {
        pt: 'a norma europeia EN',
        ptPT: 'a norma europeia EN',
        en: 'the European EN standard',
        es: 'la norma europea EN',
    },
    ES: {
        pt: 'a norma europeia EN',
        ptPT: 'a norma europeia EN',
        en: 'the European EN standard',
        es: 'la norma europea EN',
    },
    // EUA — ASTM e ANSI sao os organismos de referencia em seguranca
    // de produto de consumo.
    US: {
        pt: 'a norma ASTM/ANSI',
        ptPT: 'a norma ASTM/ANSI',
        en: 'the ASTM/ANSI standard',
        es: 'la norma ASTM/ANSI',
    },
    GB: {
        pt: 'a norma britânica BS EN',
        ptPT: 'a norma britânica BS EN',
        en: 'the British BS EN standard',
        es: 'la norma británica BS EN',
    },
    DEFAULT: {
        pt: 'a norma técnica aplicável',
        ptPT: 'a norma técnica aplicável',
        en: 'the applicable technical standard',
        es: 'la norma técnica aplicable',
    },
};

/**
 * Sociedade/academia de pediatria de referencia. Usado por {{PEDIATRIC_BODY}}.
 * Importa porque o app cita recomendacao pediatrica (andadores, cadeirinha,
 * sono seguro) e a autoridade que o leitor reconhece muda com o pais.
 */
export const ORGAO_PEDIATRIA = {
    BR: {
        pt: 'a Sociedade Brasileira de Pediatria',
        ptPT: 'a Sociedade Brasileira de Pediatria',
        en: 'the Brazilian Society of Paediatrics',
        es: 'la Sociedad Brasileña de Pediatría',
    },
    PT: {
        pt: 'a Sociedade Portuguesa de Pediatria',
        ptPT: 'a Sociedade Portuguesa de Pediatria',
        en: 'the Portuguese Society of Paediatrics',
        es: 'la Sociedad Portuguesa de Pediatría',
    },
    ES: {
        pt: 'a Associação Espanhola de Pediatria',
        ptPT: 'a Associação Espanhola de Pediatria',
        en: 'the Spanish Association of Paediatrics',
        es: 'la Asociación Española de Pediatría',
    },
    US: {
        pt: 'a Academia Americana de Pediatria',
        ptPT: 'a Academia Americana de Pediatria',
        en: 'the American Academy of Pediatrics',
        es: 'la Academia Americana de Pediatría',
    },
    GB: {
        pt: 'o Royal College of Paediatrics and Child Health',
        ptPT: 'o Royal College of Paediatrics and Child Health',
        en: 'the Royal College of Paediatrics and Child Health',
        es: 'el Royal College of Paediatrics and Child Health',
    },
    DEFAULT: {
        pt: 'as entidades de pediatria',
        ptPT: 'as entidades de pediatria',
        en: 'paediatric health authorities',
        es: 'las entidades de pediatría',
    },
};

/**
 * Autoridade sanitaria / reguladora de medicamentos e produtos de saude.
 * Usado por {{HEALTH_AUTHORITY}}.
 */
export const AUTORIDADE_SANITARIA = {
    BR: {
        pt: 'a ANVISA',
        ptPT: 'a ANVISA',
        en: 'ANVISA (the Brazilian health regulator)',
        es: 'ANVISA (la agencia sanitaria brasileña)',
    },
    PT: {
        pt: 'o INFARMED',
        ptPT: 'o INFARMED',
        en: 'INFARMED (the Portuguese health regulator)',
        es: 'INFARMED (la agencia sanitaria portuguesa)',
    },
    ES: {
        pt: 'a AEMPS',
        ptPT: 'a AEMPS',
        en: 'AEMPS (the Spanish health regulator)',
        es: 'la AEMPS',
    },
    US: {
        pt: 'a FDA',
        ptPT: 'a FDA',
        en: 'the FDA',
        es: 'la FDA',
    },
    GB: {
        pt: 'a MHRA',
        ptPT: 'a MHRA',
        en: 'the MHRA',
        es: 'la MHRA',
    },
    DEFAULT: {
        pt: 'a autoridade sanitária do seu país',
        ptPT: 'a autoridade de saúde do seu país',
        en: 'your country\'s health authority',
        es: 'la autoridad sanitaria de su país',
    },
};

/**
 * Autoridade de transito. Usado por {{TRAFFIC_AUTHORITY}} — o app cita regra
 * de cadeirinha, que e lei em todo lugar mas com fonte e detalhe diferentes.
 */
export const AUTORIDADE_TRANSITO = {
    BR: {
        pt: 'o Código de Trânsito Brasileiro',
        ptPT: 'o Código de Trânsito Brasileiro',
        en: 'the Brazilian Traffic Code',
        es: 'el Código de Tránsito Brasileño',
    },
    PT: {
        pt: 'o Código da Estrada',
        ptPT: 'o Código da Estrada',
        en: 'the Portuguese Highway Code',
        es: 'el Código de Carretera portugués',
    },
    ES: {
        pt: 'o Regulamento Geral de Circulação',
        ptPT: 'o Regulamento Geral de Circulação',
        en: 'the Spanish traffic regulations',
        es: 'el Reglamento General de Circulación',
    },
    US: {
        pt: 'a lei de trânsito do seu estado',
        ptPT: 'a lei de trânsito do seu estado',
        en: 'your state\'s traffic law',
        es: 'la ley de tránsito de su estado',
    },
    GB: {
        pt: 'o Highway Code',
        ptPT: 'o Highway Code',
        en: 'the Highway Code',
        es: 'el Highway Code',
    },
    DEFAULT: {
        pt: 'a legislação de trânsito local',
        ptPT: 'a legislação de trânsito local',
        en: 'local traffic law',
        es: 'la legislación de tráfico local',
    },
};

/** Devolve a entrada do pais, ou o DEFAULT. Nunca devolve vazio. */
export function getInstituicao(tabela, countryCode, langKey) {
    const pais = countryCode ? String(countryCode).toUpperCase() : null;
    const entrada = (pais && tabela[pais]) || tabela.DEFAULT;
    return entrada[langKey] || tabela.DEFAULT[langKey] || tabela.DEFAULT.pt;
}
