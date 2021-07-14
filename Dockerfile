# --------------> The installer image
FROM node:16-alpine AS installer

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile

# --------------> The builder image
FROM node:16-alpine AS builder

WORKDIR /app

COPY . .
RUN yarn install && yarn build

# --------------> The production image
FROM node:16-alpine

RUN apk add --no-cache tini

USER node
ENV NO_COLOR true
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --chown=node:node --from=installer /app/node_modules node_modules
COPY --chown=node:node --from=builder /app/dist dist

CMD ["/sbin/tini", "node", "dist/main"]
