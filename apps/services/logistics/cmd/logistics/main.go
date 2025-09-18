package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

type healthResponse struct {
	Status string `json:"status"`
}

type quoteRequest struct {
	DistanceKm float64 `json:"distanceKm"`
}

type quoteResponse struct {
	Status string  `json:"status"`
	Eta    string  `json:"eta"`
	Cost   float64 `json:"cost"`
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(healthResponse{Status: "ok"})
}

func quoteHandler(w http.ResponseWriter, r *http.Request) {
	var req quoteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	eta := time.Now().Add(time.Duration(2+rand.Intn(6)) * time.Hour).UTC().Format(time.RFC3339)
	cost := 5 + req.DistanceKm*0.75

	resp := quoteResponse{Status: "planned", Eta: eta, Cost: cost}
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(resp)
}

func main() {
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/logistics/quote", quoteHandler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "4400"
	}
	log.Printf("logistics service listening on :%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("failed to start logistics service: %v", err)
	}
}
