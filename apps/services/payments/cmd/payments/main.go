package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type healthResponse struct {
	Status string `json:"status"`
}

type chargeRequest struct {
	Amount   float64 `json:"amount"`
	Currency string  `json:"currency"`
}

type chargeResponse struct {
	Status string  `json:"status"`
	Amount float64 `json:"amount"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(healthResponse{Status: "ok"})
}

func chargeHandler(w http.ResponseWriter, r *http.Request) {
	var req chargeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	resp := chargeResponse{Status: "authorized", Amount: req.Amount}
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(resp)
}

func main() {
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/payments/charge", chargeHandler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "4300"
	}
	log.Printf("payments service listening on :%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("failed to start payments service: %v", err)
	}
}
