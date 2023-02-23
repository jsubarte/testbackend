FROM node:16-alpine3.17

RUN mkdir -p /var/www/TestBackend
WORKDIR /var/www/TestBackend

COPY . /var/www/TestBackend
COPY package.json /var/www/TestBackend

RUN npm install

CMD [ "npm","start" ]