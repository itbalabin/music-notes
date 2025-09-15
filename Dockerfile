FROM python:3.12-slim

WORKDIR /app
COPY . .

EXPOSE 7900
CMD ["python", "-m", "http.server", "7900"]
