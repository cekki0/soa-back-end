package handler

import (
	"encoding/json"
	"net/http"
	"tour/service"
)

type TourHandler struct {
	TourService *service.TourService
}

func (handler *TourHandler) Get(writer http.ResponseWriter, req *http.Request) {	
	tours, err := handler.TourService.Find()
	writer.Header().Set("Content-Type", "application/json")
	if err != nil {
		writer.WriteHeader(http.StatusNotFound)
		return
	}
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(tours)
}