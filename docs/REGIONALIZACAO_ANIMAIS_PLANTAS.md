# Regionalização — Animais Peçonhentos e Plantas Tóxicas

**Data:** 2026-07-31
**Contexto:** o app suporta 4 locales (pt-BR, pt-PT, es, en). As bases
`data/animais_ciatox.js` (26 fichas) e `data/plantas_ciatox.js` (17 fichas)
foram escritas para o Brasil, a partir de CIATOX/PR, CIATOX/SC e SESA.

---

## 1. O diagnóstico que muda a ordem das prioridades

A leitura inicial era: *"faltam as traduções pt-PT — 0 campos `_ptpt` nas duas
bases, tudo cai silenciosamente para pt-BR"*. Isso é verdade, mas é o problema
menor.

O problema maior é de **relevância, não de idioma**. Traduzir a ficha da
jararaca para português europeu não ajuda um utilizador em Lisboa, porque
*Bothrops jararaca* não ocorre em Portugal. Ele receberia uma tradução
impecável de um conteúdo que não se aplica a ele — e continuaria sem
informação sobre as espécies que efetivamente causam acidentes no país dele.

**Consequência prática:** a camada de ocorrência geográfica precisa vir antes
da camada de tradução. Traduzir primeiro é pagar caro por conteúdo que depois
vai ser filtrado para fora.

---

## 2. Sobreposição medida entre o catálogo atual e cada mercado

Classificação de primeira passada, por conhecimento de distribuição
estabelecido. **Precisa de validação contra GBIF (fauna) e POWO/Kew (flora)
antes de virar dado de produção.**

### Animais — 26 fichas

| Aplicável a | Fichas | Observação |
|---|---|---|
| Brasil (pt-BR) | 26 / 26 | catálogo foi escrito para cá |
| Portugal (pt-PT) | ~10 / 26 | ver lista abaixo |
| Espanha (es-ES) | ~11 / 26 | semelhante a Portugal |
| EUA (en-US) | ~13 / 26 | melhor sobreposição: *Crotalus*, *Micrurus*, *Latrodectus*, *Loxosceles* têm representantes locais |

Fichas que **se aplicam** a Portugal/Espanha: *Loxosceles* spp.,
*Latrodectus* spp., *Scolopendra* spp., *Apis mellifera*, *Polistes* spp.,
*Salamandra* spp., *Physalia physalis*, cnidários em geral, *Scorpaena* spp.,
raias (*Dasyatis*).

As outras 16 são exclusivamente neotropicais — jararacas, cascavel, surucucu,
corais, *Phoneutria*, *Tityus*, *Lonomia*, *Rhinella marina*, *Grammostola*,
*Potamotrygon*, *Hapalochlaena*.

### Plantas — 17 fichas

Sobreposição muito melhor, como esperado: ornamentais são cosmopolitas.
Cerca de **13 das 17** aplicam-se a Portugal e Espanha — *Nerium oleander*,
*Ricinus communis*, *Dieffenbachia*, as quatro *Euphorbia*, *Zantedeschia*,
*Melia azedarach*, *Colocasia*, *Zamioculcas*, *Brugmansia*, *Caladium*.

Fora: *Lithraea molleoides*, *Urera baccifera*, *Jatropha gossypiifolia*,
*Thevetia peruviana* (neotropicais ou tropicais).

**Isto confirma a hipótese de arquitetura:** a base de plantas é quase toda
reaproveitável internacionalmente; a de animais não é.

---

## 3. Lacunas críticas por mercado

Mais importante do que o que sobra é o que **falta**. Um utilizador em Portugal
hoje não encontra nenhuma das espécies que realmente causam acidentes lá:

**Portugal / Espanha**
- *Vipera latastei* (víbora-cornuda) e *Vipera seoanei* (víbora-de-Seoane) —
  as únicas serpentes de importância médica em Portugal. Espanha acrescenta
  *Vipera aspis*.
- *Trachinus* spp. (peixe-aranha) — causa muito frequente de envenenamento em
  praias portuguesas e espanholas, e ausente do catálogo.
- *Vespa velutina* (vespa asiática) — invasora, com relevância crescente.
- *Buthus ibericus* / *Buthus occitanus* — escorpiões ibéricos, baixa gravidade
  mas alta procura de informação.

**EUA**
- *Agkistrodon* spp. (copperhead, cottonmouth) — junto com *Crotalus*, dominam
  a casuística norte-americana.
- *Loxosceles reclusa* (brown recluse) — a ficha genérica de *Loxosceles* cobre
  parcialmente, mas o nome popular e a distribuição são outros.

---

## 4. Sequência recomendada

1. **Camada de ocorrência.** Generalizar `animaisPorEstado` (que já existe e já
   está correta na estrutura, só está presa a UF brasileira) para uma chave de
   país/região. Cada ficha declara onde ocorre; a UI deixa de apresentar como
   local aquilo que não é.
2. **Campo de proveniência por ficha.** Fonte, data de revisão e link, no dado
   e não no comentário do ficheiro. Barato agora, caro de retroagir.
3. **Fichas em falta por mercado.** Começar por Portugal/Espanha, que partilham
   quase toda a fauna relevante — uma única leva cobre dois locales.
4. **Tradução pt-PT.** Só depois, e só do conteúdo que um utilizador em
   Portugal vai efetivamente ver. Estimativa após os passos 1–3: bem menos do
   que os 231 campos que uma tradução cega implicaria hoje.

---

## 5. Nota sobre tradução pt-PT

Quando chegar a vez, atenção a dois pontos:

- O fallback atual (`utils/getLocalizedField.js`) é silencioso: sem `_ptpt`, o
  utilizador vê pt-BR sem qualquer indicação. Isso é aceitável como degradação,
  mas não deve ser confundido com cobertura.
- Instruções imperativas negativas ("NÃO faça torniquete") são o ponto de maior
  risco de tradução. Uma negação perdida inverte a instrução. Não automatizar.

---

## 5b. Achados da classificação de ocorrência

A primeira passada da camada de ocorrência encontrou três casos que a leitura
por idioma nunca teria revelado:

- **`polvo_aneis_azuis`** (*Hapalochlaena* spp.) está no catálogo brasileiro,
  mas o gênero é indo-pacífico e **não ocorre no Brasil**. Conteúdo de
  interesse geral apresentado como risco local.
- **`salamandra`** (*Salamandra* spp.) idem: *Salamandra salamandra* é
  europeia. A ficha não está errada — está no mercado errado. É nativa de
  Portugal e Espanha, onde hoje não aparece como local.
- **`urtiga`** (*Urera baccifera*) é uma armadilha de nome popular. A "urtiga"
  europeia é *Urtica dioica*, outro táxon. Reaproveitar a ficha em pt-PT
  induziria erro de identificação — precisa de ficha própria.

Há ainda duas sobreposições internas a resolver: `coral` (*Micrurus* spp.) com
`cobra_coral` (*Micrurus corallinus*), e `jararacu_u` com
`jararacu_u_albina` (variante albina, não táxon distinto).

## 6. O que já foi feito (2026-07-31)

Números de emergência deixaram de estar escritos dentro do texto das fichas e
passaram a ser tokens resolvidos pelo país do utilizador
(`utils/emergencyTokens.js`). Antes, um utilizador em Madrid lia
*"Llame a emergencias (192)"* — número brasileiro. Verificação em
`npm run validate:emergency`.

Corrigido também o número do centro de intoxicação nas fichas: era
`0800 014 8110` (CEATOX do Instituto da Criança, HC/USP — centro local de São
Paulo), passou a ser `0800 722 6001`, a linha nacional Disque-Intoxicação da
Anvisa, que encaminha para o CIATox mais próximo de quem liga.

**Camada de ocorrência** (`data/ocorrencia_regional.js`) com as 43 fichas
classificadas nos 4 mercados pela regra de dois critérios, mais o registro de
lacunas por país. `utils/relevanciaRegional.js` ordena e separa sem nunca
remover — garantia coberta por teste. Verificação em
`npm run validate:ocorrencia`.

Estado: **preliminar**. A classificação é de distribuição biogeográfica; os
critérios A/B ainda não foram extraídos das fontes estatísticas.

**Telas ligadas.** `AnimaisPeconhentosScreen` e `PlantasToxicasScreen` agora
separam em duas seções — "Ocorre na sua região" e "Outras regiões" — com a
segunda sempre presente e acessível. Durante a busca a lista fica plana, para
o resultado não desaparecer numa seção inesperada. O botão de ligar deixou de
discar `0800 722 6001` fixo: agora resolve pelo país, e Portugal ganhou linha
própria (CIAV / INEM, 800 250 250).

## 7. Varredura completa do número de emergência

O que começou nas fichas revelou-se sistêmico. Varredura final em `data/`,
`screens/`, `components/` e `utils/`:

- **8 pontos de discagem fixa** em 6 telas — `tel:08007226001`, `tel:192`,
  `tel:193` — incluindo o botão do SOS (`SOSEmergencyModeScreenNeo`) e o de
  primeiros socorros. Todos passam a resolver pelo país.
- **98 linhas de conteúdo** em 28 ficheiros, tokenizadas.
- **26 chaves de locale** nos 4 idiomas.
- Uma chave renomeada: `headersFirst.cIATOXLIGUE08007226001` →
  `headersFirst.callPoisonControl`.
- `sos.toxPhone` removido do i18n — número discável não é texto traduzível.

**Rede de segurança:** `components/NeoTypography.js` resolve tokens em qualquer
string que passe por `NeoText`/`H1`/`Body`/`Small`. Nem todo ecrã usa
`t_field`; sem isso, um token não resolvido apareceria cru numa instrução de
emergência. Custo de um `indexOf('{{')` por string.

**Fontes de verdade preservadas** (nunca tokenizar): `data/telefones_ciatox.js`,
`data/emergencyNumbersByCountry.js`, `utils/emergencyTokens.js`.

`npm run validate:emergency` agora varre o repositório inteiro e falha se um
número de emergência voltar a ser escrito em conteúdo ou discado direto.

### Ainda por fazer

Os números de **bombeiros (193)** e **polícia (190)** continuam escritos em
parte do conteúdo. Menos crítico que o médico e o toxicológico, mas é a mesma
classe de problema — `getFireDial()` já existe para quando for a vez.

---

## 8. ROTEIRO DE TESTE PENDENTE (2026-07-31)

Tudo abaixo passou em verificação estática mas **não foi exercitado em
aparelho**. Testado até agora: apenas onboarding, cadastro de pet e Home.

| Tela | O que verificar | Esperado (Brasil) |
|---|---|---|
| SOS | Botão CIATOX | disca `0800 722 6001`, mostra "CIATOX (0800 722 6001) · 24h" |
| Primeiros Socorros (emergência) | Passos e alertas | nunca `{{EMERGENCY_NUMBER}}` cru; deve ler "192" |
| Emergência Rápida | 3 botões de discagem | 192, 193 e CIATOX |
| Animais Peçonhentos | Seções | 24 fichas em "Ocorre na sua região", 2 em "Outras regiões" |
| Plantas Tóxicas | Seções | 17 e 0 — sem divisor visível |
| Ambas as listas | Busca ativa | seções somem, lista fica plana |
| DisclaimerModal | Abrir | não crasha; mostra "SAMU (192)" |
| Info Rótulos / Pet Food | Botão de ligar | CIATOX correto |

**Sinal de falha mais provável:** token cru na tela (`{{POISON_CONTROL}}`).
Significa que aquele caminho de renderização não passa nem por `t_field` nem
por `NeoText` — resolver com `resolveEmergencyTokens()` no ponto.

**Testar fora do Brasil:** `getEmergencyCountry` testa o GPS contra o polígono
do Brasil *antes* de olhar a região do aparelho. Estando fisicamente no Brasil
com localização ativa, retorna sempre `BR`. Para simular Portugal: negar a
permissão de localização e pôr a região do sistema em Portugal — deve aparecer
"CIAV (800 250 250)" e a salamandra sobe para a primeira seção.
