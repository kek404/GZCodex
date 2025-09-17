package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestQuoteHandler(t *testing.T) {
	payload := bytes.NewBufferString(`{"distanceKm":12}`)
	req := httptest.NewRequest(http.MethodPost, "/logistics/quote", payload)
	rec := httptest.NewRecorder()

	quoteHandler(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}
}
