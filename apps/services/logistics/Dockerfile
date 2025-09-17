FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o logistics ./cmd/logistics

FROM alpine:3.19
WORKDIR /srv
COPY --from=builder /app/logistics ./logistics
EXPOSE 4400
CMD ["./logistics"]
