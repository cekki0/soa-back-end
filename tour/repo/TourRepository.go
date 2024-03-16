package repo

import (
	"fmt"
	"tour/model"

	"gorm.io/gorm"
)

type TourRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *TourRepository) FindById(id string) (model.Tour, error) {
	tour := model.Tour{}
	dbResult := repo.DatabaseConnection.Preload("KeyPoints").Preload("Reviews").First(&tour, `"Id" = ?`, id)
	if dbResult.Error != nil {
		return tour, dbResult.Error
	}
	return tour, nil
}

func (repo *TourRepository) Create(tour model.Tour) (model.Tour, error) {
	tour.Durations = model.TourDurations{}
	dbResult := repo.DatabaseConnection.Create(&tour)
	if dbResult.Error != nil {
		fmt.Println("greska")
		return model.Tour{}, dbResult.Error
	}
	fmt.Println("sacuvano")
	return tour, nil
}

func (repo *TourRepository) FindAll() ([]model.Tour, error) {
	var tours []model.Tour
	dbResult := repo.DatabaseConnection.Preload("KeyPoints").Preload("Reviews").Find(&tours)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return tours, nil
}
