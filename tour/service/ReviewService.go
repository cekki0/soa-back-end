package service

import (
	"fmt"
	"tour/model"
	"tour/repo"
)

type ReviewService struct {
	ReviewRepo *repo.ReviewRepository
}

func (service *ReviewService) FindById(id string) (*model.Review, error) {
	review, err := service.ReviewRepo.FindById(id)
	if err != nil {
		return nil, fmt.Errorf("failed to find review with ID %s: %w", id, err)
	}
	return &review, nil
}

func (service *ReviewService) Create(review model.Review) (model.Review, error) {
	createdReview, err := service.ReviewRepo.Create(review)
	if err != nil {
		return model.Review{}, fmt.Errorf("failed to create review: %w", err)
	}
	return createdReview, nil
}

func (service *ReviewService) FindAll() ([]model.Review, error) {
	reviews, err := service.ReviewRepo.FindAll()
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve reviews: %w", err)
	}
	return reviews, nil
}
