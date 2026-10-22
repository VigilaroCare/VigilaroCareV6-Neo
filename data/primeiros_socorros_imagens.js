/**
 * primeiros_socorros_imagens.js
 *
 * Mapping id -> imagem (require local) ou imagemUrl (string Pexels).
 * Centralizado aqui para nao duplicar nos 4 arquivos de locale.
 * withImages() em primeiros_socorros.js detecta o tipo:
 *   - number  → campo `imagem`  (require() local, offline)
 *   - string  → campo `imagemUrl` (URL remota)
 *
 * Vigilaro Care V6 Neo | Acervo: Agnaldo Fontinele
 */

export const PRIMEIROS_SOCORROS_IMAGENS = {
    // ============ HUMANOS ============
    ps_1:  require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'), // Queimaduras — chama em fogao
    ps_2:  null,                                                        // Engasgo — foto do autor (acervo Drive)
    ps_3:  require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Engasgo bebe — bebe sendo cuidado
    ps_4:  require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Cortes — bandagem mao
    ps_5:  require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'), // Choque eletrico — cabos
    ps_6:  'https://images.pexels.com/photos/3873149/pexels-photo-3873149.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Intoxicacao — cartelas medicamentos
    ps_7:  null,                                                          // Quedas — foto do autor (acervo Drive)
    ps_8:  require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Traumatismo craniano — mulher c/ bandagem na cabeca
    ps_9:  require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Intoxicacao alimentar — dor de barriga
    ps_10: 'https://images.pexels.com/photos/7723629/pexels-photo-7723629.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Corpos estranhos — gaze first aid
    ps_11: null,                                               // Mordidas — foto do autor (acervo Drive)
    ps_12: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Mal subito — paciente em leito
    ps_13: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Desmaio — mulher em leito iluminado
    ps_14: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Convulsao — paciente recebendo IV
    ps_15: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'), // AVC — mao com soro
    ps_16: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Parada cardiaca — desfibrilador
    ps_17: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Afogamento
    ps_18: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Vomito e aspiracao
    ps_19: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Incendio e fumaca

    // ============ PETS ============
    engasgo_pet:        require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Veterinario c/ estetoscopio
    atropelamento_pet:  require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Pomeranian na mesa de exame
    rcp_pet:            require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Vet examina cao
    calor_pet:          'https://images.pexels.com/photos/36760220/pexels-photo-36760220.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cao ofegante ao sol
    convulsao_pet:      require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Cuidados pos-convulsao
    sangramento_pet:    require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'), // Cao c/ colar pos-cirurgia
    picada_peconhentos: require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Cascavel
    plantas_toxicas_pet:require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'), // Beagle curioso c/ planta
    quimicos_pet:       require('../assets/illustrations/pad/engasgo-afogamento_engasgar-o-que-fazer-3_018.jpg'),  // Produtos de limpeza
};

export default PRIMEIROS_SOCORROS_IMAGENS;
