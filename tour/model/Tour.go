package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"

	"github.com/lib/pq"
)

type TourStatus int
type TourCategory int

const (
	Draft TourStatus = iota
	Published
	Archived
	Ready
)

const (
	Adventure TourCategory = iota
	FamilyTrips
	Cruise
	Cultural
)

type Tour struct {
	Id          int            `json:"Id" gorm:"column:Id;primaryKey"`
	IsDeleted   bool           `json:"IsDeleted" gorm:"column:IsDeleted" default:"false"`
	AuthorID    int            `json:"AuthorId" gorm:"column:AuthorId"`
	Name        string         `json:"Name" gorm:"column:Name"`
	Description string         `json:"Description" gorm:"column:Description"`
	Difficulty  int            `json:"Difficulty" gorm:"column:Difficulty"`
	Tags        pq.StringArray `json:"Tags" gorm:"column:Tags;type:text[]"`
	Status      TourStatus     `json:"Status" gorm:"column:Status"`
	Price       float64        `json:"Price" gorm:"column:Price"`
	Distance    float64        `json:"Distance" gorm:"column:Distance"`
	PublishDate pq.NullTime    `json:"PublishDate" gorm:"column:PublishDate;type:time" default:"null"`
	ArchiveDate pq.NullTime    `json:"ArchiveDate" gorm:"column:ArchiveDate;type:time" default:"null"`
	KeyPoints   []KeyPoint     `json:"KeyPoints,omitempty" gorm:"-"`
	Durations   TourDurations  `json:"Durations" gorm:"column:Durations;type:jsonb" default:"[]"`
	Reviews     []Review       `json:"Reviews,omitempty" gorm:"-"`
	Category    TourCategory   `json:"Category" gorm:"column:Category"`
}

func (Tour) TableName() string {
	return `tours."Tours"`
}

type TourDurations []TourDuration

func (ls *TourDurations) Scan(src interface{}) error {
	if src == nil {
		*ls = nil
		return nil
	}

	b, ok := src.([]byte)
	if !ok {
		return errors.New("Scan source was not []byte")
	}

	var data []TourDuration
	if err := json.Unmarshal(b, &data); err != nil {
		return err
	}

	*ls = data
	return nil
}

func (td TourDurations) Value() (driver.Value, error) {
	jsonData, err := json.Marshal(td)
	if err != nil {
		return nil, err
	}
	return jsonData, nil
}
