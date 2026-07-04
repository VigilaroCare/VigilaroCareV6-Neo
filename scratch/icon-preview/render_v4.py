"""Duas-aguas limpa em 3 pesos de traco, p/ escolher a espessura."""
from PIL import Image, ImageDraw, ImageFont

SS = 4
W, H = 660, 470
GRAY = (107, 114, 128, 255)
GREEN = (30, 122, 79, 255)
BG = (244, 251, 250, 255)
CARD = (255, 255, 255, 255)
EDGE = (230, 232, 230, 255)

APEX = (150, 80)
ROOF_L = [(50, 138), APEX]
ROOF_R = [APEX, (206, 112)]
LWALL = [(70, 126), (70, 184)]
RWALL = [(188, 102), (188, 184)]
FLOOR = [(70, 184), (188, 184)]
BODY = [(70, 126), APEX, (188, 102), (188, 184), (70, 184)]

# (label, house_sw, tile_sw)
WEIGHTS = [("atual (16/13)", 16, 13), ("fino (12/10)", 12, 10),
           ("extrafino (10/9)", 10, 9)]


def P(ox, oy, s, x, y):
    return (ox * SS + x * s, oy * SS + y * s)


def dot(d, pt, r, color):
    d.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], fill=color)


def draw_house(d, ox, oy, scale, color, active, hsw):
    s = scale * SS
    sw = max(1, int(hsw * s))
    rw = max(1, int((hsw + 1) * s))
    if active:
        d.polygon([P(ox, oy, s, x, y) for (x, y) in BODY], fill=color)
    for seg in (LWALL, RWALL, FLOOR):
        d.line([P(ox, oy, s, *seg[0]), P(ox, oy, s, *seg[1])], fill=color, width=sw)
    for roof in (ROOF_L, ROOF_R):
        a, b = P(ox, oy, s, *roof[0]), P(ox, oy, s, *roof[1])
        d.line([a, b], fill=color, width=rw)
        dot(d, a, rw / 2, color)
        dot(d, b, rw / 2, color)
    for v in (LWALL[0], RWALL[0], LWALL[1], RWALL[1], APEX):
        dot(d, P(ox, oy, s, *v), sw / 2, color)


img = Image.new('RGBA', (W * SS, H * SS), BG)
d = ImageDraw.Draw(img)
d.rounded_rectangle([40 * SS, 372 * SS, 620 * SS, 452 * SS], radius=16 * SS,
                    fill=CARD, outline=EDGE, width=SS)


def tile_and_house(ox, oy, scale, color, active, hsw, tsw):
    s = scale * SS
    d.rounded_rectangle([P(ox, oy, s, 20, 20)[0], P(ox, oy, s, 20, 20)[1],
                         P(ox, oy, s, 236, 236)[0], P(ox, oy, s, 236, 236)[1]],
                        radius=58 * s, outline=color, width=max(1, int(tsw * s)))
    draw_house(d, ox, oy, scale, color, active, hsw)


cols = [40, 240, 440]
for (cx, (label, hsw, tsw)) in zip(cols, WEIGHTS):
    tile_and_house(cx, 56, 0.40, GRAY, False, hsw, tsw)      # inativo grande
    tile_and_house(cx + 100, 56, 0.40, GREEN, True, hsw, tsw)  # ativo grande
    tile_and_house(cx + 30, 384, 0.109, GRAY, False, hsw, tsw)
    tile_and_house(cx + 95, 384, 0.109, GREEN, True, hsw, tsw)

img = img.resize((W, H), Image.LANCZOS)
d2 = ImageDraw.Draw(img)
try:
    f1 = ImageFont.truetype("arialbd.ttf", 18)
    f2 = ImageFont.truetype("arial.ttf", 12)
except Exception:
    f1 = f2 = ImageFont.load_default()


def ctext(x, y, t, f, c):
    w = d2.textlength(t, font=f)
    d2.text((x - w / 2, y), t, font=f, fill=c)


for (cx, (label, hsw, tsw)) in zip(cols, WEIGHTS):
    ctext(cx + 100, 24, label, f1, (45, 45, 45))
ctext(330, 200, "inativo  |  ativo  (grande)", f2, GRAY[:3])
ctext(330, 354, "— tamanho real ~28px (inativo | ativo por peso) —", f2, GRAY[:3])
img.convert('RGB').save("inicio_v4.png")
print("OK")
