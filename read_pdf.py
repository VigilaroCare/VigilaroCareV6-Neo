import fitz
import sys

def main():
    try:
        # Tenta abrir o arquivo com acentos (usando byte string literal ou u-string)
        filepath = r'C:\Users\User\Documents\Guia completo de saúde para pets idosos.pdf'
        doc = fitz.open(filepath)
        text = '\n'.join([page.get_text() for page in doc])
        with open('pdf_output.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main()
