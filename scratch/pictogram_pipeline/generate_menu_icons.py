#!/usr/bin/env python3
"""
Gera os 6 pictogramas cerâmicos do Menu & Ajustes, anexando um home-pictogram
como referência de estilo (regra de ouro do PROMPTS_PICTOGRAMAS.md).
"""
import os
import sys
import time

from google import genai
from google.genai import types

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("Error: GEMINI_API_KEY not set")
    sys.exit(1)

MODEL = "gemini-3-pro-image-preview"
REFERENCE_IMAGE = "assets/illustrations/home-pictograms/minha-saude.png"
OUT_DIR = "scratch/pictogram_pipeline/menu_raw"

STYLE_PREFIX = """3D premium pictogram, glossy vitrified ceramic material, deep forest green
color (#0E3B3B), soft specular highlights, friendly rounded shapes, single
centered symbol, clear readability at small size, inside its own rounded-square
cream ceramic tile with a glossy deep forest green 3D frame, exactly like the
reference image. Isolated on a pure white background, no shadow cast outside
the tile, no text. Same visual language, material, lighting and camera as the
reference image.
Subject: """

SUBJECTS = {
    "pictogram-menu-acessibilidade.png": "a large friendly rounded eye symbol with a simplified iris, symbolizing visibility and accessibility",
    "pictogram-menu-idioma.png": "a speech bubble drawn ONLY as a bold hollow outline (not filled solid, the cream tile color shows through the inside of the bubble), containing a large simplified globe icon (longitude/latitude lines) that fills most of the bubble's interior, symbolizing language",
    "pictogram-menu-contato.png": "a rounded envelope with a small phone handset resting beside it",
    "pictogram-menu-sobre.png": "a rounded info badge circle with a bold simplified lowercase letter i in the center",
    "pictogram-menu-termos.png": "a folded document sheet with a checkmark badge and a few simplified horizontal text lines",
    "pictogram-menu-privacidade.png": "a rounded shield with a small keyhole symbol in the center",
}


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    client = genai.Client(api_key=API_KEY)

    with open(REFERENCE_IMAGE, "rb") as f:
        ref_bytes = f.read()
    ref_part = types.Part.from_bytes(data=ref_bytes, mime_type="image/png")

    for filename, subject in SUBJECTS.items():
        out_path = os.path.join(OUT_DIR, filename)
        prompt = STYLE_PREFIX + subject
        print(f"Generating {filename} ...")
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=[ref_part, prompt],
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                    image_config=types.ImageConfig(aspect_ratio="4:3"),
                    safety_settings=[
                        types.SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="BLOCK_LOW_AND_ABOVE"),
                        types.SafetySetting(category="HARM_CATEGORY_DANGEROUS_CONTENT", threshold="BLOCK_LOW_AND_ABOVE"),
                        types.SafetySetting(category="HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold="BLOCK_LOW_AND_ABOVE"),
                        types.SafetySetting(category="HARM_CATEGORY_HARASSMENT", threshold="BLOCK_LOW_AND_ABOVE"),
                    ],
                ),
            )
            image_data = None
            for part in response.candidates[0].content.parts:
                if getattr(part, "inline_data", None) and part.inline_data.mime_type.startswith("image/"):
                    image_data = part.inline_data.data
                    break
            if not image_data:
                print(f"  FAILED (no image returned) for {filename}")
                continue
            with open(out_path, "wb") as f:
                f.write(image_data)
            print(f"  saved {out_path} ({len(image_data)} bytes)")
        except Exception as e:
            print(f"  ERROR generating {filename}: {e}")
        time.sleep(2)


if __name__ == "__main__":
    main()
