package model

type KeyPoint struct {
	Id                  int            `json:"Id"`
	TourID              int            `json:"TourId"`
	Tour                Tour           `json:"Tour" gorm:"-"`
	Name                string         `json:"Name"`
	Description         string         `json:"Description"`
	Longitude           float64        `json:"Longitude"`
	Latitude            float64        `json:"Latitude"`
	LocationAdress      string         `json:"LocationAdress"`
	ImagePath           string         `json:"ImagePath"`
	Order               float64        `json:"Order"`
	HasSecret           bool           `json:"HasSecret"`
	KeyPointSecret      KeyPointSecret `json:"KeyPointSecret" default:"null" gorm:"type:text"`
	IsEncounterRequired bool           `json:"IsEncounterRequired"`
	HasEncounter        bool           `json:"HasEncounter"`
}