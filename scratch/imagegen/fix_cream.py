# Padroniza o CREME do tile ceramico em #F5EBDC, preservando o degrade 3D
# (re-ancora o tom-MEDIO, nao chapa). Precedente: fix_tone.py (verde). PIL puro.
# Pipeline por tile: floodfill branco->transparente (resolve fundos opacos tipo
# relatorio-personalizado) -> mascara do creme (opaco + quente R>=G + claro,
# exclui verde e margem anti-alias) -> offset uniforme p/ a mediana cair no alvo
# (realces e sombras acompanham => relevo intacto, sem halo).
import os
from PIL import Image, ImageDraw

TARGET = (245, 235, 220)  # #F5EBDC
THRESH = 24

def white_to_alpha(img):
    rgba = img.convert('RGBA'); work = rgba.copy(); sent = (255, 0, 255, 255); w, h = work.size
    for c in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        try: ImageDraw.floodfill(work, c, sent, thresh=THRESH)
        except Exception: pass
    s = rgba.load(); d = work.load(); o = Image.new('RGBA', (w, h)); op = o.load()
    for y in range(h):
        for x in range(w): op[x, y] = (0, 0, 0, 0) if d[x, y] == sent else s[x, y]
    return o

# Medir: corpo solido do creme (ancora a mediana no alvo com precisao).
# Guard "quente" (r-b>8) exclui cinza/branco neutro (assets legados P&B/line-art).
def _is_body(r, g, b, a):
    return a > 240 and min(r, g, b) > 150 and r >= g and (r - b) > 8
# Aplicar: creme amplo (inclui realces/sombras quentes) p/ deslocar o degrade
# inteiro junto. Bordas anti-alias (r baixo) ficam fora => sem halo.
def _is_cream(r, g, b, a):
    return a > 200 and r >= g and r > 150

def _med(lst):
    lst = sorted(lst); return lst[len(lst) // 2]

def _clamp(v):
    return 0 if v < 0 else (255 if v > 255 else v)

def fix_cream(src, dst):
    img = white_to_alpha(Image.open(src).convert('RGBA'))
    w, h = img.size; px = img.load()
    rs = []; gs = []; bs = []
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if _is_body(r, g, b, a): rs.append(r); gs.append(g); bs.append(b)
    if not rs:
        img.save(dst, optimize=True); return None
    med = (_med(rs), _med(gs), _med(bs))
    off = (TARGET[0] - med[0], TARGET[1] - med[1], TARGET[2] - med[2])
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if _is_cream(r, g, b, a):
                px[x, y] = (_clamp(r + off[0]), _clamp(g + off[1]), _clamp(b + off[2]), a)
    img.save(dst, optimize=True)
    return med, off

if __name__ == '__main__':
    import sys, glob
    # Modo lista explicita: paths como argumentos -> processa IN PLACE.
    if len(sys.argv) > 1 and sys.argv[1] not in ('preview', 'apply'):
        for src in sys.argv[1:]:
            name = os.path.basename(src)
            res = fix_cream(src, src)
            if res:
                med, off = res
                print('%-36s creme #%02X%02X%02X offset(%+d,%+d,%+d)' % (name, med[0], med[1], med[2], off[0], off[1], off[2]))
            else:
                print('%-36s SEM CREME quente -> NAO tocado' % name)
        sys.exit(0)
    HOME = 'assets/illustrations/home-pictograms'
    mode = sys.argv[1] if len(sys.argv) > 1 else 'preview'
    OUT = 'scratch/imagegen/cream-fix-preview'
    files = sorted(glob.glob(os.path.join(HOME, '*.png')))
    for src in files:
        name = os.path.basename(src)
        dst = src if mode == 'apply' else os.path.join(OUT, name)
        if mode != 'apply': os.makedirs(OUT, exist_ok=True)
        res = fix_cream(src, dst)
        if res:
            med, off = res
            print('%-28s creme #%02X%02X%02X offset(%+d,%+d,%+d)' % (name, med[0], med[1], med[2], off[0], off[1], off[2]))
        else:
            print('%-28s SEM CREME detectado (nao-ceramico?) -> NAO recolorido' % name)
