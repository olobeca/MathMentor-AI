import sys
#sys.path.append(r'C:\Users\xandi\AppData\Roaming\Python\Python313\site-packages') //this was added to run a code on Windows   
print(">>> PYTHON EXECUTABLE:", sys.executable, file=sys.stderr)
print(">>> PATHS:", sys.path, file=sys.stderr)
import os

import pdfplumber



print("Start Python script", file=sys.stderr)
if len(sys.argv) <2:
    print("no python file provided")
    sys.exit(1)

pdf_file = sys.argv[1] 

print("Plik istnieje?", os.path.exists(pdf_file), file=sys.stderr)
print("Pełna ścieżka:", os.path.abspath(pdf_file), file=sys.stderr)

print(f"Processing file: {pdf_file}", file=sys.stderr)

try:
    with pdfplumber.open(pdf_file) as pdf:
        full_text = ""
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            print(f"Page {i+1} text: {repr(text)}", file=sys.stderr)
            if text:
                full_text += text + "\n"
    print(full_text)
except Exception as e:
    print(f"Error reading PDF file: {e}")
    sys.exit(1)
