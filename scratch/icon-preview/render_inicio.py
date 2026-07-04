"""Render do HomeTileIcon via PIL (aproximacao p/ vistoria do conceito).
Nao e o render exato do react-native-svg (juntas arredondadas sao fakeadas
com circulos nos vertices), mas serve p/ julgar proporcao + legibilidade."""
from PIL import Image, ImageDraw, ImageFont

SS = 4  # supersampling
W, H = 560, 330
GRAY = (107, 114, 128, 255)
GREEN = (30, 122, 79, 255)
BG = (244, 251, 250, 255)
CARD = (255, 255, 255, 255)
EDGE = (230, 232, 230, 255)

HOUSE = [(128, 80), (182, 126), (182, 180), (74, 180), (74, 126)]


def draw_icon(d, ox, oy, scale, color, active):
    s = scale * SS
    bx, by = ox * SS, oy * SS
    # tile (rounded rect, sempre contorno)
    x0, y0 = bx + 20 * s, by + 20 * s
    x1, y1 = bx + 236 * s, by + 236 * s
    d.rounded_rectangle([x0, y0, x1, y1], radius=58 * s,
                        outline=color, width=max(1, int(13 * s)))
    pts = [(bx + x * s, by + y * s) for (x, y) in HOUSE]
    sw = 16 * s
    if active:
        d.polygon(pts, fill=color)
    # contorno da casa com juntas arredondadas (circulos nos vertices)
    closed = pts + [pts[0]]
    for i in range(len(closed) - 1):
        d.line([closed[i], closed[i + 1]], fill=color, width=max(1, int(sw)))
    r = sw / 2
    for (px, py) in pts:
        d.ellipse([px - r, py - r, px + r, py + r], fill=color)


img = Image.new('RGBA', (W * SS, H * SS), BG)
d = ImageDraw.Draw(img)

# strip do "tamanho real"
d.rounded_rectangle([120 * SS, 262 * SS, 440 * SS, 318 * SS], radius=14 * SS,
                    fill=CARD, outline=EDGE, width=SS)

# grandes
draw_icon(d, 86, 58, 0.586, GRAY, False)
draw_icon(d, 326, 58, 0.586, GREEN, True)
# tamanho real ~28px
draw_icon(d, 150, 272, 0.109, GRAY, False)
draw_icon(d, 330, 272, 0.109, GREEN, True)

img = img.resize((W, H), Image.LANCZOS)

# textos (sem supersample)
d2 = ImageDraw.Draw(img)
try:
    f1 = ImageFont.truetype("arialbd.ttf", 20)
    f2 = ImageFont.truetype("arial.ttf", 13)
    f3 = ImageFont.truetype("arial.ttf", 11)
except Exception:
    f1 = f2 = f3 = ImageFont.load_default()


def ctext(x, y, t, f, c):
    w = d2.textlength(t, font=f)
    d2.text((x - w / 2, y), t, font=f, fill=c)


ctext(160, 26, "INATIVO (cinza)", f1, (45, 45, 45))
ctext(400, 26, "ATIVO (verde)", f1, (45, 45, 45))
ctext(280, 244, "— tamanho real no menu (~28px) —", f2, GRAY[:3])
ctext(178, 304, "Inicio", f3, GRAY[:3])
ctext(358, 304, "Inicio", f3, GREEN[:3])

img.convert('RGB').save("inicio.png")
print("OK")
