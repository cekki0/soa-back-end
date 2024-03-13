package model

type KeyPoint struct {
	ID                  int            `json:"id"`
	TourID              int            `json:"tourId"`
	Tour                Tour           `json:"tour" gorm:"-"`
	Name                string         `json:"name"`
	Description         string         `json:"description"`
	Longitude           float64        `json:"longitude"`
	Latitude            float64        `json:"latitude"`
	LocationAdress      string         `json:"locationAdress"`
	ImagePath           string         `json:"imagePath"`
	Order               float64        `json:"order"`
	HasSecret           bool           `json:"hasSecret"`
	KeyPointSecret      KeyPointSecret `json:"keyPointSecret" default:"null" gorm:"type:text"`
	IsEncounterRequired bool           `json:"isEncounterRequired"`
	HasEncounter        bool           `json:"hasEncounter"`
}