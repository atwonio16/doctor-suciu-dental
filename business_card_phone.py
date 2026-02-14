"""
Design Carte de Vizita - Antonio Daniel
Cu iconita de TELEFON (nu WhatsApp)
"""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1004
HEIGHT = 650

# Culori premium
WHITE = (255, 255, 255)
CHARCOAL = (28, 28, 32)
GRAPHITE = (80, 80, 90)
SLATE = (100, 105, 120)
SILVER = (180, 180, 185)
ACCENT_BLUE = (45, 65, 95)  # Albastru elegant

def load_font(size, bold=False, black=False):
    paths = ['C:/Windows/Fonts/', os.path.expanduser('~/AppData/Local/Microsoft/Windows/Fonts/')]
    
    if black:
        names = ['Roboto-Black.ttf', 'Arial-Bold.ttf', 'arialbd.ttf']
    elif bold:
        names = ['Roboto-Bold.ttf', 'Arial-Bold.ttf', 'arialbd.ttf']
    else:
        names = ['Roboto-Regular.ttf', 'Arial.ttf', 'arial.ttf']
    
    for base in paths:
        for name in names:
            full = base + name
            if os.path.exists(full):
                try:
                    return ImageFont.truetype(full, size)
                except:
                    pass
    return ImageFont.load_default()

def draw_phone_icon(draw, cx, cy, size=70):
    """Deseneaza iconita de telefon stilizata"""
    # Dimensiuni telefon
    w = size * 0.5
    h = size * 0.7
    x = cx - w // 2
    y = cy - h // 2
    
    # Chenar telefon (rotunjit)
    draw.rounded_rectangle([x, y, x + w, y + h], radius=8, outline=CHARCOAL, width=4)
    
    # Ecranul (linie sus)
    screen_margin = 6
    draw.line([(x + screen_margin, y + 10), (x + w - screen_margin, y + 10)], fill=CHARCOAL, width=2)
    
    # Butonul circular jos
    btn_r = 4
    btn_cx = cx
    btn_cy = y + h - 10
    draw.ellipse([btn_cx - btn_r, btn_cy - btn_r, btn_cx + btn_r, btn_cy + btn_r], 
                 outline=CHARCOAL, width=2)

def create_card_phone():
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi mari
    font_name = load_font(70, black=True)
    font_tagline = load_font(28)
    font_details = load_font(26)
    font_phone = load_font(80, bold=True)
    
    name = "Antonio Daniel"
    tagline = "Ai nevoie de o cursa lunga?"
    details = "Aeroport    Orase    Curse lungi"
    phone = "0774 613 207"
    
    # Banda sus
    draw.rectangle([0, 0, WIDTH, 8], fill=CHARCOAL)
    
    # NUME
    bbox = draw.textbbox((0, 0), name, font=font_name)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    y = 60
    draw.text(((WIDTH - w) // 2, y), name, font=font_name, fill=CHARCOAL)
    
    # Linie sub nume
    line_w = 150
    line_x = (WIDTH - line_w) // 2
    draw.line([(line_x, y + h + 12), (line_x + line_w, y + h + 12)], fill=CHARCOAL, width=3)
    
    # Tagline
    bbox = draw.textbbox((0, 0), tagline, font=font_tagline)
    w = bbox[2] - bbox[0]
    y_tag = y + h + 45
    draw.text(((WIDTH - w) // 2, y_tag), tagline, font=font_tagline, fill=GRAPHITE)
    
    # Detalii
    bbox = draw.textbbox((0, 0), details, font=font_details)
    w = bbox[2] - bbox[0]
    y_det = y_tag + 50
    draw.text(((WIDTH - w) // 2, y_det), details, font=font_details, fill=SLATE)
    
    # === TELEFON + ICONITA DE TELEFON ===
    icon_size = 75
    spacing = 30
    
    bbox_phone = draw.textbbox((0, 0), phone, font=font_phone)
    phone_w = bbox_phone[2] - bbox_phone[0]
    phone_h = bbox_phone[3] - bbox_phone[1]
    
    total_w = icon_size + spacing + phone_w
    start_x = (WIDTH - total_w) // 2
    
    y_phone = HEIGHT - 180
    
    # Iconita de telefon (nu WhatsApp!)
    icon_cx = start_x + icon_size // 2
    icon_cy = y_phone + phone_h // 2 - 3
    draw_phone_icon(draw, icon_cx, icon_cy, icon_size)
    
    # Numar telefon
    draw.text((start_x + icon_size + spacing, y_phone), phone, font=font_phone, fill=CHARCOAL)
    
    # Banda jos (gri elegant, nu verde)
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=CHARCOAL)
    
    img.save('carte_vizita_telefon.png', 'PNG', dpi=(300, 300))
    img.save('carte_vizita_telefon.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_telefon.pdf', 'PDF', resolution=300)
    
    print("Design cu TELEFON creat!")
    print("Fisiere: carte_vizita_telefon.png/.jpg/.pdf")
    return img

if __name__ == "__main__":
    create_card_phone()
