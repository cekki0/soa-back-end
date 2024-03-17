package handler

import (
	"encoding/json"
	"net/http"
	"tour/service"

	"github.com/gorilla/mux"
)

type EquipmentHandler struct {
	EquipmentService *service.EquipmentService
}

func (handler *EquipmentHandler) FindAllByTour(writer http.ResponseWriter, req *http.Request) {
	id := mux.Vars(req)["id"]
	equipments, err := handler.EquipmentService.FindAllByTour(id)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(equipments)
}

func (handler *EquipmentHandler) AddEquipmentToTour(writer http.ResponseWriter, req *http.Request) {
	equipmentID := mux.Vars(req)["equipmentId"]
	tourID := mux.Vars(req)["tourId"]
	tour, err := handler.EquipmentService.AddEquipmentToTour(equipmentID, tourID)
	writer.Header().Set("Content-Type", "application/json")
	if err != nil {
		writer.WriteHeader(http.StatusNotFound)
		return
	}
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(tour)
}

func (handler *EquipmentHandler) RemoveEquipmentToTour(writer http.ResponseWriter, req *http.Request) {
	equipmentID := mux.Vars(req)["equipmentId"]
	tourID := mux.Vars(req)["tourId"]
	tour, err := handler.EquipmentService.RemoveEquipmentToTour(equipmentID, tourID)
	writer.Header().Set("Content-Type", "application/json")
	if err != nil {
		writer.WriteHeader(http.StatusNotFound)
		return
	}
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(tour)
}
