package repo

import (
	"fmt"
	"strconv"
	"tour/model"

	"gorm.io/gorm"
)

type EquipmentRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *EquipmentRepository) FindAllByTour(id string) ([]model.Equipment, error) {
	var equipments []model.Equipment
	dbResult := repo.DatabaseConnection.
		Joins(`JOIN "tours"."TourEquipments" ON "tours"."TourEquipments"."EquipmentID" = "tours"."Equipment"."Id"`).
		Where(`"tours"."TourEquipments"."TourID" = ?`, id).
		Find(&equipments)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return equipments, nil
}

func (repo *EquipmentRepository) AddEquipmentToTour(equipmentID string, tourID string) (*model.Tour, error) {
	equipmentIDInt, err := strconv.Atoi(equipmentID)
	if err != nil {
		return nil, err
	}
	tourIDInt, err := strconv.Atoi(tourID)
	if err != nil {
		return nil, err
	}
	fmt.Println("udje ovde ipak")
	tourEquipment := model.TourEquipment{
		EquipmentID: equipmentIDInt,
		TourID:      tourIDInt,
	}

	dbResult := repo.DatabaseConnection.Create(&tourEquipment)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}

	return nil, nil
}

func (repo *EquipmentRepository) RemoveEquipmentToTour(equipmentID string, tourID string) (*model.Tour, error) {
	equipmentIDInt, err := strconv.Atoi(equipmentID)
	if err != nil {
		return nil, err
	}
	tourIDInt, err := strconv.Atoi(tourID)
	if err != nil {
		return nil, err
	}
	fmt.Println("udje ovde ipak")
	tourEquipment := model.TourEquipment{
		EquipmentID: equipmentIDInt,
		TourID:      tourIDInt,
	}

	dbResult := repo.DatabaseConnection.Delete(&tourEquipment)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}

	return nil, nil
}
