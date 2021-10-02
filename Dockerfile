FROM node:10.16-alpine as frontend

RUN mkdir /frontend

WORKDIR /frontend

COPY ./frontend .
RUN npm install --silent
RUN npm run build


FROM ubuntu:20.04 as backend

# RUN apt-get update && apt-get -y install gcc nodejs
RUN apt-get update \
    && apt-get install -y curl gcc g++ python default-jdk \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs

RUN mkdir /app

# Working directory be app
WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install --silent

# copy local files to app folder
COPY ./backend .

COPY --from=frontend /frontend/build ./build


EXPOSE 8080



ENTRYPOINT npm start
