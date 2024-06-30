FROM node:18

WORKDIR /userManagerApp
COPY package.json ./
RUN yarn install

COPY . .

CMD yarn start
