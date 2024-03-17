package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"

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
	ID          int            `json:"Id" gorm:"column:Id"`
	IsDeleted   bool           `json:"IsDeleted" gorm:"column:IsDeleted" default:"false"`
	AuthorID    int            `json:"AuthorId" gorm:"column:AuthorId"`
	Name        string         `json:"Name" gorm:"column:Name"`
	Description string         `json:"Description" gorm:"column:Description"`
	Difficulty  int            `json:"Difficulty" gorm:"column:Difficulty;type:integer"`
	Tags        pq.StringArray `json:"Tags" gorm:"column:Tags;type:text[]"`
	Status      TourStatus     `json:"Status" gorm:"column:Status;type:integer"`
	Price       float64        `json:"Price" gorm:"column:Price;type:double precision"`
	Distance    float64        `json:"Distance" gorm:"column:Distance;type:double precision"`
	PublishDate NullTime       `json:"PublishDate" gorm:"column:PublishDate;type:time"`
	ArchiveDate NullTime       `json:"ArchiveDate" gorm:"column:ArchiveDate;type:time"`
	KeyPoints   []KeyPoint     `json:"KeyPoints,omitempty"`
	Durations   TourDurations  `json:"Durations" gorm:"column:Durations;type:jsonb"`
	Reviews     []Review       `json:"Reviews,omitempty"`
	Category    TourCategory   `json:"Category" gorm:"column:Category;type:integer"`
	Equipments  []Equipment    `json:"Equipments,omitempty" gorm:"many2many:TourEquipments;"`
}

func (Tour) TableName() string {
	return `tours."Tours"`
}

type NullTime struct {
	pq.NullTime
}

func (nt NullTime) MarshalJSON() ([]byte, error) {
	if nt.Valid {
		return json.Marshal(nt.Time.Format(time.RFC3339))
	}
	return json.Marshal(nil)
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
	if len(td) == 0 {
		return "[]", nil
	}
	jsonData, err := json.Marshal(td)
	if err != nil {
		return nil, err
	}
	return jsonData, nil
}
