package handler

import (
	"encoding/json"
	"net/http"
	"tour/model"
	"tour/service"

	"github.com/gorilla/mux"
)

type KeyPointHanlder struct {
	KeyPointService *service.KeyPointService
}

func (handler *KeyPointHanlder) FindById(writer http.ResponseWriter, req *http.Request) {
	id := mux.Vars(req)["id"]
	keyPoint, err := handler.KeyPointService.FindById(id)
	writer.Header().Set("Content-Type", "application/json")
	if err != nil {
		writer.WriteHeader(http.StatusNotFound)
		return
	}
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(keyPoint)
}

func (handler *KeyPointHanlder) Create(writer http.ResponseWriter, req *http.Request) {
	var keyPoint model.KeyPoint
	err := json.NewDecoder(req.Body).Decode(&keyPoint)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	response, err := handler.KeyPointService.Create(keyPoint)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusCreated)
	json.NewEncoder(writer).Encode(response)
}

func (handler *KeyPointHanlder) FindAll(writer http.ResponseWriter, req *http.Request) {
	keyPoints, err := handler.KeyPointService.FindAll()
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(keyPoints)
}
