package repo

import (
	"tour/model"

	"gorm.io/gorm"
)

type TourRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *TourRepository) FindById(id string) (model.Tour, error) {
	tour := model.Tour{}
	dbResult := repo.DatabaseConnection.First(&tour, "Id = ?", id)
	if dbResult != nil {
		return tour, dbResult.Error
	}
	return tour, nil
}

func (repo *TourRepository) Create(tour model.Tour) error {	
	dbResult := repo.DatabaseConnection.Create(&tour)
	if dbResult.Error != nil {
		return dbResult.Error
	}
	return nil
}

func (repo *TourRepository) FindAll() ([]model.Tour, error) {		
	var tours []model.Tour
	dbResult := repo.DatabaseConnection.Find(&tours)	
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return tours, nil
}
