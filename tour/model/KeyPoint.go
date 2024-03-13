package model

type KeyPoint struct {
	Id                  int            `json:"Id" gorm:"column:Id"`
	IsDeleted           bool           `json:"IsDeleted" gorm:"column:IsDeleted"`
	TourID              int            `json:"TourId" gorm:"column:TourId"`
	Tour                Tour           `json:"Tour" gorm:"-:all"`
	Name                string         `json:"Name" gorm:"column:Name"`
	Description         string         `json:"Description" gorm:"column:Description"`
	Longitude           float64        `json:"Longitude" gorm:"column:Longitude"`
	Latitude            float64        `json:"Latitude" gorm:"column:Latitude"`
	LocationAddress     string         `json:"LocationAddress" gorm:"column:LocationAddress"`
	ImagePath           string         `json:"ImagePath" gorm:"column:ImagePath"`
	Order               float64        `json:"Order" gorm:"column:Order"`
	HaveSecret          bool           `json:"HaveSecret" gorm:"column:HaveSecret"`
	Secret              KeyPointSecret `json:"Secret" default:"null" gorm:"type:text;column:Secret"`
	IsEncounterRequired bool           `json:"IsEncounterRequired" gorm:"column:IsEncounterRequired"`
	HasEncounter        bool           `json:"HasEncounter" gorm:"column:HasEncounter"`
}

func (KeyPoint) TableName() string {
	return `tours."KeyPoints"`
}