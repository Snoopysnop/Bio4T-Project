FROM python:latest

WORKDIR /usr/local/app/backend

COPY . .

RUN pip install -r requirements.txt

RUN apt-get update && \
    apt-get install -y netcat

EXPOSE 5000