"""Antes/depois do rodape do card de regras aereas (FazendoAsMalas):
aviso de seguranca saindo da fonte miuda para um callout em destaque."""
from PIL import Image, ImageDraw, ImageFont

SS = 3
W, H = 560, 430
PAGE = (242, 242, 247)
CARD = (255, 255, 255)
LINE = (229, 229, 234)
FAINT = (124, 138, 128)     # neutral[500]
INK = (56, 71, 63)          # neutral[800]
CHAMP = (161, 98, 7)
CHAMP_BG = (245, 239, 230)  # champagne 10% sobre branco


def font(sz, bold=False):
    try:
        return ImageFont.truetype("arialbd.ttf" if bold else "arial.ttf", int(sz * SS))
    except Exception:
        return ImageFont.load_default()


def wrap(d, text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=f) <= maxw:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_lines(d, x, y, lines, f, fill, lh):
    for ln in lines:
        d.text((x, y), ln, font=f, fill=fill)
        y += lh
    return y


img = Image.new('RGB', (W * SS, H * SS), PAGE)
d = ImageDraw.Draw(img)

flabel = font(12, True)
ffaint = font(10.5)
fdisc = font(12.5, True)

SOURCE_FULL = "Fonte: ANAC · IATA · vigente em jun/2026. As regras mudam — confirme com a sua companhia antes de viajar."
SOURCE_ONLY = "Fonte: ANAC · IATA · vigente em jun/2026."
DISC = "As regras de viagem e os limites de bagagem mudam com frequencia. Confirme sempre com a sua companhia aerea — e, em viagem internacional, com o consulado — antes de viajar."

# ---------- ANTES ----------
d.text((20 * SS, 14 * SS), "ANTES — aviso afogado na fonte (10.5px cinza)", font=flabel, fill=(90, 90, 96))
cx, cy, cw, ch = 20 * SS, 36 * SS, 520 * SS, 130 * SS
d.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=14 * SS, fill=CARD, outline=LINE, width=SS)
d.line([cx + 16 * SS, cy + 20 * SS, cx + cw - 16 * SS, cy + 20 * SS], fill=LINE, width=SS)
lines = wrap(d, SOURCE_FULL, ffaint, cw - 32 * SS)
draw_lines(d, cx + 16 * SS, cy + 32 * SS, lines, ffaint, FAINT, 16 * SS)

# ---------- DEPOIS ----------
oy = 200
d.text((20 * SS, oy * SS), "DEPOIS — fonte miuda + aviso em DESTAQUE", font=flabel, fill=(90, 90, 96))
cx, cy, cw, ch = 20 * SS, (oy + 22) * SS, 520 * SS, 168 * SS
d.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=14 * SS, fill=CARD, outline=LINE, width=SS)
d.line([cx + 16 * SS, cy + 18 * SS, cx + cw - 16 * SS, cy + 18 * SS], fill=LINE, width=SS)
draw_lines(d, cx + 16 * SS, cy + 28 * SS, wrap(d, SOURCE_ONLY, ffaint, cw - 32 * SS), ffaint, FAINT, 16 * SS)

# callout champagne
bx, by = cx + 16 * SS, cy + 56 * SS
bw, bh = cw - 32 * SS, 96 * SS
d.rounded_rectangle([bx, by, bx + bw, by + bh], radius=12 * SS, fill=CHAMP_BG)
d.rectangle([bx, by + 6 * SS, bx + 3 * SS, by + bh - 6 * SS], fill=CHAMP)  # acento lateral
# icone "i"
icx, icy = bx + 20 * SS, by + 20 * SS
d.ellipse([icx - 9 * SS, icy - 9 * SS, icx + 9 * SS, icy + 9 * SS], outline=CHAMP, width=2 * SS)
d.ellipse([icx - 1.5 * SS, icy - 6 * SS, icx + 1.5 * SS, icy - 3 * SS], fill=CHAMP)
d.rounded_rectangle([icx - 1.5 * SS, icy - 1 * SS, icx + 1.5 * SS, icy + 5 * SS], radius=1 * SS, fill=CHAMP)
draw_lines(d, bx + 38 * SS, by + 12 * SS, wrap(d, DISC, fdisc, bw - 50 * SS), fdisc, INK, 17 * SS)

img = img.resize((W, H), Image.LANCZOS)
img.save("disclaimer.png")
print("OK")
