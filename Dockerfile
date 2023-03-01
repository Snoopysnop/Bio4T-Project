FROM python:3.9-slim-buster
ENV PYTHONUNBUFFERED = 1
WORKDIR /django
COPY interface .
RUN pip3 install -r requirements.txt
