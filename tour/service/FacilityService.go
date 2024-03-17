package service

import (
	"fmt"
	"tour/model"
	"tour/repo"
)

type FacilityService struct {
	FacilityRepo *repo.FacilityRepository
}

func (service *FacilityService) FindByAuthor(authorId string) ([]model.Facility, error) {
	facilities, err := service.FacilityRepo.FindByAuthor(authorId)
	if err != nil {
		return nil, fmt.Errorf(fmt.Sprintf("menu item with authorId %s not found", authorId))
	}
	return facilities, nil
}

func (service *FacilityService) Create(facility model.Facility) (model.Facility, error) {
	createdFacility, err := service.FacilityRepo.Create(facility)
	if err != nil {
		return model.Facility{}, err
	}
	return createdFacility, nil
}
