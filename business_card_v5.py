"""
Design v5 - Antonio Daniel
Fara iconita, doar numarul centrat
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

def create():
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    # Fonturi
    font_name = load_font(56, bold=True)
    font_tag = load_font(28)
    font_det = load_font(26)
    font_phone = load_font(76, bold=True)  # Si mai mare
    
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
    
    # Telefon jos
    y_phone = HEIGHT - 150
    
    # === TEXTELE LA JUMATATE intre linie si telefon ===
    mid_y = (line_y + y_phone) // 2
    
    total_text_height = tag_h + 20 + det_h
    y_tag = mid_y - total_text_height // 2
    y_det = y_tag + tag_h + 20
    
    draw.text(((WIDTH - tag_w) // 2, y_tag), tag, font=font_tag, fill=GRAPHITE)
    draw.text(((WIDTH - det_w) // 2, y_det), det, font=font_det, fill=SLATE)
    
    # === DOAR NUMARUL (fara iconita) ===
    draw.text(((WIDTH - phone_w) // 2, y_phone), phone, font=font_phone, fill=CHARCOAL)
    
    # Salveaza
    img.save('carte_vizita_finala.png', 'PNG', dpi=(300, 300))
    img.save('carte_vizita_finala.jpg', 'JPEG', quality=95, dpi=(300, 300))
    img.save('carte_vizita_finala.pdf', 'PDF', resolution=300)
    
    print("Design FINAL creat!")
    print("Fisiere: carte_vizita_finala.png/.jpg/.pdf")
    return img

if __name__ == "__main__":
    create()
