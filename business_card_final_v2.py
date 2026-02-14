"""
Design Final v2 - Antonio Daniel
Based on the original liked design + phone icon + modifications
"""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1004
HEIGHT = 650

# Culori
WHITE = (255, 255, 255)
DARK_GRAY = (45, 45, 45)
BLACK = (30, 30, 30)
ACCENT_BLUE = (50, 60, 80)
LIGHT_GRAY = (120, 120, 120)
SILVER = (200, 200, 200)

def get_font(name, size, bold=False):
    paths = ['C:/Windows/Fonts/', os.path.expanduser('~/AppData/Local/Microsoft/Windows/Fonts/')]
    
    if bold:
        variants = ['Bold', 'b', 'B', '-Bold', '']
    else:
        variants = ['Regular', 'r', 'R', '-Regular', '']
    
    modern_fonts = [name] if name else ['Montserrat', 'Roboto', 'Poppins', 'Inter', 'Arial']
    
    for font_name in modern_fonts:
        for variant in variants:
            for base in paths:
                if variant:
                    test_paths = [f"{base}{font_name}-{variant}.ttf", f"{base}{font_name}{variant}.ttf"]
                else:
                    test_paths = [f"{base}{font_name}.ttf"]
                
                for p in test_paths:
                    if os.path.exists(p):
                        try:
                            return ImageFont.truetype(p, size)
                        except:
                            pass
    return ImageFont.load_default()

def draw_phone_icon_simple(draw, cx, cy, size=45):
    """Iconita de telefon simpla, minimalist"""
    w = size * 0.6
    h = size
    x = cx - w // 2
    y = cy - h // 2
    
    # Chenar telefon rotunjit
    draw.rounded_rectangle([x, y, x + w, y + h], radius=6, outline=BLACK, width=3)
    
    # Ecran (linie sus)
    margin = 5
    draw.line([(x + margin, y + 8), (x + w - margin, y + 8)], fill=BLACK, width=2)
    
    # Buton jos (cerc mic)
    btn_r = 3
    draw.ellipse([cx - btn_r, y + h - 10 - btn_r, cx + btn_r, y + h - 10 + btn_r], outline=BLACK, width=2)

def create_card():
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi
    font_name = get_font('Montserrat', 48, bold=True)
    font_tagline = get_font('Inter', 24)
    font_details = get_font('Inter', 22)
    font_phone = get_font('Montserrat', 72, bold=True)
    
    # Texte
    text_name = "Antonio Daniel"  # Fara Ion
    text_tagline = "Ai nevoie de o cursă lungă?"
    text_details = "Aeroport • Orașe • România"  # Cu România in loc de Curse lungi
    text_phone = "0774 613 207"
    
    # Calculeaza dimensiuni
    bbox_name = draw.textbbox((0, 0), text_name, font=font_name)
    name_width = bbox_name[2] - bbox_name[0]
    name_height = bbox_name[3] - bbox_name[1]
    
    bbox_tagline = draw.textbbox((0, 0), text_tagline, font=font_tagline)
    tagline_width = bbox_tagline[2] - bbox_tagline[0]
    
    bbox_details = draw.textbbox((0, 0), text_details, font=font_details)
    details_width = bbox_details[2] - bbox_details[0]
    
    bbox_phone = draw.textbbox((0, 0), text_phone, font=font_phone)
    phone_width = bbox_phone[2] - bbox_phone[0]
    phone_height = bbox_phone[3] - bbox_phone[1]
    
    # === LAYOUT ===
    # Numele sus
    y_name = 70
    x_name = (WIDTH - name_width) // 2
    draw.text((x_name, y_name), text_name, font=font_name, fill=DARK_GRAY)
    
    # Linie separator
    line_y = y_name + name_height + 40
    line_margin = 200
    draw.line([(line_margin, line_y), (WIDTH - line_margin, line_y)], fill=SILVER, width=1)
    
    # Tagline MAI JOS (sub linie)
    y_tagline = line_y + 50
    x_tagline = (WIDTH - tagline_width) // 2
    draw.text((x_tagline, y_tagline), text_tagline, font=font_tagline, fill=LIGHT_GRAY)
    
    # Detalii sub tagline
    y_details = y_tagline + 40
    x_details = (WIDTH - details_width) // 2
    draw.text((x_details, y_details), text_details, font=font_details, fill=ACCENT_BLUE)
    
    # === TELEFON + ICON (jos, centrat) ===
    icon_size = 50
    spacing = 20
    
    total_width = icon_size + spacing + phone_width
    start_x = (WIDTH - total_width) // 2
    
    y_phone = HEIGHT - 160
    
    # Iconita de telefon
    icon_cx = start_x + icon_size // 2
    icon_cy = y_phone + phone_height // 2 + 5
    draw_phone_icon_simple(draw, icon_cx, icon_cy, icon_size)
    
    # Numar telefon
    phone_x = start_x + icon_size + spacing
    draw.text((phone_x, y_phone), text_phone, font=font_phone, fill=BLACK)
    
    # Salveaza
    img.save('carte_vizita_antoniov2.png', 'PNG', dpi=(300, 300))
    img.save('carte_vizita_antoniov2.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_antoniov2.pdf', 'PDF', resolution=300)
    
    print("Design Antonio v2 creat!")
    print("Fisiere: carte_vizita_antoniov2.png/.jpg/.pdf")
    return img

if __name__ == "__main__":
    create_card()
