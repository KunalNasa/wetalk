FROM node:23-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY ./backend ./backend

COPY ./nodemon.json ./nodemon.json
COPY ./tsconfig.json ./tsconfig.json


EXPOSE 8080

CMD [ "npm", "run", "dev" ]
