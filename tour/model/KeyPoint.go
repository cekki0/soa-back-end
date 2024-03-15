package model

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type KeyPoint struct {
	ID                  int            `json:"Id" gorm:"column:Id;"`
	IsDeleted           bool           `json:"IsDeleted" gorm:"column:IsDeleted" default:"false"`
	TourID              int            `json:"TourId" gorm:"column:TourId"`
	Name                string         `json:"Name" gorm:"column:Name"`
	Description         string         `json:"Description" gorm:"column:Description"`
	Longitude           float64        `json:"Longitude" gorm:"column:Longitude;type:double precision"`
	Latitude            float64        `json:"Latitude" gorm:"column:Latitude;type:double precision"`
	LocationAddress     string         `json:"LocationAddress" gorm:"column:LocationAddress"`
	ImagePath           string         `json:"ImagePath" gorm:"column:ImagePath"`
	Order               int            `json:"Order" gorm:"column:Order"`
	HaveSecret          bool           `json:"HaveSecret" gorm:"column:HaveSecret" default:"false"`
	Secret              KeyPointSecret `json:"Secret" gorm:"type:jsonb;column:Secret"`
	IsEncounterRequired bool           `json:"IsEncounterRequired" gorm:"column:IsEncounterRequired"`
	HasEncounter        bool           `json:"HasEncounter" gorm:"column:HasEncounter" default:"false"`
}

func (KeyPoint) TableName() string {
	return `tours."KeyPoints"`
}

func (kp KeyPointSecret) Value() (driver.Value, error) {
	// Check if the KeyPointSecret is empty
	if len(kp.Images) == 0 && kp.Description == "" {
		// If it's empty, return the JSON representation of an empty KeyPointSecret
		return `{"Images": [""], "Description": ""}`, nil
	}
	// Otherwise, marshal the KeyPointSecret as usual
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
