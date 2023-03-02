FROM python:latest

WORKDIR /usr/local/app

COPY . .

RUN pip install -r requirements.txt

CMD [ "python", "apiFlask.py" ]

EXPOSE 5000