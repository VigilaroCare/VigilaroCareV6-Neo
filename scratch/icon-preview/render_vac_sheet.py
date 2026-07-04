"""Folha de revisao: 5 fotos finais de Ferias (safety_vacation) + rotulo."""
from PIL import Image, ImageDraw, ImageFont

ITEMS = [
    ("Na Estrada", "vac_4473498.jpg"),
    ("Praia e Piscina", "vac_5649993.jpg"),
    ("Hotel e Pousada", "vac_18703869.jpg"),
    ("Crianca Perdida", "vac_8765841.jpg"),
    ("Kit Viagem", "vac_5673523.jpg"),
]
IMW, IMH, GAP, LBL = 232, 132, 16, 26
COLS = 2
rows = (len(ITEMS) + COLS - 1) // COLS
W = COLS * IMW + (COLS + 1) * GAP
H = 40 + rows * (IMH + LBL + GAP) + GAP
BG = (244, 246, 245)


def cover(im, w, h):
    sr, tr = im.width / im.height, w / h
    if sr > tr:
        nw = int(im.height * tr); im = im.crop(((im.width - nw) // 2, 0, (im.width - nw) // 2 + nw, im.height))
    else:
        nh = int(im.width / tr); im = im.crop((0, (im.height - nh) // 2, im.width, (im.height - nh) // 2 + nh))
    return im.resize((w, h), Image.LANCZOS)


img = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(img)
try:
    ft = ImageFont.truetype("arialbd.ttf", 16)
    fl = ImageFont.truetype("arialbd.ttf", 13)
except Exception:
    ft = fl = ImageFont.load_default()
d.text((GAP, 12), "Ferias — 5 fotos curadas (revisar/vetar)", font=ft, fill=(30, 60, 45))

for i, (label, fname) in enumerate(ITEMS):
    r, c = divmod(i, COLS)
    x = GAP + c * (IMW + GAP)
    y = 40 + r * (IMH + LBL + GAP)
    try:
        ph = cover(Image.open(fname).convert("RGB"), IMW, IMH)
        img.paste(ph, (x, y))
    except Exception as e:
        d.rectangle([x, y, x + IMW, y + IMH], fill=(220, 220, 220))
        d.text((x + 8, y + 8), "?", font=ft, fill=(120, 120, 120))
    d.rounded_rectangle([x, y, x + IMW, y + IMH], radius=1, outline=(210, 214, 212), width=1)
    d.text((x + 2, y + IMH + 5), label, font=fl, fill=(40, 50, 45))

img.save("vac_sheet.png")
print("OK")
