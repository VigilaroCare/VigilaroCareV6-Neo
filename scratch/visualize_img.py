import sys
from PIL import Image

try:
    img_path = r"c:\Users\User\Documents\VigilaroCareV6 Neo\assets\illustrations\home-pictograms\pictogram-atividades-especiais.png"
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    def is_bg(r, g, b, a):
        return r > 230 and g > 230 and b > 220
        
    # Let's create a 40x30 ascii representation of the image
    ascii_w, ascii_h = 48, 36
    block_w = width / ascii_w
    block_h = height / ascii_h
    
    print("ASCII Map of non-background pixels:")
    for j in range(ascii_h):
        line = ""
        for i in range(ascii_w):
            # Check center of block
            x = int(i * block_w + block_w/2)
            y = int(j * block_h + block_h/2)
            r, g, b, a = img.getpixel((x, y))
            if is_bg(r, g, b, a):
                line += "."
            else:
                line += "#"
        print(line)
        
except Exception as e:
    print(f"Error: {e}")
