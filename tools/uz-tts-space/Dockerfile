FROM python:3.11-slim
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user PATH=/home/user/.local/bin:$PATH HF_HOME=/home/user/.cache/huggingface
WORKDIR /home/user/app
COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt
COPY --chown=user . .
# download the model at build time so the first request is fast
RUN python -c "from transformers import AutoTokenizer, VitsModel; m='facebook/mms-tts-uzb-script_cyrillic'; AutoTokenizer.from_pretrained(m); VitsModel.from_pretrained(m)"
EXPOSE 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
