"""
Design Premium Carte de Vizită - Antonio Daniel Ion
Stil: Minimalist, elegant, profesional
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Dimensiuni carte de vizită standard (85mm x 55mm) la 300 DPI (print quality)
# 85mm = 3.346 inch => 1004 px
# 55mm = 2.165 inch => 650 px
WIDTH = 1004
HEIGHT = 650

# Culori premium
WHITE = (255, 255, 255)
DARK_GRAY = (45, 45, 45)  # Gri închis elegant
BLACK = (30, 30, 30)  # Negru soft, nu pur
ACCENT_BLUE = (50, 60, 80)  # Albastru închis elegant
LIGHT_GRAY = (120, 120, 120)  # Gri mediu pentru text secundar

def get_font(name, size, bold=False):
    """Încearcă să găsească un font disponibil în sistem"""
    font_paths = []
    
    if bold:
        font_variants = ['Bold', 'b', 'B', '']
    else:
        font_variants = ['Regular', 'r', 'R', '']
    
    # Fonturi moderne preferate
    modern_fonts = [
        'Montserrat', 'Poppins', 'Inter', 'Raleway', 'Lato', 
        'OpenSans', 'Roboto', 'Helvetica', 'Arial', 'SegoeUI'
    ]
    
    # Căi posibile pentru fonturi pe Windows
    windows_font_paths = [
        'C:/Windows/Fonts/',
        'C:/Users/' + os.getenv('USERNAME') + '/AppData/Local/Microsoft/Windows/Fonts/',
        '/usr/share/fonts/',
        '/usr/local/share/fonts/'
    ]
    
    # Încearcă fontul specificat
    if name:
        for variant in font_variants:
            for base_path in windows_font_paths:
                if variant:
                    font_paths.append(f"{base_path}{name}-{variant}.ttf")
                    font_paths.append(f"{base_path}{name}{variant}.ttf")
                else:
                    font_paths.append(f"{base_path}{name}.ttf")
    
    # Încearcă toate fonturile moderne ca fallback
    for font_name in modern_fonts:
        for variant in font_variants:
            for base_path in windows_font_paths:
                if variant:
                    font_paths.append(f"{base_path}{font_name}-{variant}.ttf")
                    font_paths.append(f"{base_path}{font_name}{variant}.ttf")
                else:
                    font_paths.append(f"{base_path}{font_name}.ttf")
    
    # Încearcă fiecare cale
    for path in font_paths:
        try:
            return ImageFont.truetype(path, size)
        except:
            continue
    
    # Fallback la fontul default
    return ImageFont.load_default()

def create_business_card():
    # Creează imaginea cu fundal alb
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Încarcă fonturile
    font_name = get_font('Montserrat', 44, bold=True)  # Numele
    font_tagline = get_font('Inter', 22)  # Tagline
    font_phone = get_font('Montserrat', 64, bold=True)  # Telefon - DOMINANT
    font_phone_icon = get_font('SegoeUI', 58)  # Icon telefon
    
    # Dimensiuni pentru calcularea poziționării
    text_name = "Antonio Daniel Ion"
    text_tagline = "Ai nevoie de o cursă lungă?"
    text_details = "Aeroport • Orașe • Curse lungi"
    text_phone = "0774 613 207"
    
    # Calculează dimensiuni text pentru centering
    bbox_name = draw.textbbox((0, 0), text_name, font=font_name)
    name_width = bbox_name[2] - bbox_name[0]
    name_height = bbox_name[3] - bbox_name[1]
    
    bbox_tagline = draw.textbbox((0, 0), text_tagline, font=font_tagline)
    tagline_width = bbox_tagline[2] - bbox_tagline[0]
    
    bbox_details = draw.textbbox((0, 0), text_details, font=font_tagline)
    details_width = bbox_details[2] - bbox_details[0]
    
    bbox_phone = draw.textbbox((0, 0), text_phone, font=font_phone)
    phone_width = bbox_phone[2] - bbox_phone[0]
    phone_height = bbox_phone[3] - bbox_phone[1]
    
    # Layout aerisit - poziționare verticală
    margin_top = 80
    spacing_large = 50
    spacing_medium = 25
    spacing_small = 15
    
    # Poziționare elemente
    y_name = margin_top
    y_tagline = y_name + name_height + spacing_large
    y_details = y_tagline + 30
    y_separator = y_details + 50
    y_phone = HEIGHT - 160  # Telefonul jos, dominant
    
    # Desenează numele (centrat, sus) - culoare gri închis premium
    x_name = (WIDTH - name_width) // 2
    draw.text((x_name, y_name), text_name, font=font_name, fill=DARK_GRAY)
    
    # Desenează tagline (centrat)
    x_tagline = (WIDTH - tagline_width) // 2
    draw.text((x_tagline, y_tagline), text_tagline, font=font_tagline, fill=LIGHT_GRAY)
    
    # Desenează detalii servicii (centrat)
    x_details = (WIDTH - details_width) // 2
    draw.text((x_details, y_details), text_details, font=font_tagline, fill=ACCENT_BLUE)
    
    # Linie subtilă separatorie (accent premium)
    line_y = y_separator
    line_margin = 200
    draw.line([(line_margin, line_y), (WIDTH - line_margin, line_y)], fill=(200, 200, 200), width=1)
    
    # Desenează telefonul - ELEMENT DOMINANT (mare, bold, centrat)
    x_phone = (WIDTH - phone_width) // 2
    draw.text((x_phone, y_phone), text_phone, font=font_phone, fill=BLACK)
    
    # Salvează imaginea în diferite formate
    # PNG pentru calitate maximă
    img.save('carte_vizita_premium.png', 'PNG', dpi=(300, 300))
    
    # JPG pentru utilizare generală
    img_rgb = img.convert('RGB')
    img_rgb.save('carte_vizita_premium.jpg', 'JPEG', quality=95, dpi=(300, 300))
    
    # PDF pentru print
    img.save('carte_vizita_premium.pdf', 'PDF', resolution=300)
    
    print("Cartea de vizita a fost creata cu succes!")
    print("  - carte_vizita_premium.png (calitate maxima)")
    print("  - carte_vizita_premium.jpg (utilizare generala)")
    print("  - carte_vizita_premium.pdf (pentru print)")
    print(f"\nDimensiuni: {WIDTH}x{HEIGHT} px (85mm x 55mm @ 300 DPI)")
    
    return img

if __name__ == "__main__":
    create_business_card()
