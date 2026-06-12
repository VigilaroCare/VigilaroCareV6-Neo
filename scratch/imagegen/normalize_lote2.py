# Normaliza o Lote 2 dos pictogramas cerâmicos do Hub para o padrão do
# condo-safety (eleito pelo autor): mesma cobertura de canvas, mesmo aspecto,
# mesma largura final. Pipeline idêntico ao do Lote 1:
#   floodfill branco->alpha (cantos, thresh 24) -> crop bbox ->
#   stretch p/ aspecto alvo -> paste centrado em canvas com cobertura alvo.
import os
from PIL import Image, ImageDraw

BASE = r"c:\Users\User\Documents\VigilaroCareV6 Neo"
ASSETS = os.path.join(BASE, "assets", "illustrations", "education-pictograms")
RAW = os.path.join(BASE, "scratch", "imagegen", "raw-lote2")

REF = os.path.join(ASSETS, "pictogram-condo-safety.png")
THRESH = 24

def alpha_bbox(img):
    return img.getchannel("A").getbbox()

def measure(path):
    img = Image.open(path).convert("RGBA")
    bb = alpha_bbox(img)
    bw, bh = bb[2] - bb[0], bb[3] - bb[1]
    return img.size, bb, bw, bh

# ── 1. Medir a referência ──
(rw, rh), rbb, rbw, rbh = measure(REF)
cov_w, cov_h = rbw / rw, rbh / rh
aspect = rbw / rbh
print(f"REF condo-safety: canvas {rw}x{rh}, bbox {rbw}x{rbh}, "
      f"cobertura {cov_w:.3f}x{cov_h:.3f}, aspecto {aspect:.3f}")

def white_to_alpha(img):
    """Floodfill dos 4 cantos: branco conectado -> transparente."""
    rgba = img.convert("RGBA")
    # marca o fundo com uma cor sentinela via floodfill e depois zera o alpha
    work = rgba.copy()
    sent = (255, 0, 255, 255)
    w, h = work.size
    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        try:
            ImageDraw.floodfill(work, corner, sent, thresh=THRESH)
        except Exception:
            pass
    src = rgba.load()
    dst = work.load()
    out = Image.new("RGBA", (w, h))
    op = out.load()
    for y in range(h):
        for x in range(w):
            if dst[x, y] == sent:
                op[x, y] = (0, 0, 0, 0)
            else:
                op[x, y] = src[x, y]
    return out

FILES = [
    "pictogram-ambientes",
    "pictogram-gestacao",
    "pictogram-brinquedos",
    "pictogram-casos-reais",
    "pictogram-conceitos",
]

for name in FILES:
    src_path = os.path.join(RAW, name + ".png.png")
    img = Image.open(src_path).convert("RGBA")
    img = white_to_alpha(img)
    bb = alpha_bbox(img)
    content = img.crop(bb)
    cw, ch = content.size

    # alvo: bbox com a mesma cobertura e aspecto da referência, no mesmo canvas
    tw, th = rbw, rbh
    stretch = (tw / cw) / (th / ch)  # quanto o aspecto muda
    content = content.resize((tw, th), Image.LANCZOS)

    canvas = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
    canvas.paste(content, ((rw - tw) // 2, (rh - th) // 2), content)

    out_path = os.path.join(ASSETS, name + ".png")
    canvas.save(out_path, optimize=True)
    kb = os.path.getsize(out_path) / 1024
    print(f"{name}: raw {img.size[0]}x{img.size[1]} bbox {cw}x{ch} "
          f"(aspecto {cw/ch:.3f}, stretch {abs(1-stretch)*100:.1f}%) "
          f"-> {rw}x{rh} bbox {tw}x{th}, {kb:.0f} KB")
