import sys
from PIL import Image

try:
    img_path = r"c:\Users\User\Documents\VigilaroCareV6 Neo\assets\illustrations\home-pictograms\pictogram-atividades-especiais.png"
    out_path = r"c:\Users\User\Documents\VigilaroCareV6 Neo\assets\illustrations\home-pictograms\pictogram-atividades-especiais-clean.png"
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
                
    # Based on the ASCII map, the frame is ~90px left, 80px right, 65px top, 65px bottom
    left = 90
    right = width - 85
    top = 65
    bottom = height - 65
    
    img_cropped = img.crop((left, top, right, bottom))
    img_cropped.save(out_path)
    print(f"Processed and saved to {out_path}")
    
except Exception as e:
    print(f"Error: {e}")
