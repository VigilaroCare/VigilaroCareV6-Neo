# Misturas proibidas (ED-0576) — APROVADO e aplicado em 16/10/2026

Substitui o item hoje em `data/locales/pt-BR/guiasSeguranca.js` (ERROS GRAVES - NUNCA FAÇA):
"Nunca misture água sanitária com desinfetantes que contêm amônia ou vinagre. Essa mistura solta um gás altamente tóxico".

O guia (`guia-completo-prevencao.md`) não tem lista de misturas. Este rascunho foi feito a partir do que
o app já diz em 10 lugares diferentes (com versões divergentes) e conferido em fonte oficial.

## Texto proposto

**Regra de ouro: não misture produtos de limpeza.** Só combine produtos quando o próprio rótulo
autorizar. Mais produto não limpa mais — respeite a diluição indicada pelo fabricante.

**Misturas que nunca devem ser feitas:**

1. **Água sanitária + produtos ácidos** (vinagre, ácido muriático, limpa-pedras, removedores de
   ferrugem e de crostas, alguns limpadores de vaso sanitário) → libera **gás cloro**.
2. **Água sanitária + produtos com amônia** (alguns limpa-vidros e desinfetantes) → libera **cloraminas**, gases irritantes e tóxicos.
3. **Água sanitária + álcool** → forma **clorofórmio** e outros compostos tóxicos.
4. **Água oxigenada + vinagre** → forma **ácido peracético**, corrosivo para olhos, pele e pulmões.
5. **Dois desentupidores diferentes** (ou desentupidor + outro produto) → reação violenta, calor e
   respingos corrosivos dentro do ralo, que podem voltar no rosto.

**Se a mistura já aconteceu:**

- Saia do ambiente e vá para um local ventilado; abra janelas só se puder fazer isso sem respirar o vapor.
- **Não tente neutralizar** a mistura jogando outro produto.
- Tosse, ardência nos olhos, tontura, náusea ou falta de ar: procure atendimento e ligue para
  {{POISON_CONTROL}}.

## Fontes (rastro de origem — não vai para a tela)

- Anvisa, alerta de 24/09/2026 — água sanitária + ácidos (gás cloro) e + amônia; álcool + água
  sanitária (clorofórmio); "não tente neutralizar"; procurar ambiente ventilado; Disque-Intoxicação
  0800 722 6001. https://www.poder360.com.br/poder-saude/anvisa-alerta-para-risco-de-misturar-produtos-de-limpeza/
- Washington State Department of Health — bleach + ammonia (cloraminas), + acids (gás cloro),
  + vinagre ou álcool; misturar água sanitária só com água.
- Itens 4 e 5: **fonte secundária** (centros de controle de intoxicação dos EUA citados pela imprensa;
  alerta do NJ Department of Health não pôde ser lido). Conferir antes de publicar ou retirar.

## Decisões (16/10/2026 — critério do Agnaldo: manter o que agrega e protege; suprimir o pouco prático)

- Itens 4 e 5 (água oxigenada + vinagre; dois desentupidores): MANTIDOS — situações reais do dia a dia
  (receitas "naturais" de limpeza; trocar de desentupidor quando o primeiro não resolve) e protegem o usuário.
- "Urina também contém amônia": RETIRADO — pouco prático no dia a dia.
- pt-PT "lixívia + detergente é a mistura mais perigosa (CIATOX/ANVISA)": SUPRIMIDO — sem respaldo na
  Anvisa; detergente neutro não é o problema. Removido também de en e es, que repetiam a afirmação.

## Onde foi aplicado

- `data/knowledge_prevencao.js` — tópico "Produtos Químicos e Misturas Letais": lista completa.
- `data/locales/*/guiasSeguranca.js` — "ERROS GRAVES - NUNCA FAÇA" (ED-0576): versão curta, 4 idiomas.
- `data/locales/*/RiskCategories.js` — pontos-chave de produtos químicos, 4 idiomas.
- Adequação por país: lixívia/ácido clorídrico (PT), lejía/salfumán/antical (ES), {{POISON_CONTROL}}.
