package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestChargeHandler(t *testing.T) {
	body := bytes.NewBufferString(`{"amount":10.5,"currency":"EUR"}`)
	req := httptest.NewRequest(http.MethodPost, "/payments/charge", body)
	rec := httptest.NewRecorder()

	chargeHandler(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}
}
