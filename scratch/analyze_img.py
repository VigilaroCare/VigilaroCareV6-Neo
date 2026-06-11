import sys
from PIL import Image

try:
    img_path = r"c:\Users\User\Documents\VigilaroCareV6 Neo\assets\illustrations\home-pictograms\pictogram-atividades-especiais.png"
    img = Image.open(img_path)
    img = img.convert("RGBA")
    
    width, height = img.size
    mid_x, mid_y = width // 2, height // 2
    print(f"Center pixel: {img.getpixel((mid_x, mid_y))}")
    
    # Let's count colors
    colors = {}
    for y in range(height):
        for x in range(width):
            c = img.getpixel((x,y))
            if c[3] > 0: # not fully transparent
                colors[c] = colors.get(c, 0) + 1
                
    # Sort colors by frequency
    sorted_colors = sorted(colors.items(), key=lambda x: x[1], reverse=True)
    print("Most common visible colors:")
    for c, count in sorted_colors[:10]:
        print(f"{c}: {count} pixels")
        
except Exception as e:
    print(f"Error: {e}")
