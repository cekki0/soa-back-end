package handler

import (
	"encoding/json"
	"net/http"
	"tour/service"
)

type EquipmentHandler struct {
	EquipmentService *service.EquipmentService
}

func (handler *EquipmentHandler) FindAllByTour(writer http.ResponseWriter, req *http.Request) {
	equipments, err := handler.EquipmentService.FindAllByTour()
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(equipments)
}
