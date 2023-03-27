FROM golang:alpine

RUN apk update; \
    apk add --no-cache git  \
    bash  \
    build-base;

RUN mkdir /app-back
WORKDIR /app-back

COPY back .

RUN go mod tidy

# Setup hot-reload for dev
RUN go install -mod=mod github.com/githubnemo/CompileDaemon
RUN go get -v golang.org/x/tools/gopls

ENTRYPOINT CompileDaemon -build="go build -o back ." --command=./back
