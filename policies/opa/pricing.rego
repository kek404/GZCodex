package echo.pricing

default allow = false

allow {
  input.price >= input.min_floor
}
