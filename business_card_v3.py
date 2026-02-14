"""
Design Premium Carte de Vizita v3 - Antonio Daniel
Stil: Bold, modern, cu WhatsApp icon
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Dimensiuni carte de vizita standard (85mm x 55mm) la 300 DPI
WIDTH = 1004
HEIGHT = 650

# Culori premium + WhatsApp green
WHITE = (255, 255, 255)
CHARCOAL = (30, 30, 35)  # Aproape negru
GRAPHITE = (70, 70, 80)  # Gri inchis
SLATE = (90, 95, 110)  # Ardezie
SILVER = (170, 170, 175)  # Argintiu
WHATSAPP_GREEN = (37, 211, 102)  # Verde WhatsApp oficial
DARK_GREEN = (30, 170, 80)  # Verde mai inchis

def get_font(name, size, bold=False):
    """Incearca sa gaseasca un font disponibil"""
    font_paths = []
    
    if bold:
        variants = ['Bold', 'b', 'B', '-Bold', '']
    else:
        variants = ['Regular', 'r', 'R', '-Regular', 'Medium', 'SemiBold', '']
    
    # Fonturi moderne preferate
    modern_fonts = [name] if name else ['Montserrat', 'Poppins', 'Inter', 'Raleway', 
                                         'Lato', 'OpenSans', 'Roboto', 'Helvetica', 'Arial']
    
    windows_font_paths = [
        'C:/Windows/Fonts/',
        os.path.expanduser('~/AppData/Local/Microsoft/Windows/Fonts/'),
    ]
    
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
    
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass
    
    return ImageFont.load_default()

def draw_whatsapp_icon(draw, cx, cy, size=55):
    """Deseneaza o iconita WhatsApp simplificata"""
    # Cercul verde WhatsApp
    r = size // 2
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=WHATSAPP_GREEN, outline=DARK_GREEN, width=2)
    
    # Telefonul (linii simple)
    phone_w, phone_h = size * 0.5, size * 0.5
    px = cx - phone_w // 2
    py = cy - phone_h // 2 + 2
    
    # Desenare telefon stilizat in alb
    white = (255, 255, 255)
    
    # Corp telefon (rotunjit)
    margin = 8
    draw.rounded_rectangle(
        [px + margin, py + margin, px + phone_w - margin, py + phone_h - margin],
        radius=6, outline=white, width=3
    )
    
    # Receptorul telefonului (arc)
    draw.arc([px + 12, py + 15, px + phone_w - 12, py + phone_h - 10], 
             start=200, end=340, fill=white, width=3)

def create_business_card_v3():
    # Creeaza imaginea
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi MAI MARI si mai interesante
    font_name = get_font('Montserrat', 58, bold=True)  # NUME - foarte mare si bold
    font_name_sub = get_font('Inter', 24)  # Subtitlu optional
    font_tagline = get_font('Inter', 26)  # Tagline mai mare
    font_details = get_font('Inter', 22)  # Detalii mai vizibile
    font_phone = get_font('Montserrat', 80, bold=True)  # TELEFON - MASIV
    
    # Textul actualizat
    text_name = "Antonio Daniel"
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
    
    # === LAYOUT INTERESANT ===
    
    # Banda decorativa sus - accent modern
    draw.rectangle([0, 0, WIDTH, 6], fill=CHARCOAL)
    
    # NUMELE - mare, central, IMPACT
    y_name = 60
    x_name = (WIDTH - name_width) // 2
    draw.text((x_name, y_name), text_name, font=font_name, fill=CHARCOAL)
    
    # Linie sub nume - accent elegant
    line_name_w = min(name_width - 100, 200)
    line_name_x = (WIDTH - line_name_w) // 2
    draw.line([(line_name_x, y_name + name_height + 15), 
               (line_name_x + line_name_w, y_name + name_height + 15)], 
              fill=CHARCOAL, width=3)
    
    # Tagline sub nume
    y_tagline = y_name + name_height + 45
    x_tagline = (WIDTH - tagline_width) // 2
    draw.text((x_tagline, y_tagline), text_tagline, font=font_tagline, fill=GRAPHITE)
    
    # Detalii servicii - cu bullet vizibile
    y_details = y_tagline + 45
    x_details = (WIDTH - details_width) // 2
    draw.text((x_details, y_details), text_details, font=font_details, fill=SLATE)
    
    # === TELEFON + WHATSAPP - SECTIUNEA DOMINANTA ===
    icon_size = 70
    spacing = 25
    
    # Calculeaza pozitia grupului (icon + numar)
    total_width = icon_size + spacing + phone_width
    group_x = (WIDTH - total_width) // 2
    
    y_phone = HEIGHT - 170
    icon_cx = group_x + icon_size // 2
    icon_cy = y_phone + phone_height // 2 - 5
    
    # Deseneaza iconita WhatsApp
    draw_whatsapp_icon(draw, icon_cx, icon_cy, icon_size)
    
    # Deseneaza numarul langa icon
    phone_x = group_x + icon_size + spacing
    draw.text((phone_x, y_phone), text_phone, font=font_phone, fill=CHARCOAL)
    
    # Banda decorativa jos - simetrie
    draw.rectangle([0, HEIGHT - 6, WIDTH, HEIGHT], fill=WHATSAPP_GREEN)
    
    # Salveaza
    img.save('carte_vizita_whatsapp.png', 'PNG', dpi=(300, 300))
    img.convert('RGB').save('carte_vizita_whatsapp.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_whatsapp.pdf', 'PDF', resolution=300)
    
    print("Design WhatsApp creat cu succes!")
    print("Fisiere: carte_vizita_whatsapp.png/.jpg/.pdf")
    
    return img

def create_business_card_v3_alt():
    """Varianta alternativa - layout diferit, mai dinamic"""
    
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi
    font_name = get_font('Montserrat', 64, bold=True)  # Si mai mare
    font_tagline = get_font('Inter', 24)
    font_details = get_font('Inter', 20)
    font_phone = get_font('Montserrat', 72, bold=True)
    
    # Text
    text_name = "Antonio Daniel"
    text_tagline = "Ai nevoie de o cursa lunga?"
    text_details = "Aeroport  •  Orase  •  Curse lungi"
    text_phone = "0774 613 207"
    
    # Dimensiuni
    bbox_name = draw.textbbox((0, 0), text_name, font=font_name)
    name_width = bbox_name[2] - bbox_name[0]
    name_height = bbox_name[3] - bbox_name[1]
    
    bbox_phone = draw.textbbox((0, 0), text_phone, font=font_phone)
    phone_width = bbox_phone[2] - bbox_phone[0]
    phone_height = bbox_phone[3] - bbox_phone[1]
    
    # === DESIGN DIFERIT - BLOCS ===
    
    # Fundal cu block de culoare in stanga (modern)
    block_width = 280
    draw.rectangle([0, 0, block_width, HEIGHT], fill=(250, 250, 252))
    
    # Linie verticala accent
    draw.rectangle([block_width - 3, 0, block_width, HEIGHT], fill=WHATSAPP_GREEN)
    
    # Numele - in blockul stang, vertical sau normal
    y_name = 80
    x_name = 40
    draw.text((x_name, y_name), text_name, font=font_name, fill=CHARCOAL)
    
    # Sub nume - tagline
    y_tagline = y_name + name_height + 25
    draw.text((x_name, y_tagline), text_tagline, font=font_tagline, fill=GRAPHITE)
    
    # Detalii
    y_details = y_tagline + 50
    draw.text((x_name, y_details), text_details, font=font_details, fill=SLATE)
    
    # === WHATSAPP + TELEFON in dreapta, jos ===
    icon_size = 65
    spacing = 20
    
    right_area_x = block_width + 50
    right_area_w = WIDTH - right_area_x - 50
    
    total_phone_w = icon_size + spacing + phone_width
    phone_start_x = block_width + 50 + (right_area_w - total_phone_w) // 2
    
    y_phone = HEIGHT - 160
    icon_cx = phone_start_x + icon_size // 2
    icon_cy = y_phone + phone_height // 2 - 5
    
    # Icon WhatsApp
    draw_whatsapp_icon(draw, icon_cx, icon_cy, icon_size)
    
    # Numar
    draw.text((phone_start_x + icon_size + spacing, y_phone), 
              text_phone, font=font_phone, fill=CHARCOAL)
    
    # Salveaza
    img.save('carte_vizita_whatsapp_alt.png', 'PNG', dpi=(300, 300))
    img.convert('RGB').save('carte_vizita_whatsapp_alt.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_whatsapp_alt.pdf', 'PDF', resolution=300)
    
    print("\nDesign alternativ creat!")
    print("Fisiere: carte_vizita_whatsapp_alt.png/.jpg/.pdf")
    
    return img

if __name__ == "__main__":
    create_business_card_v3()
    create_business_card_v3_alt()
