FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o orders ./cmd/orders

FROM alpine:3.19
WORKDIR /srv
COPY --from=builder /app/orders ./orders
EXPOSE 4200
CMD ["./orders"]
