# Conformidade de IA, direitos autorais e dados — Vigilaro Care

Avaliação feita em 22/09/2026 a partir do material de referência sobre ética e direitos autorais em IA, aplicado ao que o Vigilaro Care realmente faz. Cada item aponta o arquivo que comprova a situação.

Não é parecer jurídico. É um levantamento técnico do que já cumprimos, do que foi corrigido agora e do que depende de decisão sua ou de um advogado.

---

## 1. Onde o app usa IA

| Uso | Onde | Sai do aparelho? |
|---|---|---|
| Scanner de ambiente e de rótulo | `VisionService`, `ScannerScreen` | Sim: a foto e um perfil do lar anonimizado |
| Análise estratégica do relatório de vistoria | `SafetyReportService:746` → `OpenAIService.generateConsultativeReport` | Sim: respostas de vistoria |
| Resumo do dossiê de viagem | `TravelReportService:98` | Sim: dados da viagem |
| Voz (leitura em voz alta) | `VoiceAlertService` com `expo-speech` — TTS **nativo do aparelho** | Não: a síntese acontece no próprio aparelho |

O app **não** treina modelo, não clona voz de pessoa real e não gera imagem de pessoa real. O risco de deepfake, tratado no material, não se aplica: a leitura em voz alta usa o sintetizador do próprio sistema operacional.

---

## 2. Transparência — corrigido agora

O material é claro: conteúdo gerado por IA precisa ser identificado, e o EU AI Act já exige isso desde 2025. O app **anunciava a IA na entrada** ("Use a IA pra identificar riscos") mas **não identificava o resultado** como gerado por IA. Corrigido:

- **Scanner:** o resultado agora abre com o aviso da variante `ia` do `SafetyDisclaimer` — diz que a análise foi gerada por IA, que pode errar, e que não substitui laudo técnico nem orientação médica. Nas quatro línguas.
- **Relatório de vistoria em PDF:** a seção "Análise estratégica" sai com a origem declarada. Importa porque o PDF é compartilhado com familiares e às vezes com terceiros, que não sabem como ele foi montado.
- **Dossiê de viagem em PDF:** mesma marcação no resumo consultivo.

Optei por estender o `SafetyDisclaimer`, que já era o padrão do app para ressalvas, em vez de criar um componente novo.

---

## 3. Direitos autorais de conteúdo de terceiros — achado grave, corrigido

**O problema.** `data/casosReais.js` (133 KB, o maior arquivo de conteúdo do app) era o despejo bruto de e-mails do Google Alerts: 195 registros com trechos literais de matérias de veículos identificados (Toledo News, CGN, Alfinetei e outros), 193 links de rastreio do Google, nomes de pessoas reais identificáveis — inclusive uma pessoa pública citada com detalhe de acidente e ferimento — e ruído sem relação com o app: acidente em rodovia, anúncio de emprego, bazar de APAE e até um e-mail de segurança da conta Google.

**Isso chegava ao usuário.** O `RadarVigilaroService` montava **70% do feed do Radar** com esse material.

**Três problemas somados:**

1. **Direito autoral.** Redistribuir trecho de matéria jornalística dentro de um app comercial vai além da citação prevista no art. 46 da Lei 9.610/98, que exige finalidade de estudo ou crítica e medida justificada.
2. **LGPD e direitos da personalidade.** Nome, acidente e condição de saúde de pessoa identificável, tratados sem base legal e sem relação com a finalidade que o usuário conhece. Dado de saúde é sensível (art. 11).
3. **Qualidade.** Nenhum dos 195 registros tinha o campo `categoria`, então a priorização por perfil familiar nunca funcionou: o destaque caía sempre no primeiro item, uma notícia de acidente rodoviário.

**O que fiz.** O Radar passou a consumir apenas o acervo autoral de `data/radarConteudoDB.js` — 35 itens com categoria, perfil e fonte próprios. O arquivo `casosReais.js` saiu do repositório; continua recuperável no histórico do git, se houver interesse em reaproveitar os links como pauta de pesquisa, o que é uso legítimo.

**Consequência de produto:** o feed do Radar encolheu de ~195 para 35 itens. É menos conteúdo, e conteúdo bom. Repor volume com material autoral entra na sua revisão do guia master.

---

## 4. Procedência das imagens — encerrado em 22/09

`docs/IMAGES_INVENTORY.md` registra acervo do autor e fotos de Pexels e Unsplash, com orientação verificada em 2026-05-21. As duas licenças permitem uso comercial sem atribuição obrigatória — e ainda assim creditamos na tela Sobre.

**As 118 ilustrações e pictogramas foram geradas no ChatGPT (OpenAI), conforme declaração do autor em 22/09/2026.** Os arquivos do repositório não têm metadado de origem: as marcas C2PA foram removidas no processamento das imagens, então a procedência não é auditável pelos arquivos — o registro se apoia na declaração, não em evidência técnica.

O que decorre disso:

- **Uso comercial: permitido.** Os termos da OpenAI cedem ao usuário os direitos sobre a saída gerada, inclusive no plano gratuito, sem exigir atribuição. Vale para DALL·E 3, para a geração nativa do GPT-4o e para o ChatGPT Images 2.x — todas as gerações acessadas pelo ChatGPT.
- **A ressalva que fecha o assunto:** o que define a licença é o **serviço** onde o prompt foi digitado, não o modelo. Imagem feita no Bing Image Creator ou no Copilot Designer roda em DALL·E por baixo, mas os termos da Microsoft a restringem a uso pessoal e não comercial. A declaração do autor é de que usou o ChatGPT, o que afasta esse caso.
- **A identidade visual não é protegível.** Obra inteiramente gerada por IA não é registrável nos Estados Unidos, e a lei brasileira também exige autoria humana. Se um concorrente copiar os pictogramas, não há direito autoral a invocar. É fato de negócio, não defeito a corrigir.

**Recomendação de higiene, não de conformidade:** se os arquivos originais de download ainda existirem no Drive, guarde-os. O nome que o ChatGPT dá ao arquivo (`ChatGPT Image <data>.png`, ou `DALL·E <data> - <prompt>.png` nas gerações antigas) e o metadado C2PA que eles carregam são a evidência da origem, caso algum dia seja preciso demonstrar.

---

## 5. Termos de uso dos provedores

| Provedor | Uso no app | A verificar |
|---|---|---|
| OpenAI | Análise de imagem e texto via proxy | Uso comercial permitido na API. Confirmar que o app não se enquadra como aconselhamento médico nas políticas de uso |
| ElevenLabs | **Não usado hoje.** A voz do app vem do TTS nativo do aparelho (`expo-speech` em `VoiceAlertService`). Restam só o `voice_id` em `Config.js` e a rota no proxy, sem chamador | ⚠️ A conta é do **plano Free**, que licencia o áudio para uso **não comercial** e com atribuição. Ligar a voz da ElevenLabs num app pago exige assinatura paga antes. Registrado como aviso no `Config.js` |
| EPA CompTox | Consulta de substâncias | API pública; confirmar exigência de atribuição |
| Open Food Facts | Código de barras | Licença ODbL: **exige atribuição** e compartilhamento nos mesmos termos de bases derivadas |

**Open Food Facts — resolvido em 22/09.** A licença ODbL obriga a creditar a fonte. Além do rótulo de origem no resultado, a tela Sobre passou a ter um bloco "Créditos e fontes" que credita Open Food Facts (com a licença nomeada), UPCitemdb, EPA CompTox, os CIATox, Pexels e Unsplash — e declara o uso de IA nas ilustrações, atendendo à prática de transparência do material de referência. Nos quatro idiomas.

---

## 6. LGPD — o que já está em ordem

Levantado no Mapa de Funcionalidades e confirmado no código: o app é local-first, sem conta nem banco em nuvem; dados sensíveis ficam em armazenamento criptografado; o analytics é opt-in explícito e hoje não envia nada; a telemetria de erro redige nome, telefone, saúde e token antes de sair do aparelho; o contexto enviado à IA é anonimizado, sem nomes, por decisão registrada em `OpenAIService:118-125`.

Falta o que já está em `PENDENCIAS.md`: declarar o compartilhamento com terceiros no Data Safety do Google Play e no App Privacy da Apple.

---

## 7. O que ainda depende de você

1. **Revisão jurídica antes da publicação**, se quiser segurança formal. Este documento serve de insumo.

Encerrados em 22/09: procedência das imagens (ChatGPT/OpenAI, por declaração do autor — uso comercial permitido), plano da ElevenLabs (Free, e por isso a voz segue desligada, com aviso no `Config.js`) e o crédito ao Open Food Facts (escrito na tela Sobre, nos 4 idiomas).
