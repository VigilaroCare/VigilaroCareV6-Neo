import os
from PIL import Image

def process_image(img_path, out_path):
    print(f"Processing {os.path.basename(img_path)}...")
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    def is_bg(r, g, b, a):
        return r > 230 and g > 230 and b > 220
        
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_bg(r, g, b, a):
                pixels[x, y] = (r, g, b, 0)
                
    left = 90
    right = width - 85
    top = 65
    bottom = height - 65
    
    if width <= left + (width - right) or height <= top + (height - bottom):
        print(f"Skipping crop for {os.path.basename(img_path)} (image too small)")
        img.save(out_path)
    else:
        img_cropped = img.crop((left, top, right, bottom))
        img_cropped.save(out_path)
    print(f"Saved {os.path.basename(out_path)}")

directory = r"c:\Users\User\Documents\VigilaroCareV6 Neo\assets\illustrations\home-pictograms"
files = [
    "pictogram-vistoria.png",
    "pictogram-minha-saude.png",
    "pictogram-saude-pet.png",
    "pictogram-ferramentas-ia.png",
    "pictogram-inforotulos.png"
]

for f in files:
    in_path = os.path.join(directory, f)
    out_path = os.path.join(directory, f.replace(".png", "-clean.png"))
    if os.path.exists(in_path):
        process_image(in_path, out_path)
    else:
        print(f"File not found: {in_path}")
