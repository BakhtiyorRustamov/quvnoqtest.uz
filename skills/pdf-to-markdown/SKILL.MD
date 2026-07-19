---
name: pdf-to-markdown
description: Convert PDF files to token-efficient Markdown before reading them. Use whenever the user asks Claude to read, summarize, search, or answer questions about a PDF book or document in the project folder, instead of loading the raw PDF.
---

# PDF to Markdown

## Purpose
Reading raw PDFs is token-expensive. This skill converts a PDF to Markdown
using the local `markitdown` CLI (run via Desktop Commander), caches the
result next to the PDF, and reads the Markdown instead.

## Instructions
1. Identify the target PDF's full path (e.g. C:\Users\user\q\112-117.pdf).
2. Compute the cached Markdown path: same path with `.md` instead of `.pdf`
   (e.g. C:\Users\user\q\112-117.md).
3. Check whether the `.md` file already exists.
   - If it exists and is newer than the PDF, read it directly. Do NOT reconvert.
   - Otherwise, convert it (step 4).
4. Convert using Desktop Commander to run:
   `markitdown "<pdf_path>" -o "<md_path>"`
   (If `markitdown` is not on PATH, use `python -m markitdown "<pdf_path>" -o "<md_path>"`.)
5. Read the resulting `.md` file and use it to answer the user's request.
6. Never load the raw PDF into context when a Markdown version is available.

## Notes
- Only convert PDFs the user actually asks about (on demand), one at a time.
- If conversion fails, report the error output rather than guessing at contents.