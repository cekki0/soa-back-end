package model

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

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
	IsDeleted   bool           `json:"IsDeleted" gorm:"column:IsDeleted"`
	AuthorID    int            `json:"AuthorId" gorm:"column:AuthorId"`
	Name        string         `json:"Name" gorm:"column:Name"`
	Description string         `json:"Description" gorm:"column:Description"`
	Difficulty  int            `json:"Difficulty" gorm:"column:Difficulty"`
	Tags        pq.StringArray `json:"Tags" gorm:"column:Tags;type:text[]"`
	Status      TourStatus     `json:"Status" gorm:"column:Status"`
	Price       float64        `json:"Price" gorm:"column:Price"`
	Distance    float64        `json:"Distance" gorm:"column:Distance"`
	PublishDate pq.NullTime    `json:"PublishDate" gorm:"column:PublishDate;type:time"`
	ArchiveDate pq.NullTime    `json:"ArchiveDate" gorm:"column:ArchiveDate;type:time"`
	KeyPoints   []KeyPoint     `json:"KeyPoints"` //pogledati za kasnije kako povezati dve tabele
	Durations   TourDurations  `json:"Durations" gorm:"column:Durations;type:jsonb"`
	Reviews     []Review       `json:"Reviews"`
	Category    TourCategory   `json:"Category" gorm:"column:Category"`
}

func (Tour) TableName() string {
	return `tours."Tours"`
}

type TourDurations struct {
	Data []TourDuration
}

func (td *TourDurations) Scan(value interface{}) error {
	if value == nil {
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to unmarshal JSONB value")
	}
	return json.Unmarshal(bytes, td)
}

func (td TourDurations) Value() (driver.Value, error) {
	return json.Marshal(td)
}
