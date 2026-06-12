# Correção de tom: escurece o verde de utensilios-rev e disp-eletronicos
# em direção à mediana do conjunto (22,56,50), preservando specular e creme.
# Força da correção é gradual pela escuridão do pixel — evita banding na
# transição corpo-escuro -> highlight.
import os
from PIL import Image

SRC = r"c:\Users\User\Documents\VigilaroCareV6 Neo\assets\illustrations\education-pictograms"
TARGETS = {
    # nome: média atual do verde (medida na auditoria)
    "pictogram-utensilios-rev": (40, 63, 62),
    "pictogram-disp-eletronicos": (39, 65, 64),
}
GOAL = (22, 56, 50)  # mediana do conjunto

for name, cur in TARGETS.items():
    path = os.path.join(SRC, name + ".png")
    img = Image.open(path).convert("RGBA")
    px = img.load()
    w, h = img.size
    # fatores multiplicativos por canal (aplicados em força total)
    f = tuple(GOAL[i] / cur[i] for i in range(3))
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            s = r + g + b
            # força: 1.0 para pixels bem escuros, decai a 0 até s=420
            if s >= 420:
                continue
            strength = min(1.0, (420 - s) / 120)
            nr = int(r * (1 + (f[0] - 1) * strength))
            ng = int(g * (1 + (f[1] - 1) * strength))
            nb = int(b * (1 + (f[2] - 1) * strength))
            px[x, y] = (nr, ng, nb, a)
    img.save(path, optimize=True)
    print(f"{name}: corrigido (fatores {tuple(round(v,2) for v in f)})")
