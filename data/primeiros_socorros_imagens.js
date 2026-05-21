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
    ps_1:  'https://images.pexels.com/photos/27404939/pexels-photo-27404939.jpeg?auto=compress&cs=tinysrgb&w=1200', // Queimaduras — chama em fogao
    ps_2:  require('../assets/images/prevencao/engasgo.jpg'),                                                        // Engasgo — foto do autor (acervo Drive)
    ps_3:  'https://images.pexels.com/photos/5272653/pexels-photo-5272653.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Engasgo bebe — bebe sendo cuidado
    ps_4:  'https://images.pexels.com/photos/6519905/pexels-photo-6519905.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Cortes — bandagem mao
    ps_5:  'https://images.pexels.com/photos/11837458/pexels-photo-11837458.jpeg?auto=compress&cs=tinysrgb&w=1200', // Choque eletrico — cabos
    ps_6:  'https://images.pexels.com/photos/3873149/pexels-photo-3873149.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Intoxicacao — cartelas medicamentos
    ps_7:  require('../assets/images/prevencao/queda.jpg'),                                                          // Quedas — foto do autor (acervo Drive)
    ps_8:  'https://images.pexels.com/photos/5207242/pexels-photo-5207242.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Traumatismo craniano — mulher c/ bandagem na cabeca
    ps_9:  'https://images.pexels.com/photos/5938362/pexels-photo-5938362.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Intoxicacao alimentar — dor de barriga
    ps_10: 'https://images.pexels.com/photos/7723629/pexels-photo-7723629.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Corpos estranhos — gaze first aid
    ps_11: require('../assets/images/prevencao/mordida-cachorro.jpg'),                                               // Mordidas — foto do autor (acervo Drive)
    ps_12: 'https://images.pexels.com/photos/6129152/pexels-photo-6129152.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Mal subito — paciente em leito
    ps_13: 'https://images.pexels.com/photos/3769151/pexels-photo-3769151.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Desmaio — mulher em leito iluminado
    ps_14: 'https://images.pexels.com/photos/6129211/pexels-photo-6129211.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Convulsao — paciente recebendo IV
    ps_15: 'https://images.pexels.com/photos/20897576/pexels-photo-20897576.jpeg?auto=compress&cs=tinysrgb&w=1200', // AVC — mao com soro
    ps_16: 'https://images.pexels.com/photos/8943274/pexels-photo-8943274.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Parada cardiaca — desfibrilador

    // ============ PETS ============
    engasgo_pet:        'https://images.pexels.com/photos/6235650/pexels-photo-6235650.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Veterinario c/ estetoscopio
    atropelamento_pet:  'https://images.pexels.com/photos/6234608/pexels-photo-6234608.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Pomeranian na mesa de exame
    rcp_pet:            'https://images.pexels.com/photos/6235017/pexels-photo-6235017.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Vet examina cao
    calor_pet:          'https://images.pexels.com/photos/36760220/pexels-photo-36760220.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cao ofegante ao sol
    convulsao_pet:      'https://images.pexels.com/photos/6234612/pexels-photo-6234612.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Vets examinando cao
    sangramento_pet:    'https://images.pexels.com/photos/36653927/pexels-photo-36653927.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cao c/ colar pos-cirurgia
    picada_peconhentos: 'https://images.pexels.com/photos/6443133/pexels-photo-6443133.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Cascavel
    plantas_toxicas_pet:'https://images.pexels.com/photos/11496984/pexels-photo-11496984.jpeg?auto=compress&cs=tinysrgb&w=1200', // Beagle curioso c/ planta
    quimicos_pet:       'https://images.pexels.com/photos/3177257/pexels-photo-3177257.jpeg?auto=compress&cs=tinysrgb&w=1200',  // Produtos de limpeza
};

export default PRIMEIROS_SOCORROS_IMAGENS;
