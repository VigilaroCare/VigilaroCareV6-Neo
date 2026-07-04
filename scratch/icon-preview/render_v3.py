"""Casa duas-aguas assimetrica (cumeeira deslocada), no estilo do pictograma
Atividades Eventuais. Variante limpa vs com janela. Estados ativo/inativo."""
from PIL import Image, ImageDraw, ImageFont

SS = 4
W, H = 560, 470
GRAY = (107, 114, 128, 255)
GREEN = (30, 122, 79, 255)
BG = (244, 251, 250, 255)
CARD = (255, 255, 255, 255)
EDGE = (230, 232, 230, 255)

APEX = (150, 80)
ROOF_L = [(50, 138), APEX]      # agua longa (esquerda)
ROOF_R = [APEX, (206, 112)]     # agua curta (direita)
LWALL = [(70, 126), (70, 184)]
RWALL = [(188, 102), (188, 184)]
FLOOR = [(70, 184), (188, 184)]
BODY = [(70, 126), APEX, (188, 102), (188, 184), (70, 184)]
WINDOW = [90, 134, 108, 174]    # janela vertical (parede esquerda, alta)


def P(ox, oy, s, x, y):
    return (ox * SS + x * s, oy * SS + y * s)


def dot(d, pt, r, color):
    d.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], fill=color)


def draw_house(d, ox, oy, scale, color, active, window=False):
    s = scale * SS
    sw = max(1, int(16 * s))
    rw = max(1, int(17 * s))
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
    if window:
        x0, y0, x1, y1 = WINDOW
        rect = [P(ox, oy, s, x0, y0)[0], P(ox, oy, s, x0, y0)[1],
                P(ox, oy, s, x1, y1)[0], P(ox, oy, s, x1, y1)[1]]
        if active:
            d.rectangle(rect, fill=BG)
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


tile_and_house(40, 60, 0.40, GREEN, True, False)
tile_and_house(40, 200, 0.40, GRAY, False, False)
tile_and_house(300, 60, 0.40, GREEN, True, True)
tile_and_house(300, 200, 0.40, GRAY, False, True)
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


ctext(150, 24, "duas aguas - limpa", f1, (45, 45, 45))
ctext(410, 24, "duas aguas - janela", f1, (45, 45, 45))
ctext(150, 168, "ativo / inativo", f2, GRAY[:3])
ctext(410, 168, "ativo / inativo", f2, GRAY[:3])
ctext(280, 354, "— tamanho real ~28px (limpa  |  janela) —", f2, GRAY[:3])
img.convert('RGB').save("inicio_v3.png")
print("OK")
