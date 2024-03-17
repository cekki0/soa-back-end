package repo

import (
	"tour/model"

	"gorm.io/gorm"
)

type ReviewRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *ReviewRepository) FindById(id string) (model.Review, error) {
	review := model.Review{}
	dbResult := repo.DatabaseConnection.First(&review, `"Id" = ?`, id)
	if dbResult.Error != nil {
		return review, dbResult.Error
	}
	return review, nil
}

func (repo *ReviewRepository) Create(review model.Review) (model.Review, error) {
	dbResult := repo.DatabaseConnection.Create(&review)
	if dbResult.Error != nil {
		return review, dbResult.Error
	}
	return review, nil
}

func (repo *ReviewRepository) FindAll() ([]model.Review, error) {
	var reviews []model.Review
	dbResult := repo.DatabaseConnection.Find(&reviews)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return reviews, nil
}
