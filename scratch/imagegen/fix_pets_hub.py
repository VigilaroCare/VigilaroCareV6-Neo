# Converte o pictogram-pets-hub (tile 4:3 da Home) no formato quadrado padrão
# do Hub SEM distorcer a pata: 9-slice vertical — estica apenas as faixas de
# creme vazias entre a moldura e o símbolo. Pata e moldura ficam intactas.
import os
from PIL import Image

BASE = r"c:\Users\User\Documents\VigilaroCareV6 Neo"
ASSETS = os.path.join(BASE, "assets", "illustrations", "education-pictograms")
SRC = os.path.join(ASSETS, "pictogram-pets-hub.png")
REF = os.path.join(ASSETS, "pictogram-condo-safety.png")

ref = Image.open(REF).convert("RGBA")
rbb = ref.getchannel("A").getbbox()
RW, RH = ref.size
TW, TH = rbb[2] - rbb[0], rbb[3] - rbb[1]  # 428x436

img = Image.open(SRC).convert("RGBA")
bb = img.getchannel("A").getbbox()
content = img.crop(bb)

# 1. Escala uniforme até a largura padrão (moldura mantém proporção)
scale = TW / content.size[0]
w = TW
h = round(content.size[1] * scale)
content = content.resize((w, h), Image.LANCZOS)
extra = TH - h
print(f"conteudo 4:3 escalado: {w}x{h}; falta {extra}px de altura")

# 2. Mapear faixas escuras (moldura sup., pata, moldura inf.) nas colunas
#    centrais — os vãos entre elas são o creme esticável
px = content.load()
dark_rows = []
x0, x1 = int(w * 0.30), int(w * 0.70)
for y in range(h):
    dark = False
    for x in range(x0, x1, 3):
        r, g, b, a = px[x, y]
        if a > 200 and r + g + b < 330:  # verde forest escuro
            dark = True
            break
    dark_rows.append(dark)

# agrupar segmentos escuros
segs = []
start = None
for y, d in enumerate(dark_rows):
    if d and start is None:
        start = y
    elif not d and start is not None:
        segs.append((start, y - 1))
        start = None
if start is not None:
    segs.append((start, h - 1))

# funde segmentos separados por <12px (o filete de specular no meio do tubo
# da moldura divide a faixa escura em duas)
merged = [segs[0]]
for a, b in segs[1:]:
    if a - merged[-1][1] < 12:
        merged[-1] = (merged[-1][0], b)
    else:
        merged.append((a, b))
segs = merged
print("segmentos escuros (moldura/pata):", segs)
assert len(segs) >= 3, "esperava moldura-pata-moldura"

frame_top_end = segs[0][1]
paw_start, paw_end = segs[1][0], segs[-2][1] if len(segs) > 3 else segs[1][1]
# se a pata gerar mais de um segmento (dedos), funde tudo entre 1º e último
paw_start = segs[1][0]
paw_end = segs[-2][1]
frame_bot_start = segs[-1][0]

m = 6  # margem de segurança ao redor da pata e da moldura
gap1 = (frame_top_end + m, paw_start - m)   # creme acima da pata
gap2 = (paw_end + m, frame_bot_start - m)   # creme abaixo da pata
print(f"vaos creme: {gap1} ({gap1[1]-gap1[0]}px), {gap2} ({gap2[1]-gap2[0]}px)")

add1 = extra // 2
add2 = extra - add1

def vstretch(im, y_a, y_b, add):
    """Estica a faixa [y_a, y_b] em +add px, resto intacto."""
    W, H = im.size
    top = im.crop((0, 0, W, y_a))
    band = im.crop((0, y_a, W, y_b)).resize((W, (y_b - y_a) + add), Image.LANCZOS)
    bot = im.crop((0, y_b, W, H))
    out = Image.new("RGBA", (W, H + add), (0, 0, 0, 0))
    out.paste(top, (0, 0))
    out.paste(band, (0, y_a))
    out.paste(bot, (0, y_a + band.size[1]))
    return out

content = vstretch(content, gap1[0], gap1[1], add1)
content = vstretch(content, gap2[0] + add1, gap2[1] + add1, add2)
print("final:", content.size, "alvo:", (TW, TH))

canvas = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))
canvas.paste(content, ((RW - TW) // 2, (RH - TH) // 2), content)
canvas.save(SRC, optimize=True)
print(f"salvo: {SRC} ({os.path.getsize(SRC)/1024:.0f} KB)")
