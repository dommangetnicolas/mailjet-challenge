FROM node:18-alpine

RUN apk update; \
    apk add --no-cache \
        python3 \
        make \
        g++ \
        yarn;

RUN mkdir /app-front
WORKDIR /app-front

COPY front .

CMD ["yarn", "start"]
