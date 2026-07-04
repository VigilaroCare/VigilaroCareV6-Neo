"""Casa contemporanea (telhado mono-agua assimetrico) p/ o icone Inicio.
Duas variantes: limpa vs com janela vertical. Estados ativo/inativo."""
from PIL import Image, ImageDraw, ImageFont

SS = 4
W, H = 560, 470
GRAY = (107, 114, 128, 255)
GREEN = (30, 122, 79, 255)
BG = (244, 251, 250, 255)
CARD = (255, 255, 255, 255)
EDGE = (230, 232, 230, 255)

# telhado mono-agua (lado alto = direita), com leve beiral nas duas pontas
ROOF = [(50, 142), (208, 86)]
LWALL = [(66, 140), (66, 186)]
RWALL = [(190, 98), (190, 186)]
FLOOR = [(66, 186), (190, 186)]
BODY = [(66, 140), (190, 98), (190, 186), (66, 186)]
WINDOW = [150, 116, 170, 158]  # x0,y0,x1,y1 (vertical, lado alto)


def P(ox, oy, s, x, y):
    return (ox * SS + x * s, oy * SS + y * s)


def draw_house(d, ox, oy, scale, color, active, window=False):
    s = scale * SS
    sw = max(1, int(16 * s))
    rw = max(1, int(17 * s))
    if active:
        d.polygon([P(ox, oy, s, x, y) for (x, y) in BODY], fill=color)
    # paredes + piso
    for seg in (LWALL, RWALL, FLOOR):
        d.line([P(ox, oy, s, *seg[0]), P(ox, oy, s, *seg[1])], fill=color,
               width=sw)
    # telhado (barra inclinada, pontas arredondadas)
    a, b = P(ox, oy, s, *ROOF[0]), P(ox, oy, s, *ROOF[1])
    d.line([a, b], fill=color, width=rw)
    for pt in (a, b):
        r = rw / 2
        d.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], fill=color)
    # juntas paredes
    for v in (LWALL[0], RWALL[0], LWALL[1], RWALL[1]):
        pt = P(ox, oy, s, *v)
        r = sw / 2
        d.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], fill=color)
    if window:
        x0, y0, x1, y1 = WINDOW
        box = [P(ox, oy, s, x0, y0), P(ox, oy, s, x1, y1)]
        rect = [box[0][0], box[0][1], box[1][0], box[1][1]]
        if active:
            d.rectangle(rect, fill=BG)  # vazado (na barra: evenodd no SVG real)
        else:
            d.rectangle(rect, outline=color, width=max(1, int(9 * s)))


img = Image.new('RGBA', (W * SS, H * SS), BG)
d = ImageDraw.Draw(img)
d.rounded_rectangle([60 * SS, 372 * SS, 500 * SS, 452 * SS], radius=16 * SS,
                    fill=CARD, outline=EDGE, width=SS)


def tile_and_house(ox, oy, scale, color, active, window):
    s = scale * SS
    d.rounded_rectangle([P(ox, oy, s, 20, 20)[0], P(ox, oy, s, 20, 20)[1],
                         P(ox, oy, s, 236, 236)[0], P(ox, oy, s, 236, 236)[1]],
                        radius=58 * s, outline=color, width=max(1, int(13 * s)))
    draw_house(d, ox, oy, scale, color, active, window)


# V1 limpa | V2 com janela  (col esquerda / direita)
tile_and_house(40, 60, 0.40, GREEN, True, False)
tile_and_house(40, 200, 0.40, GRAY, False, False)
tile_and_house(300, 60, 0.40, GREEN, True, True)
tile_and_house(300, 200, 0.40, GRAY, False, True)
# 28px
tile_and_house(150, 382, 0.109, GRAY, False, False)
tile_and_house(220, 382, 0.109, GREEN, True, False)
tile_and_house(330, 382, 0.109, GRAY, False, True)
tile_and_house(400, 382, 0.109, GREEN, True, True)

img = img.resize((W, H), Image.LANCZOS)
d2 = ImageDraw.Draw(img)
try:
    f1 = ImageFont.truetype("arialbd.ttf", 19)
    f2 = ImageFont.truetype("arial.ttf", 13)
except Exception:
    f1 = f2 = ImageFont.load_default()


def ctext(x, y, t, f, c):
    w = d2.textlength(t, font=f)
    d2.text((x - w / 2, y), t, font=f, fill=c)


ctext(150, 24, "V1 — limpa", f1, (45, 45, 45))
ctext(410, 24, "V2 — com janela", f1, (45, 45, 45))
ctext(150, 168, "ativo / inativo", f2, GRAY[:3])
ctext(410, 168, "ativo / inativo", f2, GRAY[:3])
ctext(280, 354, "— tamanho real ~28px (V1  |  V2) —", f2, GRAY[:3])
img.convert('RGB').save("inicio_v2.png")
print("OK")
