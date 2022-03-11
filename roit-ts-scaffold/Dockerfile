FROM node:14 as builder

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine

COPY --from=builder ./usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
