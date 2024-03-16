package service

import (
	"fmt"
	"tour/model"
	"tour/repo"
)

type TourService struct {
	TourRepo *repo.TourRepository
}

func (service *TourService) FindById(id string) (*model.Tour, error) {
	tour, err := service.TourRepo.FindById(id)
	if err != nil {
		return nil, fmt.Errorf(fmt.Sprintf("menu item with id %s not found", id))
	}
	return &tour, nil
}

func (service *TourService) Create(tour model.Tour) (model.Tour, error) {
	createdTour, err := service.TourRepo.Create(tour)
	if err != nil {
		return model.Tour{}, err
	}
	return createdTour, nil
}

func (service *TourService) FindAll() ([]model.Tour, error) {
	tours, err := service.TourRepo.FindAll()
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve tours: %w", err)
	}
	return tours, nil
}
