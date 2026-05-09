import React from 'react';
import { View, Image } from 'react-native';

// Mapeamento de ícones PNG
const iconPaths = {
  // Actions
  'adicionar': require('../assets/icons/actions/adicionar.png'),
  'alerta': require('../assets/icons/actions/alerta.png'),
  'avancar': require('../assets/icons/actions/avancar.png'),
  'buscar': require('../assets/icons/actions/buscar.png'),
  'check': require('../assets/icons/actions/check.png'),
  'compartilhar': require('../assets/icons/actions/compartilhar.png'),
  'configuracoes': require('../assets/icons/actions/configuracoes.png'),
  'editar': require('../assets/icons/actions/editar.png'),
  'excluir': require('../assets/icons/actions/excluir.png'),
  'fechar': require('../assets/icons/actions/fechar.png'),
  'filtro': require('../assets/icons/actions/filtro.png'),
  'info': require('../assets/icons/actions/info.png'),
  'notificacao': require('../assets/icons/actions/notificacao.png'),
  'salvar': require('../assets/icons/actions/salvar.png'),
  'voltar': require('../assets/icons/actions/voltar.png'),
  
  // Checklists
  'area-lazer': require('../assets/icons/checklists/area-lazer.png'),
  'area-tecnica': require('../assets/icons/checklists/area-tecnica.png'),
  'banheiro': require('../assets/icons/checklists/banheiro.png'),
  'caixa-dagua': require('../assets/icons/checklists/caixa-dagua.png'),
  'corredores': require('../assets/icons/checklists/corredores.png'),
  'cozinha': require('../assets/icons/checklists/cozinha.png'),
  'deposito': require('../assets/icons/checklists/deposito.png'),
  'garagem': require('../assets/icons/checklists/garagem.png'),
  'jardim': require('../assets/icons/checklists/jardim.png'),
  'lavanderia': require('../assets/icons/checklists/lavanderia.png'),
  'oficina': require('../assets/icons/checklists/oficina.png'),
  'paineis-eletricos': require('../assets/icons/checklists/paineis-eletricos.png'),
  'piscina': require('../assets/icons/checklists/piscina.png'),
  'quarto-bebe': require('../assets/icons/checklists/quarto-bebe.png'),
  'quarto-geral': require('../assets/icons/checklists/quarto-geral.png'),
  'quarto-idoso': require('../assets/icons/checklists/quarto-idoso.png'),
  'quarto-pcd': require('../assets/icons/checklists/quarto-pcd.png'),
  'sala': require('../assets/icons/checklists/sala.png'),
  'varanda': require('../assets/icons/checklists/varanda.png'),
  
  // Education
  'animais-peconhentos': require('../assets/icons/education/animais-peconhentos.png'),
  'educacao-seguranca': require('../assets/icons/education/educacao-seguranca.png'),
  'itens-protecao': require('../assets/icons/education/itens-protecao.png'),
  'plantas-toxicas': require('../assets/icons/education/plantas-toxicas.png'),
  'primeiros-socorros': require('../assets/icons/education/primeiros-socorros.png'),
  'produtos-perigosos': require('../assets/icons/education/produtos-perigosos.png'),
  'riscos-fisicos': require('../assets/icons/education/riscos-fisicos.png'),
  'seguranca-idade': require('../assets/icons/education/seguranca-idade.png'),
  
  // Emergencia
  'ambulancia': require('../assets/icons/emergencia/ambulancia.png'),
  'bombeiro': require('../assets/icons/emergencia/bombeiro.png'),
  'hospital': require('../assets/icons/emergencia/hospital.png'),
  'kit-primeiros-socorros': require('../assets/icons/emergencia/kit-primeiros-socorros.png'),
  'policia': require('../assets/icons/emergencia/policia.png'),
  'telefone-emergencia': require('../assets/icons/emergencia/telefone-emergencia.png'),
  
  // Navigation
  'checklists': require('../assets/icons/navigation/checklists.png'),
  'educacao': require('../assets/icons/navigation/educacao.png'),
  'emergencia': require('../assets/icons/navigation/emergencia.png'),
  'home': require('../assets/icons/navigation/home.png'),
  'perfil': require('../assets/icons/navigation/perfil.png'),
  
  // Perfil
  'adolescente': require('../assets/icons/perfil/adolescente.png'),
  'adulto': require('../assets/icons/perfil/adulto.png'),
  'bebe': require('../assets/icons/perfil/bebe.png'),
  'crianca': require('../assets/icons/perfil/crianca.png'),
  'idoso': require('../assets/icons/perfil/idoso.png'),
  'pcd': require('../assets/icons/perfil/pcd.png'),
  'pet': require('../assets/icons/perfil/pet.png'),
  
  // Status
  'aviso': require('../assets/icons/status/aviso.png'),
  'carregando': require('../assets/icons/status/carregando.png'),
  'dados-moveis': require('../assets/icons/status/dados-moveis.png'),
  'erro': require('../assets/icons/status/erro.png'),
  'offline': require('../assets/icons/status/offline.png'),
  'online': require('../assets/icons/status/online.png'),
  'sucesso': require('../assets/icons/status/sucesso.png'),
  'wifi-off': require('../assets/icons/status/wifi-off.png'),
  'wifi-on': require('../assets/icons/status/wifi-on.png'),
};

export default function CustomIcon({ name, size = 24, color, style }) {
  const iconSource = iconPaths[name];
  
  if (!iconSource) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }
  
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Image 
        source={iconSource}
        style={{ 
          width: size, 
          height: size,
                 }}
        resizeMode="contain"
      />
    </View>
  );
}

export const availableIcons = Object.keys(iconPaths);
