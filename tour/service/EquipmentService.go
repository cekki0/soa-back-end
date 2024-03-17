package service

import (
	"fmt"
	"tour/model"
	"tour/repo"
)

type EquipmentService struct {
	EquipmentRepo *repo.EquipmentRepository
}

func (service *EquipmentService) FindAllByTour(id string) ([]model.Equipment, error) {
	equipments, err := service.EquipmentRepo.FindAllByTour(id)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve tours: %w", err)
	}
	return equipments, nil
}

func (service *EquipmentService) AddEquipmentToTour(equipmentID string, tourID string) (*model.Tour, error) {
	tour, err := service.EquipmentRepo.AddEquipmentToTour(equipmentID, tourID)
	if err != nil {
		return nil, fmt.Errorf(fmt.Sprintf("tour with id %s not found", tourID))
	}
	return tour, nil
}

func (service *EquipmentService) RemoveEquipmentToTour(equipmentID string, tourID string) (*model.Tour, error) {
	tour, err := service.EquipmentRepo.RemoveEquipmentToTour(equipmentID, tourID)
	if err != nil {
		return nil, fmt.Errorf(fmt.Sprintf("tour with id %s not found", tourID))
	}
	return tour, nil
}
