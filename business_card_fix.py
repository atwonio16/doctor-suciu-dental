"""
Design Fix - Antonio Daniel
"""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1004
HEIGHT = 650

WHITE = (255, 255, 255)
DARK_GRAY = (45, 45, 45)
BLACK = (30, 30, 30)
ACCENT_BLUE = (50, 60, 80)
LIGHT_GRAY = (120, 120, 120)
SILVER = (200, 200, 200)

def load_font(size, bold=False):
    """Incarca Roboto sau Arial"""
    base = 'C:/Windows/Fonts/'
    
    if bold:
        names = ['Roboto-Bold.ttf', 'arialbd.ttf', 'Arial-Bold.ttf']
    else:
        names = ['Roboto-Regular.ttf', 'arial.ttf', 'Arial.ttf']
    
    for name in names:
        path = base + name
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass
    return ImageFont.load_default()

def draw_phone(draw, cx, cy, size=55):
    """Iconita telefon"""
    w = int(size * 0.55)
    h = int(size * 0.9)
    x = cx - w // 2
    y = cy - h // 2
    
    # Chenar
    draw.rounded_rectangle([x, y, x + w, y + h], radius=8, outline=BLACK, width=4)
    # Ecran
    draw.line([(x + 6, y + 10), (x + w - 6, y + 10)], fill=BLACK, width=3)
    # Buton
    r = 4
    draw.ellipse([cx - r, y + h - 12 - r, cx + r, y + h - 12 + r], outline=BLACK, width=2)

def create():
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi
    font_name = load_font(52, bold=True)
    font_tag = load_font(24)
    font_det = load_font(22)
    font_phone = load_font(70, bold=True)
    
    name = "Antonio Daniel"
    tag = "Ai nevoie de o cursă lungă?"
    det = "Aeroport • Orașe • România"
    phone = "0774 613 207"
    
    # Dimensiuni
    bbox = draw.textbbox((0, 0), name, font=font_name)
    name_w, name_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    bbox = draw.textbbox((0, 0), tag, font=font_tag)
    tag_w = bbox[2] - bbox[0]
    
    bbox = draw.textbbox((0, 0), det, font=font_det)
    det_w = bbox[2] - bbox[0]
    
    bbox = draw.textbbox((0, 0), phone, font=font_phone)
    phone_w, phone_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    # Nume sus
    y_name = 70
    draw.text(((WIDTH - name_w) // 2, y_name), name, font=font_name, fill=DARK_GRAY)
    
    # Linie
    line_y = y_name + name_h + 45
    draw.line([(200, line_y), (WIDTH - 200, line_y)], fill=SILVER, width=1)
    
    # Tagline MAI JOS
    y_tag = line_y + 55
    draw.text(((WIDTH - tag_w) // 2, y_tag), tag, font=font_tag, fill=LIGHT_GRAY)
    
    # Detalii
    y_det = y_tag + 45
    draw.text(((WIDTH - det_w) // 2, y_det), det, font=font_det, fill=ACCENT_BLUE)
    
    # Telefon + icon jos
    icon_size = 60
    spacing = 25
    
    total = icon_size + spacing + phone_w
    start = (WIDTH - total) // 2
    y_phone = HEIGHT - 160
    
    # Icon
    draw_phone(draw, start + icon_size // 2, y_phone + phone_h // 2 + 5, icon_size)
    
    # Numar
    draw.text((start + icon_size + spacing, y_phone), phone, font=font_phone, fill=BLACK)
    
    # Salveaza
    img.save('carte_vizita_antonio.png', 'PNG', dpi=(300, 300))
    img.save('carte_vizita_antonio.jpg', 'JPEG', quality=95, dpi=(300, 300))
    
    print("Gata! Fisiere: carte_vizita_antonio.png/.jpg")
    return img

if __name__ == "__main__":
    create()
