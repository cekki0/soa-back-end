FROM golang:latest

WORKDIR /go

COPY go.mod .
COPY go.sum .
RUN go mod download
RUN go get github.com/gin-contrib/cors
COPY . .
RUN go build -o ./build/tour
ENTRYPOINT ["./build/tour"]