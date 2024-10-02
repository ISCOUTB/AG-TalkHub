FROM python:3.12

RUN apt-get update && \
    apt-get install -yq tzdata &&\
    ln -fs /usr/share/zoneinfo/America/Bogota /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN mkdir /talkhub_backend
WORKDIR /talkhub_backend

COPY talkhub_backend/requirements.txt ./
RUN pip3 install -r requirements.txt

EXPOSE 8004

COPY talkhub_backend /talkhub_backend/

