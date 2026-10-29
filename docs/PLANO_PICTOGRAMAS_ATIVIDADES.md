# Plano de pictogramas: Atividades Eventuais

**Data:** 28/10/2026 · **Decisão do Agnaldo:** artes dedicadas rendem mais, porque o cartão precisa dizer o assunto com o título e com a imagem juntos.

Hoje as 7 categorias usam pictogramas que já existiam para outros assuntos (balão da criança, "60+", capacete, mala, brinquedos, placa de piso molhado, frasco com aviso). Funcionam, mas cada um já "pertence" a outra tela do app. Este documento é o pedido de arte para trocar por peças feitas para cada categoria.

## O que pedir (8 peças)

Cada peça é UM objeto, ou um grupo compacto de objetos, sem texto. O motivo abaixo é a minha sugestão; troque à vontade. A coluna "Evitar" existe porque o desenho já é usado em outro lugar do app e repetir confunde.

| # | Categoria (id) | Motivo sugerido | Evitar | Nome do arquivo de origem |
|---|---|---|---|---|
| 1 | Festas e Eventos (`festas_eventos`) | dois balões amarrados com fita, um chapéu de festa e poucos confetes | taças, bebida, churrasqueira (é o risco, não a festa) | `Atividade - Festas e Eventos.png` |
| 2 | Visitação Segura (`visitacao_segura`) | porta de casa entreaberta, com tapete de entrada e duas silhuetas no vão: um adulto com bengala e uma criança pequena | "60+" escrito (texto não traduz) | `Atividade - Visitacao Segura.png` |
| 3 | Reformas e Obras (`reformas_obras`) | canto de parede de tijolos pela metade, com colher de pedreiro e rolo de pintura | capacete (é de EPIs & Ferramentas) | `Atividade - Reformas e Obras.png` |
| 4 | Mudança de Residência (`mudanca_residencia`) | duas caixas de papelão empilhadas, uma com fita, e uma chave de casa pendurada | mala (é de Viagem) | `Atividade - Mudanca de Residencia.png` |
| 5 | Monitorando Crianças (`monitor_kids`) | babá eletrônica (câmera pequena) ao lado de uma criança sentada com blocos de montar | ursinho (é de Brinquedos) | `Atividade - Monitorando Criancas.png` |
| 6 | Serviços em Altura (`servicos_altura`) | escada encostada na beirada de um telhado, com cinto de segurança preso ao topo | placa de piso molhado (é de Riscos Físicos) | `Atividade - Servicos em Altura.png` |
| 7 | Faxina Pesada (`faxina_quimica`) | balde com esfregão, um par de luvas de borracha na borda e um frasco com gatilho | frasco com triângulo de aviso (é de Produtos Químicos) e dois frascos com "+" (é de Misturas Perigosas) | `Atividade - Faxina Pesada.png` |
| 8 | Planejar reforma, visita ou mudança (cartão âmbar) | uma página de calendário com uma casinha pequena e um "visto" | casa com martelo e chave de fenda (é o pictograma do cartão da Home) | `Atividade - Planejar.png` |

## Especificação técnica (a mesma das artes novas de 25/10/2026)

- **PNG com fundo transparente**, quadrado, **1000 a 1400 px**.
- **Enquadramento folgado:** o desenho ocupa uns 60 a 70% do quadro e fica centralizado. O normalizador reescala pela tinta, não pela caixa, então o desenho não precisa vir "do tamanho certo", só inteiro e com folga.
- **Sem texto dentro da arte.** Texto na imagem não muda de idioma e o app tem quatro (pt-BR, pt-PT, en, es).
- **Sem chão e sem sombra projetada.** A luz e o brilho ficam no próprio objeto.
- **Cor:** pode ser qualquer uma, porque o normalizador reancora tudo no verde único `#064E3B`. Só evite vermelho, laranja e azul fortes: eles viram verde e o relevo que depende da cor se perde.
- **Peso:** o estilo novo é uns 1,9x mais pesado que o antigo (~99 KB por arquivo). Oito peças somam menos de 1 MB nas três densidades; não é problema.

## Prompts (um por peça) — para ficar o mais próximo possível dos pictogramas atuais

**Como usar (vale para todos)**
1. Anexe SEMPRE 3 imagens de referência do acervo atual, as mesmas nas 8 gerações: `assets/illustrations/glifos/pictogram-guias-equipamentos.png`, `pictogram-viagem-malas.png` e `pictogram-produtos.png`. Escreva na ferramenta: "match the style, material, lighting and level of detail of the attached reference icons".
2. Cole o BLOCO DE ESTILO abaixo seguido do MOTIVO da peça, e o BLOCO NEGATIVO no campo de "negative prompt" (ou ao fim, como "Avoid: ...").
3. Gere uma peça por vez, na mesma conversa/sessão e, se a ferramenta permitir, com a mesma semente (seed). Gere 4 variações e escolha a mais simples.
4. Peça fundo transparente. Se vier fundo sólido, gere em fundo branco liso e remova depois; confira o canal alfa antes de enviar.
5. Confira a 24 px de largura: se a silhueta não se lê, simplifique o motivo.

**BLOCO DE ESTILO (igual em todas)**
```
Single 3D embossed ceramic icon, one compact object group centered on a square canvas.
Soft rounded chunky shapes with a gentle bevel, like glazed porcelain relief.
Monochrome deep forest green (#064E3B), one hue only, shading from darker green in the
shadows to a slightly lighter green on the highlights. Soft diffuse studio light from the
top-left, smooth gentle specular highlights, subtle inner engraved lines for details.
Simple readable silhouette, minimal detail, flat front view, no perspective.
Transparent background. The object fills about 65% of the frame with generous empty margin.
Same style as the attached reference icons.
```

**BLOCO NEGATIVO (igual em todas)**
```
text, letters, numbers, logo, watermark, ground, floor, cast shadow, drop shadow, background,
gradient background, realistic photo, people with faces, multiple colors, red, orange, blue,
yellow, outline stroke, flat vector style, cartoon, clutter, small tiny details, perspective, 3/4 view
```

**MOTIVO de cada peça (cole depois do bloco de estilo, começando por "Subject:")**

1. Festas e Eventos
`Subject: two helium balloons tied with thin curved ribbons, next to a small striped party hat with a round pom-pom on top, and a few tiny confetti pieces floating around. Balloons glossy and rounded, hat cone-shaped with two engraved stripes.`

2. Visitação Segura
`Subject: a house front door slightly open, seen straight on, with a thick doormat in front. In the open doorway, two simple faceless silhouettes standing together: a tall adult leaning on a walking cane holding hands with a small child. Door frame as raised relief, doorway recessed.`

3. Reformas e Obras
`Subject: a half-built brick wall corner with engraved brick joints, a mason's trowel leaning against it, and a paint roller resting on top. No hard hat.`

4. Mudança de Residência
`Subject: two stacked cardboard moving boxes, the top one sealed with a strip of tape, and a house key hanging on a round tag beside them. No suitcase.`

5. Monitorando Crianças
`Subject: a small baby monitor camera on a short stand with a round lens, next to a faceless toddler silhouette sitting and playing with three stacked building blocks. No teddy bear.`

6. Serviços em Altura
`Subject: a straight ladder leaning on the edge of a sloped roof, with a safety harness ring and strap clipped to the top of the ladder. Keep the roof very simple, one slanted slab. No warning signs.`

7. Faxina Pesada
`Subject: a bucket with a mop standing in it, a pair of rubber gloves resting on the rim, and a small trigger spray bottle beside the bucket. No warning triangle, no skull, no mixed bottles.`

8. Planejar (cartão âmbar)
`Subject: a single calendar page with two binding rings at the top, a small house engraved in its center and a round check-mark badge in the lower right corner. No hammer, no tools.`

**Se alguma peça sair confusa, versões simplificadas**
- 2: só a porta entreaberta com o tapete e UMA silhueta no vão.
- 6: só a escada com o cinto pendurado, sem telhado.
- 5: só a babá eletrônica sobre os blocos, sem a criança.

## Quando as artes chegarem (passos de quem integra)

1. Colocar os 8 arquivos em `assets/illustrations/education-pictograms/` (pasta que já está no `.gitignore` como permitida; **não criar pasta nova**, o `.gitignore` tem lista de permissão e já perdeu arquivos duas vezes).
2. Registrar cada um na tabela `LIMPAS` de `scripts/reenquadrar_acervo.js`, com o nome que o app importa: `pictogram-atividade-festas`, `-visita`, `-obras`, `-mudanca`, `-criancas`, `-altura`, `-faxina`, `-planejar`. Arte nova transparente exige `--limpo` (o modo padrão inverte a saída).
3. Rodar `node scripts/reenquadrar_acervo.js --caixa 0.73 --saida glifos` e conferir `assets/illustrations/glifos/` (1x, 2x e 3x de cada).
4. Trocar os `require` em `data/pictogramasAtividades.js` (um só lugar: a grade da página e o modal de verificação leem de lá).
5. Conferir a página no tema claro, no escuro e em 360dp, e conferir o peso final de `glifos/`.

## Procedência (pendência G de `docs/PENDENCIAS.md`)

Se a ferramenta de imagem for de IA, anotar **qual ferramenta e qual plano** foram usados. O uso comercial depende do plano contratado, e arte gerada por IA pode não ser protegível por direito autoral. A procedência das 118 ilustrações atuais ainda está em aberto com o Agnaldo.
