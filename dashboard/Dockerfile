FROM node:16-alpine AS base

RUN apk update

RUN yarn global add turbo

WORKDIR /app

FROM base AS builder

COPY . .

COPY package*.json yarn.lock ./

RUN yarn install

RUN yarn build:dashboard

FROM base as dev

ENV NODE_ENV=dev

COPY --from=builder /app .

WORKDIR /app

EXPOSE 3000

CMD ["yarn", "start:dashboard"]
