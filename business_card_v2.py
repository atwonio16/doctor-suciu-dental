"""
Design Premium Carte de Vizita v2 - Antonio Daniel Ion
Stil: Minimalist, elegant, profesional - ultra refined
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Dimensiuni carte de vizita standard (85mm x 55mm) la 300 DPI
WIDTH = 1004
HEIGHT = 650

# Culori premium - paleta sofisticata
WHITE = (255, 255, 255)
OFF_WHITE = (252, 252, 252)  # Alb foarte subtil
CHARCOAL = (35, 35, 40)  # Gri carbune - pentru nume si telefon
GRAPHITE = (80, 80, 90)  # Gri mediu - pentru tagline
SLATE = (100, 105, 120)  # Ardezie - pentru detalii
SILVER = (180, 180, 185)  # Argintiu - pentru linii subtile
ACCENT_NAVY = (45, 55, 80)  # Bleumarin elegant

def get_font(name, size, bold=False, italic=False):
    """Incearca sa gaseasca un font disponibil in sistem"""
    font_paths = []
    
    if bold and italic:
        variants = ['BoldItalic', 'Bold Italic', 'BI', '']
    elif bold:
        variants = ['Bold', 'b', 'B', '-Bold', '']
    elif italic:
        variants = ['Italic', 'i', 'I', '-Italic', '']
    else:
        variants = ['Regular', 'r', 'R', '-Regular', 'Book', 'Light', '']
    
    # Fonturi moderne preferate in ordinea preferintei
    modern_fonts = ['Montserrat', 'Poppins', 'Inter', 'Raleway', 'Lato', 
                    'OpenSans', 'Roboto', 'Helvetica', 'Arial', 'Calibri', 'SegoeUI']
    
    # Cai posibile pentru fonturi pe Windows
    windows_font_paths = [
        'C:/Windows/Fonts/',
        os.path.expanduser('~/AppData/Local/Microsoft/Windows/Fonts/'),
        '/usr/share/fonts/truetype/',
        '/usr/local/share/fonts/'
    ]
    
    # Incearca fontul specificat
    if name:
        for variant in variants:
            for base_path in windows_font_paths:
                if variant:
                    font_paths.extend([
                        f"{base_path}{name}-{variant}.ttf",
                        f"{base_path}{name}{variant}.ttf",
                        f"{base_path}{name.lower()}-{variant.lower()}.ttf",
                    ])
                else:
                    font_paths.append(f"{base_path}{name}.ttf")
    
    # Incearca toate fonturile moderne ca fallback
    for font_name in modern_fonts:
        for variant in variants:
            for base_path in windows_font_paths:
                if variant:
                    font_paths.extend([
                        f"{base_path}{font_name}-{variant}.ttf",
                        f"{base_path}{font_name}{variant}.ttf",
                    ])
                else:
                    font_paths.append(f"{base_path}{font_name}.ttf")
    
    # Incearca fiecare cale
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass
    
    # Fallback la fontul default
    return ImageFont.load_default()

def create_business_card_v2():
    # Creeaza imaginea cu fundal alb imaculat
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Incarca fonturile cu ierarhie vizuala clara
    font_name = get_font('Montserrat', 48, bold=True)  # Numele - prezenta puternica
    font_tagline = get_font('Inter', 20)  # Tagline - elegant, discret
    font_details = get_font('Inter', 18)  # Detalii - subtil
    font_phone = get_font('Montserrat', 72, bold=True)  # Telefon - DOMINANT, bold
    
    # Textul
    text_name = "Antonio Daniel Ion"
    text_tagline = "Ai nevoie de o cursa lunga?"
    text_details = "Aeroport    Orase    Curse lungi"
    text_phone = "0774 613 207"
    
    # Calculeaza dimensiuni pentru pozitionare precisa
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
    
    # Layout aerisit, procentual pentru balanta perfecta
    # Zona superioara 40% - informatii identitate
    # Zona inferioara 60% - telefon (elementul cheie)
    
    y_name = 70
    y_tagline = y_name + name_height + 35
    y_details = y_tagline + 30
    y_separator = y_details + 40
    y_phone = HEIGHT - 160
    
    # Deseneaza numele (centrat sus)
    x_name = (WIDTH - name_width) // 2
    draw.text((x_name, y_name), text_name, font=font_name, fill=CHARCOAL)
    
    # Deseneaza tagline (centrat, sub nume)
    x_tagline = (WIDTH - tagline_width) // 2
    draw.text((x_tagline, y_tagline), text_tagline, font=font_tagline, fill=GRAPHITE)
    
    # Deseneaza detalii servicii (centrat, sub tagline)
    x_details = (WIDTH - details_width) // 2
    draw.text((x_details, y_details), text_details, font=font_details, fill=SLATE)
    
    # Linie separatorie subtila - element de design premium
    line_y = y_separator
    line_width = 120
    line_x_start = (WIDTH - line_width) // 2
    line_x_end = line_x_start + line_width
    draw.line([(line_x_start, line_y), (line_x_end, line_y)], fill=SILVER, width=2)
    
    # Deseneaza telefonul - ELEMENTUL DOMINANT
    # Pozitionat in partea inferioara, foarte vizibil
    x_phone = (WIDTH - phone_width) // 2
    draw.text((x_phone, y_phone), text_phone, font=font_phone, fill=CHARCOAL)
    
    # Salveaza in toate formatele necesare
    img.save('carte_vizita_premium_v2.png', 'PNG', dpi=(300, 300))
    img.convert('RGB').save('carte_vizita_premium_v2.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_premium_v2.pdf', 'PDF', resolution=300)
    
    print("Design v2 creat cu succes!")
    print("Fisiere generate:")
    print("  - carte_vizita_premium_v2.png")
    print("  - carte_vizita_premium_v2.jpg")
    print("  - carte_vizita_premium_v2.pdf")
    
    return img

def create_business_card_v3_accent():
    """Versiune cu banda laterala subtila de accent - extra premium"""
    
    # Creeaza imaginea cu fundal alb
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Banda laterala subtire de accent (bleumarin elegant)
    band_width = 8
    draw.rectangle([0, 0, band_width, HEIGHT], fill=ACCENT_NAVY)
    
    # Offset pentru text din cauza benzii
    offset_x = band_width + 20
    usable_width = WIDTH - offset_x - 40
    
    # Fonturi
    font_name = get_font('Montserrat', 46, bold=True)
    font_tagline = get_font('Inter', 19)
    font_details = get_font('Inter', 17)
    font_phone = get_font('Montserrat', 68, bold=True)
    
    # Text
    text_name = "Antonio Daniel Ion"
    text_tagline = "Ai nevoie de o cursa lunga?"
    text_details = "Aeroport    Orase    Curse lungi"
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
    
    # Pozitionare cu offset
    center_offset = offset_x + (usable_width // 2)
    
    y_name = 70
    y_tagline = y_name + name_height + 35
    y_details = y_tagline + 30
    y_separator = y_details + 40
    y_phone = HEIGHT - 155
    
    # Deseneaza elementele centrate in zona utilizabila
    x_name = center_offset - (name_width // 2)
    draw.text((x_name, y_name), text_name, font=font_name, fill=CHARCOAL)
    
    x_tagline = center_offset - (tagline_width // 2)
    draw.text((x_tagline, y_tagline), text_tagline, font=font_tagline, fill=GRAPHITE)
    
    x_details = center_offset - (details_width // 2)
    draw.text((x_details, y_details), text_details, font=font_details, fill=SLATE)
    
    # Linie separatorie
    line_width = 100
    line_x = center_offset - (line_width // 2)
    draw.line([(line_x, y_separator), (line_x + line_width, y_separator)], fill=SILVER, width=2)
    
    # Telefon
    x_phone = center_offset - (phone_width // 2)
    draw.text((x_phone, y_phone), text_phone, font=font_phone, fill=CHARCOAL)
    
    # Salveaza
    img.save('carte_vizita_premium_accent.png', 'PNG', dpi=(300, 300))
    img.convert('RGB').save('carte_vizita_premium_accent.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_premium_accent.pdf', 'PDF', resolution=300)
    
    print("\nDesign cu accent lateral creat cu succes!")
    print("Fisiere generate:")
    print("  - carte_vizita_premium_accent.png")
    print("  - carte_vizita_premium_accent.jpg")
    print("  - carte_vizita_premium_accent.pdf")
    
    return img

if __name__ == "__main__":
    create_business_card_v2()
    create_business_card_v3_accent()
