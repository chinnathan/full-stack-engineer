FROM node:16-alpine AS base

RUN apk update

RUN yarn global add turbo

WORKDIR /app

FROM base AS builder

COPY . .

COPY package*.json yarn.lock ./

RUN yarn install

RUN yarn build:api

FROM base as dev

ENV NODE_ENV=dev

COPY --from=builder /app .

WORKDIR /app

EXPOSE 3001

CMD ["yarn", "start:api"]
