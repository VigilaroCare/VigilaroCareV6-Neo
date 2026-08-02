# Imagens remotas — plano de substituição

**Data:** 2026-08-01
**Origem:** auditoria de design ("cara de IA"). Fotos de banco genéricas são um
dos sinais mais reconhecíveis de interface gerada — e aqui elas são carregadas
por **URL remota do Pexels**, o que acrescenta um problema que não é estético:
o app depende de um CDN externo em runtime. Sem rede, ou se a foto sair do ar,
o espaço fica vazio.

## Situação

- **54** imagens remotas, em 16 ficheiros
- **22** têm candidata local plausível (confirmar antes de trocar)
- **32** precisam de arte nova

O inventário local tem 155 fotos em `assets/illustrations/pad/`, 211 no total
em `assets/illustrations/`.

## Por que não substituí automaticamente

Casar por palavra-chave acerta o tema mas erra o conteúdo: "Despensa" e
"Armários" batem no mesmo ficheiro, e uma foto de quarto rotulada como despensa
é pior do que a foto genérica que está lá hoje. As candidatas abaixo são
sugestões para conferência humana, não substituições prontas.

## Worklist

| ID Pexels | Contexto | Onde | Candidata local |
|---|---|---|---|
| `1571460` | ambientes | `screens/CuidarProtegerHubScreen.js:24` | `ambientes-casa_area-externa-praia_005.jpg`<br>`ambientes-casa_bebe-expressao-surpresa_001.jpg`<br>`ambientes-casa_carro-na-garagem_011.jpg` |
| `7162002` | mentes_atipicas | `screens/CuidarProtegerHubScreen.js:25` | **a produzir** |
| `4587979` | pets | `screens/CuidarProtegerHubScreen.js:26` | `hero_pets.png` |
| `3768131` | seguranca_idade | `screens/CuidarProtegerHubScreen.js:27` | `Como-evitar-quedas-na-terceira-idade-1.jpg`<br>`card_mobilidade_ebikes.png`<br>`encontradas_mobilidade-barra-apoio.webp` |
| `7055935` | gestante_segura | `screens/CuidarProtegerHubScreen.js:28` | `epi-protecao-individual_bota-de-seguranca_007.jpg`<br>`epi-protecao-individual_oculos-de-seguranca_009.jpg`<br>`protetores-seguranca_avental-de-protecao_004.jpg` |
| `3662804` | brinquedos_hub | `screens/CuidarProtegerHubScreen.js:29` | `criancas-bebes_brinquedos-cuidados-ao-escolher-2_029.jpg`<br>`encontradas_brinquedos-seguros-escola.webp` |
| `7055934` | — | `screens/GenericCategoryScreen.js:112` | **a produzir** |
| `163143` | — | `screens/Education/DispositivosEletronicosReviewsScreen.js:70` | **a produzir** |
| `3326105` | emergency_support | `screens/Education/GuiaKitsEmergenciaScreen.js:32` | **a produzir** |
| `6132642` | cafeteira | `data/eletrodomesticos_reviews.js:354` | **a produzir** |
| `6508357` | Geladeira e Freezer | `data/eletrodomesticos_seguranca.js:132` | `outros_limpeza-geladeira_035.jpg` |
| `8612920` | Crianças (3-12 anos) | `data/fases_vida.js:488` | `criancas-bebes_brinquedos-cuidados-ao-escolher-2_029.jpg`<br>`criancas-bebes_menina-linda-com-secador-de-cabelo-23-21_061.jpg`<br>`criancas-bebes_menino-tv_062.jpg` |
| `10184469` | Adolescentes (13-17 anos) | `data/fases_vida.js:1124` | **a produzir** |
| `37218531` | Adultos (18-59 anos) | `data/fases_vida.js:1181` | **a produzir** |
| `6194680` | Necessidades Especiais | `data/fases_vida.js:1236` | **a produzir** |
| `4206054` | Motorizadas & Pesadas | `data/ferramentas_seguranca.js:65` | **a produzir** |
| `4440173` | Despensa | `data/knowledge_prevencao.js:74` | **a produzir** |
| `8580727` | Despensa | `data/knowledge_prevencao.js:75` | **a produzir** |
| `2631746` | Quarto de Adulto | `data/knowledge_prevencao.js:93` | `ambientes-casa_quarto-casal_007.jpg` |
| `4940609` | Quarto de Adulto | `data/knowledge_prevencao.js:94` | `ambientes-casa_quarto-casal_007.jpg` |
| `5705496` | Armários | `data/knowledge_prevencao.js:180` | **a produzir** |
| `30361320` | Oficina / Ferramentas | `data/knowledge_prevencao.js:234` | `ferramentas-bricolagem_ferramentas-domesticas-2_007.jpg`<br>`ferramentas-bricolagem_ferramentas-domesticas_006.jpg`<br>`ferramentas-bricolagem_teal-and-black-bosch-cordless-hand-drill_015.jpg` |
| `34471533` | Oficina / Ferramentas | `data/knowledge_prevencao.js:235` | `ferramentas-bricolagem_ferramentas-domesticas-2_007.jpg`<br>`ferramentas-bricolagem_ferramentas-domesticas_006.jpg`<br>`ferramentas-bricolagem_teal-and-black-bosch-cordless-hand-drill_015.jpg` |
| `36946571` | Depósito | `data/knowledge_prevencao.js:250` | **a produzir** |
| `7203702` | Depósito | `data/knowledge_prevencao.js:251` | **a produzir** |
| `33094391` | Áreas Comuns | `data/knowledge_prevencao.js:322` | **a produzir** |
| `31573145` | Áreas Comuns | `data/knowledge_prevencao.js:323` | **a produzir** |
| `208358` | — | `data/neurodivergence_data.js:10` | **a produzir** |
| `1263348` | — | `data/neurodivergence_data.js:36` | **a produzir** |
| `7162002` | — | `data/neurodivergence_data.js:58` | **a produzir** |
| `6620959` | — | `data/neurodivergence_data.js:79` | **a produzir** |
| `4033321` | — | `data/neurodivergence_data.js:101` | **a produzir** |
| `3873149` | — | `data/primeiros_socorros_imagens.js:20` | **a produzir** |
| `7723629` | — | `data/primeiros_socorros_imagens.js:24` | **a produzir** |
| `36760220` | — | `data/primeiros_socorros_imagens.js:36` | **a produzir** |
| `3722212` | Cozinha Segura | `data/safety_fire.js:12` | `cozinha-utensilios_como-funciona-e-como-usar-panela-de-pres_001.jpg`<br>`cozinha-utensilios_cozinha-fogao-panelas_006.jpg`<br>`cozinha-utensilios_cozinha-organizada-bancadas-com-eletrodo_003.jpg` |
| `15720745` | Prevenção de Quedas | `data/safety_pregnant.js:16` | `Como-evitar-quedas-na-terceira-idade-1.jpg`<br>`quedas-escadas_acidente-queda_001.jpg`<br>`quedas-escadas_escada-madeira_022.jpg` |
| `14107936` | Cinto de Segurança | `data/safety_pregnant.js:25` | `epi-protecao-individual_bota-de-seguranca_007.jpg`<br>`epi-protecao-individual_oculos-de-seguranca_009.jpg`<br>`protetores-seguranca_avental-de-protecao_004.jpg` |
| `4099238` | Produtos Químicos | `data/safety_pregnant.js:34` | `produtos-limpeza_como-organizar-utensilios-domesticos-per_011.jpg` |
| `7055938` | Sinais de Alerta | `data/safety_pregnant.js:43` | **a produzir** |
| `7454848` | Zika e Dengue | `data/safety_pregnant.js:52` | **a produzir** |
| `10134015` | 1. A Regra de Ouro (Compra) | `data/safety_toys.js:19` | **a produzir** |
| `1101511` | 2. Teste do Rolo (Asfixia) | `data/safety_toys.js:29` | **a produzir** |
| `3663080` | 3. Verificação de Perigos | `data/safety_toys.js:39` | **a produzir** |
| `3633887` | 4. Itens Proibidos (Riscos Altos) | `data/safety_toys.js:49` | `hero_riscos.png`<br>`quedas-escadas_riscos-escadas-portateis_020.jpg` |
| `1148998` | 5. Organização Segura | `data/safety_toys.js:59` | `epi-protecao-individual_bota-de-seguranca_007.jpg`<br>`epi-protecao-individual_oculos-de-seguranca_009.jpg`<br>`protetores-seguranca_avental-de-protecao_004.jpg` |
| `1415131` | 6. Brincadeiras ao Ar Livre e Água | `data/safety_toys.js:69` | `idosos_idoso-ao-ar-livre_017.jpg` |
| `6995259` | Recipientes de Vidro e Cerâmica | `data/utensilios_reviews.js:143` | `generated_vidros_ceramicas.png` |
| `7382430` | tapetes_passadeiras | `data/utensilios_reviews.js:167` | **a produzir** |
| `3171837` | Festas e Eventos | `data/locales/pt-BR/RiskCategories.js:10` | **a produzir** |
| `6348123` | Visitação Segura | `data/locales/pt-BR/RiskCategories.js:122` | `epi-protecao-individual_bota-de-seguranca_007.jpg`<br>`epi-protecao-individual_oculos-de-seguranca_009.jpg`<br>`protetores-seguranca_avental-de-protecao_004.jpg` |
| `159306` | Reformas e Obras | `data/locales/pt-BR/RiskCategories.js:227` | **a produzir** |
| `4569340` | Mudança de Residência | `data/locales/pt-BR/RiskCategories.js:308` | `generated_extintor_residencial.png` |
| `8612920` | Monitorando Crianças | `data/locales/pt-BR/RiskCategories.js:372` | `criancas-bebes_brinquedos-cuidados-ao-escolher-2_029.jpg`<br>`criancas-bebes_menina-linda-com-secador-de-cabelo-23-21_061.jpg`<br>`criancas-bebes_menino-tv_062.jpg` |

## Catraca

`npm run validate:imagens` falha se o número de URLs remotas **crescer**. Não
exige resolver tudo de uma vez — impede o problema de aumentar enquanto é
resolvido aos poucos.
