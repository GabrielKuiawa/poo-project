FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install -g ts-node @types/node && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
