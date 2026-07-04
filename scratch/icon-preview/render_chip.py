"""Antes/depois do chip de moradia ativa sobre o fundo sage da home."""
from PIL import Image, ImageDraw, ImageFont

SS = 3
W, H = 560, 230
SAGE = (239, 245, 240)   # mist fallback #EFF5F0


def house(d, cx, cy, s, color):
    # casinha cheia ~ icone 14
    pts = [(cx, cy - 8 * s), (cx + 8 * s, cy - 1 * s), (cx + 8 * s, cy + 7 * s),
           (cx - 8 * s, cy + 7 * s), (cx - 8 * s, cy - 1 * s)]
    d.polygon(pts, fill=color)


def chip(d, x, y, text, bg, border, txt, icon, font, s):
    pad = 11 * s
    gap = 6 * s
    ico = 16 * s
    tw = d.textlength(text, font=font)
    h = 32 * s
    w = pad + ico + gap + tw + pad
    d.rounded_rectangle([x, y, x + w, y + h], radius=h / 2, fill=bg,
                        outline=border, width=max(1, int(1 * s)))
    house(d, x + pad + ico / 2, y + h / 2, s, icon)
    d.text((x + pad + ico + gap, y + h / 2), text, font=font, fill=txt, anchor="lm")
    return w


img = Image.new('RGB', (W * SS, H * SS), SAGE)
d = ImageDraw.Draw(img)
try:
    fb = ImageFont.truetype("arialbd.ttf", 13 * SS)
    fl = ImageFont.truetype("arial.ttf", 12 * SS)
except Exception:
    fb = fl = ImageFont.load_default()

d.text((40 * SS, 36 * SS), "ANTES  (glass.light — some no sage)", font=fl, fill=(90, 100, 92))
chip(d, 40 * SS, 58 * SS, "Minha Casa Principal",
     (245, 248, 246), (205, 203, 201), (6, 95, 70), (4, 120, 87), fb, SS)

d.text((40 * SS, 138 * SS), "DEPOIS  (tom de marca — presente, sem exagerar)", font=fl, fill=(90, 100, 92))
chip(d, 40 * SS, 160 * SS, "Minha Casa Principal",
     (209, 250, 229), (167, 243, 208), (6, 95, 70), (4, 120, 87), fb, SS)

img = img.resize((W, H), Image.LANCZOS)
img.save("chip.png")
print("OK")
