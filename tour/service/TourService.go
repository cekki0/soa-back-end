package service

import (
	"fmt"
	"tour/repo"
)

type TourService struct {
	TourRepo *repo.TourRepository
}

func (service *TourService) Find() (*model.Tour, error) {
	tours, err := service.TourRepo.Find()
	if err != nil {
		return nil, fmt.Errorf(fmt.Sprintf("not found"))
	}
	
	return tours, nil
}