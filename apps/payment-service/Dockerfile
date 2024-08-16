FROM --platform=linux/amd64 node:20.11.1-alpine

WORKDIR /app

EXPOSE 83

COPY package.json yarn.lock ./apps/payment-service/

RUN yarn install

COPY . ./

CMD ["yarn", "start"]
