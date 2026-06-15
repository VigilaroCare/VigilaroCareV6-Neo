# Conserto 2026-06-15: teoria-fogo e scanner-ambiente vieram 1254x1254 com FUNDO
# BRANCO OPACO (não passaram pelo normalizador) -> quadrado branco no app.
# Mesmo pipeline do normalize_lote2: floodfill branco->alpha (cantos, thresh 24)
# -> crop bbox -> resize p/ bbox da REF (condo-safety) -> paste centrado em canvas
# transparente do tamanho da REF (480x489). Salva com NOMES NOVOS (cache-bust do
# Metro: sobrescrever o mesmo caminho prendeu o scanner no cache). Originais em
# alta backupados em raw-fix-0615/.
import os, shutil
from PIL import Image, ImageDraw

BASE = r"c:\Users\User\Documents\VigilaroCareV6 Neo"
EDU = os.path.join(BASE, "assets", "illustrations", "education-pictograms")
HOME = os.path.join(BASE, "assets", "illustrations", "home-pictograms")
RAW = os.path.join(BASE, "scratch", "imagegen", "raw-fix-0615")
os.makedirs(RAW, exist_ok=True)
REF = os.path.join(EDU, "pictogram-condo-safety.png")
THRESH = 24

def alpha_bbox(img):
    return img.getchannel("A").getbbox()

def white_to_alpha(img):
    rgba = img.convert("RGBA")
    work = rgba.copy()
    sent = (255, 0, 255, 255)
    w, h = work.size
    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        try:
            ImageDraw.floodfill(work, corner, sent, thresh=THRESH)
        except Exception:
            pass
    src = rgba.load(); dst = work.load()
    out = Image.new("RGBA", (w, h)); op = out.load()
    for y in range(h):
        for x in range(w):
            op[x, y] = (0, 0, 0, 0) if dst[x, y] == sent else src[x, y]
    return out

ref = Image.open(REF).convert("RGBA")
rw, rh = ref.size
rbb = alpha_bbox(ref)
rbw, rbh = rbb[2] - rbb[0], rbb[3] - rbb[1]
print(f"REF condo-safety: canvas {rw}x{rh}, bbox {rbw}x{rbh}")

JOBS = [
    (os.path.join(EDU, "pictogram-teoria-fogo.png"), os.path.join(EDU, "pictogram-teoria-do-fogo.png")),
    (os.path.join(HOME, "pictogram-scanner-ambiente.png"), os.path.join(HOME, "pictogram-planta-baixa-scan.png")),
]

for src, dst in JOBS:
    shutil.copy2(src, os.path.join(RAW, os.path.basename(src)))  # backup do original em alta
    img = white_to_alpha(Image.open(src).convert("RGBA"))
    bb = alpha_bbox(img)
    content = img.crop(bb).resize((rbw, rbh), Image.LANCZOS)
    canvas = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
    canvas.paste(content, ((rw - rbw) // 2, (rh - rbh) // 2), content)
    canvas.save(dst, optimize=True)
    kb = os.path.getsize(dst) / 1024
    print(f"OUT {os.path.basename(dst)}: {canvas.size[0]}x{canvas.size[1]} "
          f"corner {canvas.getpixel((0,0))} {kb:.0f}KB")
