"""
Design Final Carte de Vizita - Antonio Daniel
WhatsApp icon + Fonturi mari + Layout pro
"""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1004
HEIGHT = 650

# Culori
WHITE = (255, 255, 255)
CHARCOAL = (28, 28, 32)
GRAPHITE = (80, 80, 90)
SLATE = (100, 105, 120)
SILVER = (180, 180, 185)
WHATSAPP_GREEN = (37, 211, 102)
WHATSAPP_DARK = (18, 140, 66)

def load_font(size, bold=False, black=False):
    """Incarca Roboto sau Arial"""
    paths = [
        'C:/Windows/Fonts/',
        os.path.expanduser('~/AppData/Local/Microsoft/Windows/Fonts/')
    ]
    
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

def draw_whatsapp_logo(draw, cx, cy, size=75):
    """Deseneaza logo WhatsApp stilizat"""
    r = size // 2
    # Cerc verde
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=WHATSAPP_GREEN, outline=WHATSAPP_DARK, width=2)
    
    # Telefon stilizat in alb (centrat in cerc)
    white = (255, 255, 255)
    
    # Corp telefon (dreptunghi rotunjit mic)
    w, h = size * 0.4, size * 0.5
    x = cx - w // 2
    y = cy - h // 2 + 2
    
    # Desenare manuala telefon
    margin = 5
    # Chenar telefon
    draw.rounded_rectangle([x + margin, y + margin, x + w - margin, y + h - margin], 
                          radius=5, outline=white, width=3)
    
    # Receptor (arc sus)
    arc_y = y + 12
    draw.arc([x + 8, arc_y, x + w - 8, arc_y + 15], start=200, end=340, fill=white, width=3)

def create_card():
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # === FONTURI MARI ===
    font_name = load_font(68, black=True)      # NUME - FOARTE MARE
    font_tagline = load_font(26)                # Tagline marit
    font_details = load_font(24)                # Detalii vizibile  
    font_phone = load_font(76, bold=True)       # TELEFON - MASIV
    
    # Text
    name = "Antonio Daniel"
    tagline = "Ai nevoie de o cursa lunga?"
    details = "Aeroport    Orase    Curse lungi"
    phone = "0774 613 207"  # Cu spatii corecte
    
    # === DESENARE ===
    
    # Banda neagra sus
    draw.rectangle([0, 0, WIDTH, 8], fill=CHARCOAL)
    
    # NUMELE - centrat, MARE
    bbox = draw.textbbox((0, 0), name, font=font_name)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (WIDTH - w) // 2
    y = 55
    draw.text((x, y), name, font=font_name, fill=CHARCOAL)
    
    # Linie accent sub nume
    line_w = 160
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
    
    # === WHATSAPP + TELEFON (JOS) ===
    icon_size = 85
    spacing = 30
    
    # Calculeaza dimensiuni grup
    bbox_phone = draw.textbbox((0, 0), phone, font=font_phone)
    phone_w = bbox_phone[2] - bbox_phone[0]
    phone_h = bbox_phone[3] - bbox_phone[1]
    
    total_w = icon_size + spacing + phone_w
    start_x = (WIDTH - total_w) // 2
    
    y_phone = HEIGHT - 180
    
    # Icon WhatsApp
    icon_cx = start_x + icon_size // 2
    icon_cy = y_phone + phone_h // 2 - 3
    draw_whatsapp_logo(draw, icon_cx, icon_cy, icon_size)
    
    # Numar telefon
    draw.text((start_x + icon_size + spacing, y_phone), phone, font=font_phone, fill=CHARCOAL)
    
    # Banda WhatsApp jos
    draw.rectangle([0, HEIGHT - 10, WIDTH, HEIGHT], fill=WHATSAPP_GREEN)
    
    # Salveaza
    img.save('carte_vizita_final.png', 'PNG', dpi=(300, 300))
    img.save('carte_vizita_final.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_final.pdf', 'PDF', resolution=300)
    
    print("Design FINAL creat!")
    print("Fisiere: carte_vizita_final.png/.jpg/.pdf")
    return img

def create_card_modern():
    """Varianta cu layout diferit - mai moderna"""
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi
    font_name = load_font(72, black=True)
    font_tag = load_font(28)
    font_det = load_font(26)
    font_phone = load_font(70, bold=True)
    
    name = "Antonio Daniel"
    tag = "Ai nevoie de o cursa lunga?"
    det = "Aeroport  •  Orase  •  Curse lungi"
    phone = "0774 613 207"
    
    # Block gri deschis pe toata latimea sus
    draw.rectangle([0, 0, WIDTH, 220], fill=(248, 248, 250))
    
    # Numele in block
    bbox = draw.textbbox((0, 0), name, font=font_name)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((WIDTH - w) // 2, 50), name, font=font_name, fill=CHARCOAL)
    
    # Tagline sub block
    bbox = draw.textbbox((0, 0), tag, font=font_tag)
    w = bbox[2] - bbox[0]
    draw.text(((WIDTH - w) // 2, 240), tag, font=font_tag, fill=GRAPHITE)
    
    # Detalii
    bbox = draw.textbbox((0, 0), det, font=font_det)
    w = bbox[2] - bbox[0]
    draw.text(((WIDTH - w) // 2, 290), det, font=font_det, fill=SLATE)
    
    # Whatsapp + telefon jos
    icon_size = 90
    bbox_phone = draw.textbbox((0, 0), phone, font=font_phone)
    phone_w = bbox_phone[2] - bbox_phone[0]
    phone_h = bbox_phone[3] - bbox_phone[1]
    
    total_w = icon_size + 35 + phone_w
    start_x = (WIDTH - total_w) // 2
    y_phone = HEIGHT - 170
    
    # Icon
    draw_whatsapp_logo(draw, start_x + icon_size // 2, y_phone + phone_h // 2 - 3, icon_size)
    
    # Telefon
    draw.text((start_x + icon_size + 35, y_phone), phone, font=font_phone, fill=CHARCOAL)
    
    # Banda colorata jos
    draw.rectangle([0, HEIGHT - 12, WIDTH, HEIGHT], fill=WHATSAPP_GREEN)
    
    img.save('carte_vizita_modern.png', 'PNG', dpi=(300, 300))
    img.save('carte_vizita_modern.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_modern.pdf', 'PDF', resolution=300)
    
    print("\nDesign MODERN creat!")
    print("Fisiere: carte_vizita_modern.png/.jpg/.pdf")
    return img

if __name__ == "__main__":
    create_card()
    create_card_modern()
