package repo

import (
	"tour/model"

	"gorm.io/gorm"
)

type KeyPointRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *KeyPointRepository) FindById(id string) (model.KeyPoint, error) {
	keyoint := model.KeyPoint{}
	dbResult := repo.DatabaseConnection.First(&keyoint, `"Id" = ?`, id)
	if dbResult.Error != nil {
		return keyoint, dbResult.Error
	}
	return keyoint, nil
}

func (repo *KeyPointRepository) Create(keyPoint model.KeyPoint) error {
	dbResult := repo.DatabaseConnection.Create(&keyPoint)
	if dbResult.Error != nil {
		return dbResult.Error
	}
	return nil
}

func (repo *KeyPointRepository) FindAll() ([]model.KeyPoint, error) {
	var keyPoints []model.KeyPoint
	dbResult := repo.DatabaseConnection.Find(&keyPoints)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return keyPoints, nil
}
