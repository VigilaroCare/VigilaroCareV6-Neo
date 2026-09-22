# Prompts dos pictogramas — Vigilaro Care

Para gerar as peças fora daqui (ChatGPT) mantendo a mesma linguagem visual das que saíram boas no render procedural.

---

## Como usar — leia antes

**1. Peça só o OBJETO, nunca o tile.** Os prompts abaixo pedem a peça isolada em fundo branco. O quadrado creme, o canto arredondado, a borda e a sombra são aplicados aqui por código, iguais em todas. Se cada geração desenhar o próprio tile, eles saem diferentes entre si — foi exatamente o que deixou o acervo antigo desalinhado.

**2. Anexe uma peça aprovada como referência de estilo.** Antes do primeiro prompt, suba o `vistorias-1024.png` (ou a `minha-saude-1024.png`) e escreva:

> Use esta imagem como referência de material, iluminação e acabamento. Mantenha exatamente o mesmo material e a mesma luz em tudo que eu pedir a seguir. Ignore o quadrado de fundo dela: quero apenas o objeto.

**3. Gere tudo na mesma conversa.** O modelo mantém coerência dentro de uma conversa e a perde entre conversas diferentes.

**4. Devolva os arquivos como vierem.** Eu faço o recorte do fundo, a normalização de tamanho e a composição do tile com o script que já existe. Não edite nem recorte antes.

**5. Rejeite e peça de novo se:** aparecer brilho de plástico ou reflexo molhado; a luz vier de outro canto; o traço ficar mais fino que o das peças aprovadas; aparecer sombra projetada no chão, moldura, texto ou fundo colorido.

---

## Bloco de estilo — cole em TODO prompt

Este trecho é o que mantém as oito peças na mesma família. Não altere nada dentro dele.

```
STYLE (identical for every piece):
A single ceramic pictogram, deep forest green (#14342B), isolated on a pure
flat white background, square 1:1 composition.
Material: matte ceramic with rich sculptural volume — matte in finish but
never flat. Softly rounded, generous bevels. A wide, gentle light catch along
the upper bevel edges. Soft ambient occlusion pooling where shapes meet and
inside every recess. No gloss, no wet look, no varnish, no mirror reflection,
no sharp white specular dots.
Lighting: one soft key light from the upper left at about 35 degrees, with a
clear falloff to a deeper shadow side at the lower right; a dim fill from the
right so the shadow side keeps detail.
Form: uniform stroke weight throughout, roughly 12% of the canvas width; every
detail thick enough to stay legible when the image is reduced to 170 px.
Framing: object centered with about 12% margin on all sides. Plain white
background everywhere — no tile, no card, no frame, no border, no drop shadow
on the ground, no text, no logo, no colored fog, no vignette.
```

---

## As oito peças da Home

A descrição de cada uma reproduz o desenho **que já existe** no app. Não é para melhorar o símbolo: fidelidade ao motivo é o requisito.

### 1. Atividades Eventuais — PRIORIDADE
> SUBJECT: The outline of a house drawn in thick strokes — a single-slope roof whose ridge sits toward the right, a left wall, a floor line and a right wall. Inside the house, on the left, a tall window divided into two stacked panes. On the right, a door drawn as a rectangle open at the bottom. In the centre, a claw hammer crossed with a flat screwdriver forming an X: the hammer head with its claw is at the upper left and its handle runs down to the lower right; the screwdriver tip is at the lower left and its handle at the upper right. The tools sit fully inside the house and do not touch the roof.

### 2. Cuidar e Proteger — PRIORIDADE
> SUBJECT: Two open cupped hands, seen from the front, rising from the bottom left and bottom right and curving inward as if holding something precious. Between and above them, a family of three simple pictogram figures: two adults and a smaller child standing between them. Above the family, the outline of a house roof — two slopes meeting at a ridge, with a short eave dropping at each end. The hands do not touch the figures.

### 3. Vistorias
> SUBJECT: A bold check mark inside an open ring. The ring has a gap at the upper right where the long arm of the check passes over it. Both the ring ends and the check ends are rounded.

### 4. Minha Saúde
> SUBJECT: A single continuous heartbeat ECG pulse line running horizontally across the frame, with one tall peak and one deep valley at the centre, and flat rounded ends on both sides.

### 5. Info Rótulos
> SUBJECT: A barcode of nine thick vertical bars with rounded ends, framed by four camera viewfinder corner brackets, one at each corner of the composition.

### 6. Scanner de Ambiente
> SUBJECT: A simple architectural floor plan — thick walls forming a few rooms, with gaps left between wall segments to represent doorways, and one long horizontal wall crossing the plan and extending slightly beyond it on both sides. The plan is framed by four camera viewfinder corner brackets, one at each corner.

### 7. Modo Viagem
> SUBJECT: An upright hard-shell rolling suitcase standing on two small feet, with a rounded top handle and two vertical grooves engraved into the shell, dividing its face into three panels. The grooves are recessed into the material, not drawn on top of it.

### 8. Saúde Pet
> SUBJECT: An animal paw print — four oval toe pads above one large rounded main pad — with a heartbeat ECG pulse line engraved into the main pad. The pulse line is recessed into the material, not drawn on top of it.

---

## Como montar o prompt

Cole na ordem: o **bloco de estilo**, depois a linha **SUBJECT** da peça. Nada mais. Exemplo do que vai para o modelo:

```
STYLE (identical for every piece):
[...bloco completo...]

SUBJECT: The outline of a house drawn in thick strokes — [...]
```

---

## Quando quiser peças de outras famílias

O mesmo bloco de estilo serve para as 110 restantes (Educação, Viagem, Menu). Só troque a linha SUBJECT, descrevendo **o desenho que já está no arquivo atual**, não uma ideia nova. Abra o PNG atual, descreva o que vê, e mantenha o resto idêntico.
