"""
Design v4 - Antonio Daniel
Iconita FLAT + textele la JUMATATE intre nume si telefon
"""

from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1004
HEIGHT = 650

WHITE = (255, 255, 255)
CHARCOAL = (35, 35, 40)
GRAPHITE = (90, 90, 100)
SLATE = (70, 75, 95)
SILVER = (200, 200, 200)

def load_font(size, bold=False):
    base = 'C:/Windows/Fonts/'
    if bold:
        names = ['Roboto-Bold.ttf', 'arialbd.ttf']
    else:
        names = ['Roboto-Regular.ttf', 'arial.ttf']
    
    for name in names:
        path = base + name
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass
    return ImageFont.load_default()

def draw_phone_flat(draw, cx, cy, size=50):
    """Iconita de telefon FLAT, minimalista"""
    w = int(size * 0.5)
    h = int(size * 0.85)
    x = cx - w // 2
    y = cy - h // 2
    
    # Telefon simplu, flat
    # Chenar rotunjit
    draw.rounded_rectangle([x, y, x + w, y + h], radius=10, outline=CHARCOAL, width=3)
    # Ecran (linie sus)
    draw.line([(x + 6, y + 12), (x + w - 6, y + 12)], fill=CHARCOAL, width=3)
    # Buton jos (punct)
    r = 3
    draw.ellipse([cx - r, y + h - 12 - r, cx + r, y + h - 12 + r], fill=CHARCOAL)

def create():
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi - putin mai mari
    font_name = load_font(56, bold=True)
    font_tag = load_font(28)
    font_det = load_font(26)
    font_phone = load_font(72, bold=True)
    
    name = "Antonio Daniel"
    tag = "Ai nevoie de o cursă lungă?"
    det = "Aeroport • Orașe • România"
    phone = "0774 613 207"
    
    # Calculeaza dimensiuni
    bbox = draw.textbbox((0, 0), name, font=font_name)
    name_w, name_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    bbox = draw.textbbox((0, 0), tag, font=font_tag)
    tag_w, tag_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    bbox = draw.textbbox((0, 0), det, font=font_det)
    det_w, det_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    bbox = draw.textbbox((0, 0), phone, font=font_phone)
    phone_w, phone_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    # === POZITIONARE ===
    # Nume sus
    y_name = 80
    draw.text(((WIDTH - name_w) // 2, y_name), name, font=font_name, fill=CHARCOAL)
    
    # Linie sub nume
    line_y = y_name + name_h + 30
    draw.line([(180, line_y), (WIDTH - 180, line_y)], fill=SILVER, width=1)
    
    # Telefon jos - pozitia lui
    y_phone = HEIGHT - 150
    
    # === TEXTELE LA JUMATATE intre nume si telefon ===
    # Calculeaza mijlocul intre linie si telefon
    mid_y = (line_y + y_phone) // 2
    
    # Tagline si detalii centrate pe mijloc
    total_text_height = tag_h + 20 + det_h  # spatiu intre ele
    y_tag = mid_y - total_text_height // 2
    y_det = y_tag + tag_h + 20
    
    draw.text(((WIDTH - tag_w) // 2, y_tag), tag, font=font_tag, fill=GRAPHITE)
    draw.text(((WIDTH - det_w) // 2, y_det), det, font=font_det, fill=SLATE)
    
    # === TELEFON + ICON FLAT ===
    icon_size = 55
    spacing = 20
    
    total_w = icon_size + spacing + phone_w
    start_x = (WIDTH - total_w) // 2
    
    # Iconita - aliniata pe CENTRUL textului (nu sus/jos)
    phone_center_y = y_phone + phone_h // 2
    icon_cx = start_x + icon_size // 2
    draw_phone_flat(draw, icon_cx, phone_center_y, icon_size)
    
    # Numar telefon
    draw.text((start_x + icon_size + spacing, y_phone), phone, font=font_phone, fill=CHARCOAL)
    
    # Salveaza
    img.save('carte_vizita_v4.png', 'PNG', dpi=(300, 300))
    img.save('carte_vizita_v4.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_v4.pdf', 'PDF', resolution=300)
    
    print("Design v4 creat!")
    print("Fisiere: carte_vizita_v4.png/.jpg/.pdf")
    return img

if __name__ == "__main__":
    create()
