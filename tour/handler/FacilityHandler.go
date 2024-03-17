package handler

import (
	"encoding/json"
	"net/http"
	"tour/model"
	"tour/service"

	"github.com/gorilla/mux"
)

type FacilityHandler struct {
	FacilityService *service.FacilityService
}

func (handler *FacilityHandler) FindByAuthor(writer http.ResponseWriter, req *http.Request) {
	authorId := mux.Vars(req)["authorId"]
	facilities, err := handler.FacilityService.FindByAuthor(authorId)
	writer.Header().Set("Content-Type", "application/json")
	if err != nil {
		writer.WriteHeader(http.StatusNotFound)
		return
	}
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(facilities)
}

func (handler *FacilityHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var facility model.Facility
	err := json.NewDecoder(req.Body).Decode(&facility)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	// Call the Create method in the service layer
	createedFacility, err := handler.FacilityService.Create(facility)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(createedFacility)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusCreated)
	writer.Write(jsonResponse)
}
