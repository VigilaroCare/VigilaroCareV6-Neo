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

## Prompt-base (para a ferramenta de imagem)

Mantém a família dos pictogramas que já existem (cerâmica 3D, verde-escuro, luz suave). Troque só a última linha, o motivo.

```
3D ceramic app icon, single object group, centered, chunky rounded shapes,
glossy ceramic material with soft bevel and gentle specular highlights,
monochrome deep green, soft studio lighting, transparent background,
no text, no letters, no numbers, no ground, no cast shadow,
generous empty margin around the object (object fills about 65% of the square).
Subject: <MOTIVO DA TABELA, em inglês>
```

Motivos em inglês, prontos para colar:

1. `two balloons tied with a ribbon, a party hat and a few pieces of confetti`
2. `a house front door slightly open with a doormat, two small silhouettes in the doorway: an adult with a walking cane and a small child`
3. `a half-built brick wall corner with a mason's trowel and a paint roller`
4. `two stacked cardboard boxes, one sealed with tape, and a house key hanging on a tag`
5. `a small baby monitor camera next to a seated toddler playing with building blocks`
6. `a ladder leaning on a roof edge with a safety harness clipped to the top`
7. `a bucket with a mop, a pair of rubber gloves resting on the rim, and a trigger spray bottle`
8. `a calendar page with a small house on it and a check mark`

## Quando as artes chegarem (passos de quem integra)

1. Colocar os 8 arquivos em `assets/illustrations/education-pictograms/` (pasta que já está no `.gitignore` como permitida; **não criar pasta nova**, o `.gitignore` tem lista de permissão e já perdeu arquivos duas vezes).
2. Registrar cada um na tabela `LIMPAS` de `scripts/reenquadrar_acervo.js`, com o nome que o app importa: `pictogram-atividade-festas`, `-visita`, `-obras`, `-mudanca`, `-criancas`, `-altura`, `-faxina`, `-planejar`. Arte nova transparente exige `--limpo` (o modo padrão inverte a saída).
3. Rodar `node scripts/reenquadrar_acervo.js --caixa 0.73 --saida glifos` e conferir `assets/illustrations/glifos/` (1x, 2x e 3x de cada).
4. Trocar os `require` em `data/pictogramasAtividades.js` (um só lugar: a grade da página e o modal de verificação leem de lá).
5. Conferir a página no tema claro, no escuro e em 360dp, e conferir o peso final de `glifos/`.

## Procedência (pendência G de `docs/PENDENCIAS.md`)

Se a ferramenta de imagem for de IA, anotar **qual ferramenta e qual plano** foram usados. O uso comercial depende do plano contratado, e arte gerada por IA pode não ser protegível por direito autoral. A procedência das 118 ilustrações atuais ainda está em aberto com o Agnaldo.
