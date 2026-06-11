# -*- coding: utf-8 -*-
# Injeta as chaves de tradução faltantes (fluxos de SOS/queda) em en/es/pt-PT.
# Só adiciona chaves AUSENTES — nunca sobrescreve tradução existente.
import json, io

TRANSLATIONS = {
    'en': {
        'activityLog.fallSosTitle': 'Fall SOS sent',
        'activityLog.fallSosDesc': 'Fall detected for {{nome}}. SOS alert sent to contacts.',
        'activityLog.manualSosTitle': 'Manual SOS sent',
        'activityLog.manualSosDesc': 'SOS alert manually triggered by {{nome}}.',
        'activityLog.vitalSosTitle': 'Check-in missed',
        'activityLog.vitalSosDesc': "{{nome}} didn't respond to the check-in. SOS alert sent to contacts.",
        'fallSensitivity.title': 'Fall sensitivity',
        'fallSensitivity.subtitle': 'How the app recognizes a real fall',
        'fallSensitivity.hero': 'The more sensitive, the sooner the app reacts — but false alarms become more likely. Choose what makes sense for you.',
        'fallSensitivity.levelSection': 'Sensitivity level',
        'fallSensitivity.high.title': 'High',
        'fallSensitivity.high.desc': 'Reacts to light falls. May trigger if the phone falls off a table.',
        'fallSensitivity.medium.title': 'Medium (recommended)',
        'fallSensitivity.medium.desc': 'Balance between quick alerts and few false positives. A good choice for most people.',
        'fallSensitivity.low.title': 'Low',
        'fallSensitivity.low.desc': 'Only triggers on strong impacts. Ideal for active people or public transport users.',
        'fallSensitivity.toggleLabel': 'Fall detection',
        'fallSensitivity.toggleOnDesc': 'Active in the background while the app is open.',
        'fallSensitivity.toggleOffDesc': "Off. The app won't react to falls.",
        'fallSensitivity.footnote': 'The setting applies from now on. You can change it as often as you like.',
        'headersFirst.itensParaVerificar': 'items to check',
        'menu.fallSensitivity': 'Fall sensitivity',
        'menu.mapaSensivel': 'Your sensitive map',
        'recentActivity.adjustSensitivity': 'Seeing too many fall events? Adjust the sensitivity',
        'recentActivity.subtitle': 'App event history',
        'sosCountdown.alsoWhatsApp': 'Also send via WhatsApp',
        'sosCountdown.whatsappOpened': 'WhatsApp opened',
        'sosCountdown.sensitivityPromptTitle': "Didn't seem like a fall?",
        'sosCountdown.sensitivityPromptDesc': 'If alerts keep going off for no reason, you can lower the sensitivity right here.',
        'sosCountdown.sensitivityPromptAdjust': 'Adjust sensitivity',
        'sosCountdown.sensitivityPromptDismiss': 'Not now',
    },
    'es': {
        'activityLog.fallSosTitle': 'SOS por caída enviado',
        'activityLog.fallSosDesc': 'Caída detectada para {{nome}}. Alerta de SOS enviada a los contactos.',
        'activityLog.manualSosTitle': 'SOS manual enviado',
        'activityLog.manualSosDesc': 'Alerta de SOS activada manualmente por {{nome}}.',
        'activityLog.vitalSosTitle': 'Check-in sin respuesta',
        'activityLog.vitalSosDesc': '{{nome}} no respondió al check-in. Alerta de SOS enviada a los contactos.',
        'fallSensitivity.title': 'Sensibilidad de caída',
        'fallSensitivity.subtitle': 'Cómo reconoce la app una caída real',
        'fallSensitivity.hero': 'Cuanto más sensible, antes reacciona la app — pero aumenta la probabilidad de alertas sin motivo. Elige lo que tenga sentido para ti.',
        'fallSensitivity.levelSection': 'Nivel de sensibilidad',
        'fallSensitivity.high.title': 'Alta',
        'fallSensitivity.high.desc': 'Reacciona a caídas leves. Puede activarse si el teléfono cae de una mesa.',
        'fallSensitivity.medium.title': 'Media (recomendada)',
        'fallSensitivity.medium.desc': 'Equilibrio entre alerta rápida y pocos falsos positivos. Buena opción para la mayoría.',
        'fallSensitivity.low.title': 'Baja',
        'fallSensitivity.low.desc': 'Solo se activa con impactos fuertes. Ideal para personas activas o que usan transporte público.',
        'fallSensitivity.toggleLabel': 'Detección de caídas',
        'fallSensitivity.toggleOnDesc': 'Activa en segundo plano mientras la app está abierta.',
        'fallSensitivity.toggleOffDesc': 'Desactivada. La app no reaccionará a caídas.',
        'fallSensitivity.footnote': 'El ajuste se aplica desde ahora. Puedes cambiarlo cuantas veces quieras.',
        'headersFirst.itensParaVerificar': 'elementos por verificar',
        'menu.fallSensitivity': 'Sensibilidad de caída',
        'menu.mapaSensivel': 'Tu mapa sensible',
        'recentActivity.adjustSensitivity': '¿Demasiados eventos de caída? Ajusta la sensibilidad',
        'recentActivity.subtitle': 'Historial de eventos de la app',
        'sosCountdown.alsoWhatsApp': 'Enviar también por WhatsApp',
        'sosCountdown.whatsappOpened': 'WhatsApp abierto',
        'sosCountdown.sensitivityPromptTitle': '¿Parece que no fue una caída?',
        'sosCountdown.sensitivityPromptDesc': 'Si la alerta se dispara sin motivo, puedes reducir la sensibilidad aquí mismo.',
        'sosCountdown.sensitivityPromptAdjust': 'Ajustar sensibilidad',
        'sosCountdown.sensitivityPromptDismiss': 'Ahora no',
    },
    'pt-PT': {
        'activityLog.fallSosTitle': 'SOS por queda enviado',
        'activityLog.fallSosDesc': 'Queda detetada para {{nome}}. Alerta de SOS enviado aos contactos.',
        'activityLog.manualSosTitle': 'SOS manual enviado',
        'activityLog.manualSosDesc': 'Alerta de SOS acionado manualmente por {{nome}}.',
        'activityLog.vitalSosTitle': 'Check-in sem resposta',
        'activityLog.vitalSosDesc': '{{nome}} não respondeu ao check-in. Alerta de SOS enviado aos contactos.',
        'fallSensitivity.title': 'Sensibilidade de queda',
        'fallSensitivity.subtitle': 'Como a app reconhece uma queda real',
        'fallSensitivity.hero': 'Quanto mais sensível, mais cedo a app reage — mas também aumenta a probabilidade de alertas sem motivo. Escolha o que faz sentido para si.',
        'fallSensitivity.levelSection': 'Nível de sensibilidade',
        'fallSensitivity.high.title': 'Alta',
        'fallSensitivity.high.desc': 'Reage a quedas ligeiras. Pode disparar se o telemóvel cair de uma mesa.',
        'fallSensitivity.medium.title': 'Média (recomendada)',
        'fallSensitivity.medium.desc': 'Equilíbrio entre alerta rápido e poucos falsos positivos. Boa escolha para a maioria.',
        'fallSensitivity.low.title': 'Baixa',
        'fallSensitivity.low.desc': 'Só dispara em impactos fortes. Ideal para quem é ativo ou anda de transportes públicos.',
        'fallSensitivity.toggleLabel': 'Deteção de queda',
        'fallSensitivity.toggleOnDesc': 'Ativa em segundo plano enquanto a app está aberta.',
        'fallSensitivity.toggleOffDesc': 'Desligada. A app não vai reagir a quedas.',
        'fallSensitivity.footnote': 'O ajuste é aplicado a partir de agora. Pode alterá-lo as vezes que quiser.',
        'headersFirst.itensParaVerificar': 'itens para verificar',
        'menu.fallSensitivity': 'Sensibilidade de queda',
        'menu.mapaSensivel': 'O seu mapa sensível',
        'recentActivity.adjustSensitivity': 'A ver demasiados eventos de queda? Ajuste a sensibilidade',
        'recentActivity.subtitle': 'Histórico de eventos da app',
        'sosCountdown.alsoWhatsApp': 'Enviar também por WhatsApp',
        'sosCountdown.whatsappOpened': 'WhatsApp aberto',
        'sosCountdown.sensitivityPromptTitle': 'Pareceu que não foi uma queda?',
        'sosCountdown.sensitivityPromptDesc': 'Se o alerta está a disparar sem motivo, pode reduzir a sensibilidade aqui mesmo.',
        'sosCountdown.sensitivityPromptAdjust': 'Ajustar sensibilidade',
        'sosCountdown.sensitivityPromptDismiss': 'Agora não',
    },
}


def detect_indent(path):
    with io.open(path, encoding='utf-8') as f:
        for line in f:
            stripped = line.lstrip(' ')
            if line != stripped and stripped.startswith('"'):
                return len(line) - len(stripped)
    return 2


def set_path(d, dotted, value):
    parts = dotted.split('.')
    node = d
    for p in parts[:-1]:
        node = node.setdefault(p, {})
    if parts[-1] in node:
        return False  # já traduzida — não sobrescrever
    node[parts[-1]] = value
    return True


for locale, entries in TRANSLATIONS.items():
    path = f'locales/{locale}/common.json'
    indent = detect_indent(path)
    with io.open(path, encoding='utf-8') as f:
        data = json.load(f)
    added = sum(1 for k, v in entries.items() if set_path(data, k, v))
    with io.open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=indent)
        f.write('\n')
    print(f'{locale}: +{added} chaves adicionadas (indent={indent})')
