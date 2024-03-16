package repo

import (
	"tour/model"

	"gorm.io/gorm"
)

type PreferenceRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *PreferenceRepository) Create(preference model.Preference) (model.Preference, error) {
	dbResult := repo.DatabaseConnection.Create(&preference)
	if dbResult.Error != nil {
		return model.Preference{}, dbResult.Error
	}
	return preference, nil
}

func (repo *PreferenceRepository) FindByUserId(userId string) (model.Preference, error) {
	preference := model.Preference{}
	dbResult := repo.DatabaseConnection.First(&preference, `"UserId" = ?`, userId)
	if dbResult.Error != nil {
		return preference, dbResult.Error
	}

	return preference, nil
}
