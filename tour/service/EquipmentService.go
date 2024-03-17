package service

import (
	"fmt"
	"tour/model"
	"tour/repo"
)

type EquipmentService struct {
	EquipmentRepo *repo.EquipmentRepository
}

func (service *EquipmentService) FindAllByTour() ([]model.Equipment, error) {
	equipments, err := service.EquipmentRepo.FindAllByTour()
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve tours: %w", err)
	}
	return equipments, nil
}
