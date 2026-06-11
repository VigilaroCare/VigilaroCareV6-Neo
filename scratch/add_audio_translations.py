# -*- coding: utf-8 -*-
# Adiciona as chaves audioMonitor.* e audioConsent.* nos 4 locales.
import json, io

KEYS = {
    'pt-BR': {
        'audioMonitor.statusIdle': 'Seguro',
        'audioMonitor.statusInactive': 'Inativo',
        'audioMonitor.statusListening': 'Ouvindo...',
        'audioMonitor.statusNoise': 'BARULHO DETECTADO!',
        'audioMonitor.statusCritical': 'CRÍTICO (Gritos/Quebra)',
        'audioMonitor.statusWarning': 'Alerta (Conversa Alta)',
        'audioMonitor.statusSafe': 'Ambiente Seguro',
        'audioMonitor.permTitle': 'Permissão Necessária',
        'audioMonitor.permMsg': 'Precisamos acessar o microfone para ouvir o ambiente.',
        'audioMonitor.noiseLevel': 'Nível de Ruído: {{pct}}%',
        'audioMonitor.tapToStart': 'Toque para ativar a escuta de segurança',
        'audioMonitor.btnStop': 'DESATIVAR ESCUTA',
        'audioMonitor.btnStart': 'ATIVAR MONITOR',
        'audioConsent.title': 'Monitoramento de Áudio Ambiente',
        'audioConsent.body': 'Esta função escuta o ambiente para detectar eventos como choro, quedas ou ruídos altos.',
        'audioConsent.bodyStrong': 'O áudio não é gravado nem transmitido — é processado localmente, em tempo real, apenas enquanto a tela está aberta.',
        'audioConsent.accept': 'Entendi e aceito',
        'audioConsent.acceptA11y': 'Entendi e aceito o monitoramento de áudio',
        'audioConsent.decline': 'Agora não',
        'audioConsent.declineA11y': 'Não usar a função de monitoramento de áudio',
    },
    'en': {
        'audioMonitor.statusIdle': 'Safe',
        'audioMonitor.statusInactive': 'Inactive',
        'audioMonitor.statusListening': 'Listening...',
        'audioMonitor.statusNoise': 'NOISE DETECTED!',
        'audioMonitor.statusCritical': 'CRITICAL (Screams/Breaking)',
        'audioMonitor.statusWarning': 'Warning (Loud Talking)',
        'audioMonitor.statusSafe': 'Environment Safe',
        'audioMonitor.permTitle': 'Permission Required',
        'audioMonitor.permMsg': 'We need microphone access to listen to the environment.',
        'audioMonitor.noiseLevel': 'Noise Level: {{pct}}%',
        'audioMonitor.tapToStart': 'Tap to start the safety listening',
        'audioMonitor.btnStop': 'STOP LISTENING',
        'audioMonitor.btnStart': 'START MONITOR',
        'audioConsent.title': 'Ambient Audio Monitoring',
        'audioConsent.body': 'This feature listens to the environment to detect events like crying, falls or loud noises.',
        'audioConsent.bodyStrong': 'Audio is never recorded or transmitted — it is processed locally, in real time, only while this screen is open.',
        'audioConsent.accept': 'I understand and accept',
        'audioConsent.acceptA11y': 'I understand and accept the audio monitoring',
        'audioConsent.decline': 'Not now',
        'audioConsent.declineA11y': 'Do not use the audio monitoring feature',
    },
    'es': {
        'audioMonitor.statusIdle': 'Seguro',
        'audioMonitor.statusInactive': 'Inactivo',
        'audioMonitor.statusListening': 'Escuchando...',
        'audioMonitor.statusNoise': '¡RUIDO DETECTADO!',
        'audioMonitor.statusCritical': 'CRÍTICO (Gritos/Rotura)',
        'audioMonitor.statusWarning': 'Alerta (Conversación alta)',
        'audioMonitor.statusSafe': 'Ambiente seguro',
        'audioMonitor.permTitle': 'Permiso necesario',
        'audioMonitor.permMsg': 'Necesitamos acceder al micrófono para escuchar el ambiente.',
        'audioMonitor.noiseLevel': 'Nivel de ruido: {{pct}}%',
        'audioMonitor.tapToStart': 'Toca para activar la escucha de seguridad',
        'audioMonitor.btnStop': 'DESACTIVAR ESCUCHA',
        'audioMonitor.btnStart': 'ACTIVAR MONITOR',
        'audioConsent.title': 'Monitoreo de audio ambiente',
        'audioConsent.body': 'Esta función escucha el ambiente para detectar eventos como llanto, caídas o ruidos fuertes.',
        'audioConsent.bodyStrong': 'El audio no se graba ni se transmite — se procesa localmente, en tiempo real, solo mientras esta pantalla está abierta.',
        'audioConsent.accept': 'Entiendo y acepto',
        'audioConsent.acceptA11y': 'Entiendo y acepto el monitoreo de audio',
        'audioConsent.decline': 'Ahora no',
        'audioConsent.declineA11y': 'No usar la función de monitoreo de audio',
    },
    'pt-PT': {
        'audioMonitor.statusIdle': 'Seguro',
        'audioMonitor.statusInactive': 'Inativo',
        'audioMonitor.statusListening': 'A ouvir...',
        'audioMonitor.statusNoise': 'RUÍDO DETETADO!',
        'audioMonitor.statusCritical': 'CRÍTICO (Gritos/Quebra)',
        'audioMonitor.statusWarning': 'Alerta (Conversa alta)',
        'audioMonitor.statusSafe': 'Ambiente seguro',
        'audioMonitor.permTitle': 'Permissão necessária',
        'audioMonitor.permMsg': 'Precisamos de aceder ao microfone para ouvir o ambiente.',
        'audioMonitor.noiseLevel': 'Nível de ruído: {{pct}}%',
        'audioMonitor.tapToStart': 'Toque para ativar a escuta de segurança',
        'audioMonitor.btnStop': 'DESATIVAR ESCUTA',
        'audioMonitor.btnStart': 'ATIVAR MONITOR',
        'audioConsent.title': 'Monitorização de Áudio Ambiente',
        'audioConsent.body': 'Esta função escuta o ambiente para detetar eventos como choro, quedas ou ruídos altos.',
        'audioConsent.bodyStrong': 'O áudio não é gravado nem transmitido — é processado localmente, em tempo real, apenas enquanto este ecrã está aberto.',
        'audioConsent.accept': 'Compreendo e aceito',
        'audioConsent.acceptA11y': 'Compreendo e aceito a monitorização de áudio',
        'audioConsent.decline': 'Agora não',
        'audioConsent.declineA11y': 'Não usar a função de monitorização de áudio',
    },
}


def set_path(d, dotted, value):
    parts = dotted.split('.')
    node = d
    for p in parts[:-1]:
        node = node.setdefault(p, {})
    if parts[-1] in node:
        return False
    node[parts[-1]] = value
    return True


for locale, entries in KEYS.items():
    path = f'locales/{locale}/common.json'
    with io.open(path, encoding='utf-8') as f:
        data = json.load(f)
    added = sum(1 for k, v in entries.items() if set_path(data, k, v))
    with io.open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        f.write('\n')
    print(f'{locale}: +{added}')
