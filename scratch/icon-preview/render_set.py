"""Conjunto das 4 abas no estilo 'eco do tile' + glifo contemporaneo fino.
Inicio (casa duas-aguas, aprovada), Educacao (capelo), Relatorio (prancheta),
Menu (grade 2x2 = grade de tiles). Estados ativo/inativo + tamanho real 28px."""
from PIL import Image, ImageDraw, ImageFont

SS = 4
W, H = 560, 640
GRAY = (107, 114, 128, 255)
GREEN = (30, 122, 79, 255)
BG = (244, 251, 250, 255)


# s ja inclui o supersampling (s = scale_real * SS)
def P(ox, oy, s, x, y):
    return (ox * SS + x * s, oy * SS + y * s)


def dot(d, pt, r, color):
    d.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], fill=color)


def stroke_poly(d, ox, oy, s, pts, color, sw, closed):
    w = max(1, int(sw * s))
    seq = pts + ([pts[0]] if closed else [])
    pp = [P(ox, oy, s, x, y) for (x, y) in seq]
    for i in range(len(pp) - 1):
        d.line([pp[i], pp[i + 1]], fill=color, width=w)
    for pt in pp:
        dot(d, pt, w / 2, color)


def fill_poly(d, ox, oy, s, pts, color):
    d.polygon([P(ox, oy, s, x, y) for (x, y) in pts], fill=color)


def rrect(d, ox, oy, s, box, color, fill, sw):
    x0, y0, x1, y1, rad = box
    c = [P(ox, oy, s, x0, y0)[0], P(ox, oy, s, x0, y0)[1],
         P(ox, oy, s, x1, y1)[0], P(ox, oy, s, x1, y1)[1]]
    if fill:
        d.rounded_rectangle(c, radius=rad * s, fill=color)
    else:
        d.rounded_rectangle(c, radius=rad * s, outline=color, width=max(1, int(sw * s)))


def thick_line(d, ox, oy, s, a, b, color, sw):
    w = max(1, int(sw * s))
    pa, pb = P(ox, oy, s, *a), P(ox, oy, s, *b)
    d.line([pa, pb], fill=color, width=w)
    dot(d, pa, w / 2, color)
    dot(d, pb, w / 2, color)


def tile(d, ox, oy, s, color):
    rrect(d, ox, oy, s, (20, 20, 236, 236, 58), color, False, 10)


def g_home(d, ox, oy, s, color, active):
    BODY = [(70, 126), (150, 80), (188, 102), (188, 184), (70, 184)]
    if active:
        fill_poly(d, ox, oy, s, BODY, color)
    stroke_poly(d, ox, oy, s, [(70, 126), (70, 184), (188, 184), (188, 102)], color, 12, False)
    stroke_poly(d, ox, oy, s, [(50, 138), (150, 80), (206, 112)], color, 13, False)


def g_edu(d, ox, oy, s, color, active):
    board = [(56, 114), (128, 90), (200, 114), (128, 138)]
    capbase = [(106, 132), (112, 158), (144, 158), (150, 132)]
    if active:
        fill_poly(d, ox, oy, s, capbase, color)
        fill_poly(d, ox, oy, s, board, color)
    stroke_poly(d, ox, oy, s, capbase, color, 12, True)
    stroke_poly(d, ox, oy, s, board, color, 12, True)
    thick_line(d, ox, oy, s, (198, 116), (198, 152), color, 10)
    dot(d, P(ox, oy, s, 198, 158), 8 * s, color)


def g_report(d, ox, oy, s, color, active):
    lines = [((96, 118), (160, 118)), ((96, 140), (160, 140)), ((96, 162), (138, 162))]
    if active:
        rrect(d, ox, oy, s, (78, 82, 178, 186, 16), color, True, 0)
        rrect(d, ox, oy, s, (108, 66, 148, 92, 8), color, True, 0)
        for a, b in lines:
            thick_line(d, ox, oy, s, a, b, BG, 11)
    else:
        rrect(d, ox, oy, s, (78, 82, 178, 186, 16), color, False, 12)
        rrect(d, ox, oy, s, (108, 66, 148, 92, 8), color, False, 12)
        for a, b in lines:
            thick_line(d, ox, oy, s, a, b, color, 11)


def g_menu(d, ox, oy, s, color, active):
    for (x, y) in [(72, 72), (136, 72), (72, 136), (136, 136)]:
        rrect(d, ox, oy, s, (x, y, x + 48, y + 48, 12), color, active, 12)


GLYPHS = [("Inicio", g_home), ("Educacao", g_edu),
          ("Relatorio", g_report), ("Menu", g_menu)]

img = Image.new('RGBA', (W * SS, H * SS), BG)
d = ImageDraw.Draw(img)


def cell(ox, oy, scale, color, active, fn):
    s = scale * SS
    tile(d, ox, oy, s, color)
    fn(d, ox, oy, s, color, active)


for i, (label, fn) in enumerate(GLYPHS):
    y = 24 + i * 150
    cell(86, y, 0.50, GRAY, False, fn)
    cell(220, y, 0.50, GREEN, True, fn)
    cell(388, y + 38, 0.115, GRAY, False, fn)
    cell(444, y + 38, 0.115, GREEN, True, fn)

img = img.resize((W, H), Image.LANCZOS)
d2 = ImageDraw.Draw(img)
try:
    f1 = ImageFont.truetype("arialbd.ttf", 17)
    f2 = ImageFont.truetype("arial.ttf", 11)
except Exception:
    f1 = f2 = ImageFont.load_default()
for i, (label, fn) in enumerate(GLYPHS):
    y = 24 + i * 150
    d2.text((20, y + 56), label, font=f1, fill=(45, 45, 45))
    d2.text((392, y + 8), "real 28px", font=f2, fill=GRAY[:3])
img.convert('RGB').save("set.png")
print("OK")
