# syntax=docker/dockerfile:1

FROM python:3.8
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN chmod +x /app/start_TicTacToe_back.sh
EXPOSE 8080
CMD ["/app/start_TicTacToe_back.sh"]
