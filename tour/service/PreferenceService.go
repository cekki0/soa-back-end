package service

import (
	"fmt"
	"tour/model"
	"tour/repo"
)

type PreferenceService struct {
	PreferenceRepo *repo.PreferenceRepository
}

func (service *PreferenceService) Create(preference model.Preference) (model.Preference, error) {
	createdPreference, err := service.PreferenceRepo.Create(preference)
	if err != nil {
		return model.Preference{}, err
	}
	return createdPreference, err
}

func (service *PreferenceService) FindByUserId(userId string) (*model.Preference, error) {
	preference, err := service.PreferenceRepo.FindByUserId(userId)
	if err != nil {
		return nil, fmt.Errorf(fmt.Sprintf("menu item with userId %s not found", userId))
	}
	return &preference, nil
}
