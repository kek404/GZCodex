FROM python:3.11-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1
COPY apps/agents/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/agents/src ./src
EXPOSE 4500
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "4500"]
