FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install --save govuk-frontend@3.3.0

RUN npm install -g gulp

RUN npm install gulp

RUN npm rebuild node-sass

RUN gulp build:dist


EXPOSE 3000

CMD ["npm", "run", "start"]