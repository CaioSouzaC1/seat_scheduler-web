FROM node:20.12.2-alpine3.18 as base

# All deps stage
FROM base as deps

WORKDIR /app

ADD package.json ./

RUN npm install -g pnpm && pnpm install

EXPOSE 3000

CMD [ "pnpm" ]
