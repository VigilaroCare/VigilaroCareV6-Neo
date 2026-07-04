"""Antes/depois do Relatorio de Prevencao (SafetyReportService):
template basico azul -> template da marca (pdfReport.js)."""
from PIL import Image, ImageDraw, ImageFont

SS = 3
W, H = 600, 720
GREYPAGE = (236, 238, 242)


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


def lines(d, x, y, ls, f, fill, lh):
    for ln in ls:
        d.text((x, y), ln, font=f, fill=fill); y += lh
    return y


img = Image.new('RGB', (W * SS, H * SS), GREYPAGE)
d = ImageDraw.Draw(img)
SUMMARY = "Aos 72 anos, o foco e eliminar riscos de queda. 3 pontos pedem acao no banheiro e na escada."
IMPL = "Piso liso molhado e a principal causa de fratura de quadril em idosos."
TIP = "Instalar barras de apoio e tapete antiderrapante fixo."

# ===================== ANTES (basico) =====================
px, py, pw = 20 * SS, 24 * SS, 264 * SS
d.rectangle([px, py, px + pw, py + 312 * SS], fill=(255, 255, 255))
d.text((px + 14 * SS, py + 8 * SS), "ANTES — basico", font=font(11, True), fill=(150, 60, 60))
# header
d.text((px + pw / 2, py + 34 * SS), "Vigilaro Care Neo", font=font(15, True), fill=(44, 62, 80), anchor="mm")
d.line([px + 30 * SS, py + 48 * SS, px + pw - 30 * SS, py + 48 * SS], fill=(52, 152, 219), width=2 * SS)
d.text((px + pw / 2, py + 58 * SS), "Relatorio de Seguranca e Prevencao", font=font(8.5), fill=(120, 120, 120), anchor="mm")
# summary box
by = py + 76 * SS
d.rectangle([px + 12 * SS, by, px + pw - 12 * SS, by + 86 * SS], fill=(248, 249, 250))
d.rectangle([px + 12 * SS, by, px + 12 * SS + 4 * SS, by + 86 * SS], fill=(52, 152, 219))
d.text((px + 22 * SS, by + 8 * SS), "Sumario para Maria", font=font(11, True), fill=(41, 128, 185))
d.text((px + 22 * SS, by + 26 * SS), "Perfil: Idoso (72 anos)", font=font(8.5), fill=(60, 60, 60))
lines(d, px + 22 * SS, by + 40 * SS, wrap(d, SUMMARY, font(8.5), pw - 48 * SS), font(8.5), (80, 80, 80), 12 * SS)
# risk item
ry = by + 100 * SS
d.rectangle([px + 12 * SS, ry, px + pw - 12 * SS, ry + 118 * SS], outline=(230, 230, 230), width=SS)
d.text((px + 22 * SS, ry + 8 * SS), "BANHEIRO", font=font(7.5), fill=(127, 140, 141))
d.text((px + 22 * SS, ry + 22 * SS), "Piso escorregadio", font=font(11, True), fill=(192, 57, 43))
lines(d, px + 22 * SS, ry + 40 * SS, wrap(d, IMPL, font(8.5), pw - 48 * SS), font(8.5), (70, 70, 70), 12 * SS)
d.rectangle([px + 22 * SS, ry + 78 * SS, px + pw - 22 * SS, ry + 104 * SS], fill=(232, 245, 233))
lines(d, px + 28 * SS, ry + 83 * SS, wrap(d, "Acao Recomendada: " + TIP, font(8), pw - 60 * SS), font(8), (60, 90, 60), 11 * SS)

# ===================== DEPOIS (marca) =====================
FOREST, EMERALD, CHAMP, INK, MUTED, LINE, SOFT = (20, 52, 43), (46, 125, 91), (200, 169, 97), (45, 45, 45), (107, 114, 128), (230, 232, 230), (246, 248, 247)
qx, qy, qw = 316 * SS, 24 * SS, 264 * SS
d.rectangle([qx, qy, qx + qw, qy + 312 * SS], fill=(255, 255, 255))
d.text((qx + 14 * SS, qy + 8 * SS), "DEPOIS — marca", font=font(11, True), fill=(40, 110, 70))
# header band forest
hb = qy + 24 * SS
d.rectangle([qx, hb, qx + qw, hb + 76 * SS], fill=FOREST)
d.text((qx + 18 * SS, hb + 12 * SS), "VIGILARO CARE", font=font(7.5, True), fill=(210, 220, 214))
d.text((qx + 18 * SS, hb + 26 * SS), "Relatorio de Prevencao", font=font(15, True), fill=(255, 255, 255))
d.text((qx + 18 * SS, hb + 48 * SS), "Maria · Idoso · 72 anos", font=font(8.5), fill=(225, 232, 228))
d.rectangle([qx + 18 * SS, hb + 64 * SS, qx + 18 * SS + 40 * SS, hb + 67 * SS], fill=CHAMP)
# lead
ly = hb + 90 * SS
lh = 56 * SS
d.rounded_rectangle([qx + 14 * SS, ly, qx + qw - 14 * SS, ly + lh], radius=6 * SS, fill=SOFT)
d.rectangle([qx + 14 * SS, ly, qx + 14 * SS + 4 * SS, ly + lh], fill=EMERALD)
lines(d, qx + 26 * SS, ly + 8 * SS, wrap(d, SUMMARY, font(8.5), qw - 52 * SS), font(8.5), INK, 12 * SS)
# h2
hy = ly + lh + 12 * SS
d.text((qx + 16 * SS, hy), "Irregularidades identificadas (3)", font=font(11, True), fill=EMERALD)
d.line([qx + 16 * SS, hy + 18 * SS, qx + qw - 16 * SS, hy + 18 * SS], fill=LINE, width=SS)
# card
cy = hy + 26 * SS
d.rounded_rectangle([qx + 14 * SS, cy, qx + qw - 14 * SS, cy + 78 * SS], radius=8 * SS, outline=LINE, width=SS)
d.text((qx + 24 * SS, cy + 8 * SS), "Banheiro", font=font(8), fill=MUTED)
d.text((qx + 24 * SS, cy + 20 * SS), "Piso escorregadio", font=font(11, True), fill=INK)
lines(d, qx + 24 * SS, cy + 36 * SS, wrap(d, IMPL, font(8.5), qw - 48 * SS), font(8.5), (70, 70, 70), 12 * SS)
# disclaimer champagne
dy = cy + 88 * SS
d.rounded_rectangle([qx + 14 * SS, dy, qx + qw - 14 * SS, dy + 40 * SS], radius=6 * SS, fill=(251, 243, 223))
d.rectangle([qx + 14 * SS, dy, qx + 14 * SS + 5 * SS, dy + 40 * SS], fill=CHAMP)
lines(d, qx + 26 * SS, dy + 7 * SS, wrap(d, "Guia de prevencao — nao substitui avaliacao profissional. Risco imediato: 192/193.", font(8, True), qw - 50 * SS), font(8, True), (92, 74, 26), 11 * SS)

img = img.resize((W, H), Image.LANCZOS)
img.save("report.png")
print("OK")
