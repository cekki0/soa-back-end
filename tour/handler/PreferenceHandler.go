package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"tour/model"
	"tour/service"

	"github.com/gorilla/mux"
)

type PreferenceHandler struct {
	PreferenceService *service.PreferenceService
}

func (handler *PreferenceHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var preference model.Preference
	err := json.NewDecoder(req.Body).Decode(&preference)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	createdPreference, err := handler.PreferenceService.Create(preference)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(createdPreference)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusCreated)
	writer.Write(jsonResponse)
}

func (handler *PreferenceHandler) FindByUserId(writer http.ResponseWriter, req *http.Request) {
	userId := mux.Vars(req)["touristId"]
	preference, err := handler.PreferenceService.FindByUserId(userId)
	fmt.Println(preference)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(preference)
}
