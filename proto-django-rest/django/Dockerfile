# FROM python:3.7-alpine
# MAINTAINER London App Developer Ltd

# ENV PYTHONUNBUFFERED 1

# COPY ./requirements.txt /requirements.txt
# RUN apk add --update --no-cache postgresql-client jpeg-dev
# RUN apk add --update --no-cache --virtual .tmp-build-deps \
#       gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
# RUN pip install -r /requirements.txt
# RUN apk del .tmp-build-deps

# RUN mkdir /app
# WORKDIR /app
# COPY ./django-api1 /app

# RUN mkdir -p /vol/web/media
# RUN mkdir -p /vol/web/static
# RUN adduser -D user
# RUN chown -R user:user /vol/
# RUN chmod -R 755 /vol/web
# USER user
###################################

FROM python:3

ENV PYTHONUNBUFFERED 1


WORKDIR /app

#If we add the requirements and install dependencies first, docker can use cache if requirements don't change
ADD requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt
RUN adduser --disabled-password user
COPY ./django-api1 /app


#RUN mkdir -p /vol/web/media
#RUN mkdir -p /vol/web/static
#RUN chown -R user:user /vol/
#RUN chmod -R 755 /vol/web


RUN chown -R user:user /app/
RUN chmod -R 755 /app

USER user


# Migrate the database
RUN python manage.py makemigrations cauth
RUN python manage.py makemigrations microapi 
RUN python manage.py migrate
RUN python manage.py migrate  cauth
RUN python manage.py migrate microapi

CMD python manage.py runserver 0.0.0.0:8000

EXPOSE 8000
