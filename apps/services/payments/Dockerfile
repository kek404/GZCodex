FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o payments ./cmd/payments

FROM alpine:3.19
WORKDIR /srv
COPY --from=builder /app/payments ./payments
EXPOSE 4300
CMD ["./payments"]
