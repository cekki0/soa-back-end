package model

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type KeyPoint struct {
	Id                  int            `json:"Id" gorm:"column:Id;primaryKey"`
	IsDeleted           bool           `json:"IsDeleted" gorm:"column:IsDeleted" default:"false"`
	TourID              int            `json:"TourId" gorm:"column:TourId"`
	Tour                Tour           `json:"Tour,omitempty" gorm:"-"`
	Name                string         `json:"Name" gorm:"column:Name"`
	Description         string         `json:"Description" gorm:"column:Description"`
	Longitude           float64        `json:"Longitude" gorm:"column:Longitude"`
	Latitude            float64        `json:"Latitude" gorm:"column:Latitude"`
	LocationAddress     string         `json:"LocationAddress" gorm:"column:LocationAddress"`
	ImagePath           string         `json:"ImagePath" gorm:"column:ImagePath"`
	Order               float64        `json:"Order" gorm:"column:Order"`
	HaveSecret          bool           `json:"HaveSecret" gorm:"column:HaveSecret" default:"false"`
	Secret              KeyPointSecret `json:"Secret" default:"{}" gorm:"type:jsonb;column:Secret"`
	IsEncounterRequired bool           `json:"IsEncounterRequired" gorm:"column:IsEncounterRequired"`
	HasEncounter        bool           `json:"HasEncounter" gorm:"column:HasEncounter" default:"false"`
}

func (KeyPoint) TableName() string {
	return `tours."KeyPoints"`
}

func (kp KeyPointSecret) Value() (driver.Value, error) {
	return json.Marshal(kp)
}

func (kp *KeyPointSecret) Scan(value interface{}) error {
	if value == nil {
		*kp = KeyPointSecret{}
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("Scan source is not []byte")
	}
	return json.Unmarshal(bytes, kp)
}
