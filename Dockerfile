FROM node:16

RUN npm install -g npm@8.1.3

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]