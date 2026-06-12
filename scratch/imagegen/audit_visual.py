# Auditoria de linguagem visual dos pictogramas cerâmicos.
# Mede por asset: espessura da moldura (4 lados), tom médio do verde
# (símbolo+moldura), tom do creme do tile, e cobertura do símbolo na
# área interna. Sinaliza outliers vs a mediana do conjunto.
import os, statistics
from PIL import Image

BASE = r"c:\Users\User\Documents\VigilaroCareV6 Neo\assets\illustrations"
SETS = {
    "education": os.path.join(BASE, "education-pictograms"),
    "travel": os.path.join(BASE, "travel-pictograms"),
}
# órfãos conhecidos (fora do código) — ignorar
SKIP = {"pictogram-conceitos-essenciais", "pictogram-cuidados-gestacao",
        "pictogram-guia-brinquedos", "pictogram-saude-pet",
        "icone_planta_baixa_ilustrativa (1)"}

def is_dark(p):
    r, g, b, a = p
    return a > 200 and r + g + b < 360

def measure(path):
    img = Image.open(path).convert("RGBA")
    bb = img.getchannel("A").getbbox()
    img = img.crop(bb)
    w, h = img.size
    px = img.load()

    # espessura da moldura: varre do limite até acabar o escuro, no meio de cada lado
    def run_len(xs_ys):
        n = 0
        for (x, y) in xs_ys:
            if is_dark(px[x, y]):
                n += 1
            elif n > 3:  # já entrou e saiu da moldura
                break
        return n
    cy, cx = h // 2, w // 2
    f_left  = run_len(((x, cy) for x in range(0, w // 4)))
    f_right = run_len(((w - 1 - x, cy) for x in range(0, w // 4)))
    f_top   = run_len(((cx, y) for y in range(0, h // 4)))
    f_bot   = run_len(((cx, h - 1 - y) for y in range(0, h // 4)))
    frame = statistics.mean([f_left, f_right, f_top, f_bot]) / w * 100  # % da largura

    # tons: amostra a cada 4px
    greens, creams = [], []
    inner0, inner1 = int(w * 0.18), int(w * 0.82)  # área interna (sem moldura)
    dark_inner = 0
    inner_total = 0
    for y in range(0, h, 4):
        for x in range(0, w, 4):
            p = px[x, y]
            if p[3] < 200:
                continue
            if is_dark(p):
                greens.append(p[:3])
            elif sum(p[:3]) > 600:
                creams.append(p[:3])
            if inner0 < x < inner1 and inner0 < y < inner1:
                inner_total += 1
                if is_dark(p):
                    dark_inner += 1
    g = tuple(int(statistics.mean(c[i] for c in greens)) for i in range(3)) if greens else (0,0,0)
    c = tuple(int(statistics.mean(c[i] for c in creams)) for i in range(3)) if creams else (0,0,0)
    sym = dark_inner / inner_total * 100 if inner_total else 0
    return dict(size=(w, h), frame=frame, green=g, cream=c, symbol=sym)

rows = []
for set_name, folder in SETS.items():
    for f in sorted(os.listdir(folder)):
        name = os.path.splitext(f)[0]
        if not f.endswith(".png") or name in SKIP:
            continue
        m = measure(os.path.join(folder, f))
        rows.append((set_name, name, m))

frames = [m["frame"] for _, _, m in rows]
syms = [m["symbol"] for _, _, m in rows]
med_f, med_s = statistics.median(frames), statistics.median(syms)
print(f"== {len(rows)} assets | moldura mediana {med_f:.1f}% | simbolo mediano {med_s:.1f}% ==")
print(f"{'asset':38s} {'moldura%':>8s} {'simb%':>6s} {'verde':>13s} {'creme':>13s} flags")
for set_name, name, m in rows:
    flags = []
    if abs(m["frame"] - med_f) > med_f * 0.45: flags.append("MOLDURA")
    if abs(m["symbol"] - med_s) > 18: flags.append("SIMBOLO")
    if m["green"][1] - m["green"][2] > 25 or m["green"][2] - m["green"][1] > 15: flags.append("TOM")
    print(f"{name:38s} {m['frame']:8.1f} {m['symbol']:6.1f} {str(m['green']):>13s} {str(m['cream']):>13s} {' '.join(flags)}")
