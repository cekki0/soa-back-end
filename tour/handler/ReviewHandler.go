package handler

import (
	"encoding/json"
	"net/http"
	"tour/model"
	"tour/service"

	"github.com/gorilla/mux"
)

type ReviewHandler struct {
	ReviewService *service.ReviewService
}

func (handler *ReviewHandler) FindById(writer http.ResponseWriter, req *http.Request) {
	id := mux.Vars(req)["id"]
	review, err := handler.ReviewService.FindById(id)
	writer.Header().Set("Content-Type", "application/json")
	if err != nil {
		writer.WriteHeader(http.StatusNotFound)
		return
	}
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(review)
}

func (handler *ReviewHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var review model.Review
	err := json.NewDecoder(req.Body).Decode(&review)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err = handler.ReviewService.Create(review)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusCreated)
}

func (handler *ReviewHandler) FindAll(writer http.ResponseWriter, req *http.Request) {
	reviews, err := handler.ReviewService.FindAll()
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(reviews)
}
