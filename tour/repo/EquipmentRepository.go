package repo

import (
	"tour/model"

	"gorm.io/gorm"
)

type EquipmentRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *EquipmentRepository) FindAllByTour() ([]model.Equipment, error) {
	var equipments []model.Equipment
	dbResult := repo.DatabaseConnection.Preload("Tours").Find(&equipments)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return equipments, nil
}
