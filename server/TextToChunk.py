from langchain_text_splitters import RecursiveCharacterTextSplitter
import sys

print("Start Python script Texttochunk", file=sys.stderr)
if len(sys.argv) <2:
    print("no python file provided")
    sys.exit(1)

pdf_file = sys.argv[1]
print(f"Processing file: {pdf_file}", file=sys.stderr)
state_of_the_union = pdf_file

text_splitter = RecursiveCharacterTextSplitter(
    # Set a really small chunk size, just to show.
    chunk_size=100,
    chunk_overlap=20,
    length_function=len,
    is_separator_regex=False,
)
texts = text_splitter.create_documents([state_of_the_union])

for i in texts:
    print(i)