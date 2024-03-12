package repo

import "gorm.io/gorm"

type TourRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *TourRepository) Find() ([]model.Tour, error) {
	var tours []Tour
	dbResult := repo.DatabaseConnection.Find(&tours)
	if dbResult != nil {
		return tours, dbResult.Error
	}

	return tours, nil
}