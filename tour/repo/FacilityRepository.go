package repo

import (
	"fmt"
	"tour/model"

	"gorm.io/gorm"
)

type FacilityRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *FacilityRepository) FindByAuthor(authorId string) ([]model.Facility, error) {
	var facilities []model.Facility
	dbResult := repo.DatabaseConnection.Where("\"AuthorId\" = ?", authorId).Find(&facilities)
	if dbResult.Error != nil {
		return facilities, dbResult.Error
	}
	return facilities, nil
}

func (repo *FacilityRepository) Create(facility model.Facility) (model.Facility, error) {
	dbResult := repo.DatabaseConnection.Create(&facility)
	if dbResult.Error != nil {
		fmt.Println("greska")
		return model.Facility{}, dbResult.Error
	}
	return facility, nil
}
