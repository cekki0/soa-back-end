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
	AuthorID    int            `json:"AuthorId" gorm:"column:AuthorID"`
	Name        string         `json:"Name" gorm:"column:Name"`
	Description string         `json:"Description" gorm:"column:Description"`
	Difficulty  int            `json:"Difficulty" gorm:"column:Difficulty"`
	Tags        pq.StringArray `json:"Tags" gorm:"column:Tags;type:text[]"`
	Status      TourStatus     `json:"Status" gorm:"column:Status"`
	Price       float64        `json:"Price" gorm:"column:Price"`
	Distance    float64        `json:"Distance" gorm:"column:Distance"`
	PublishDate pq.NullTime    `json:"PublishDate" gorm:"column:PublishDate;type:time"`
	ArchiveDate pq.NullTime    `json:"ArchiveDate" gorm:"column:ArchiveDate;type:time"`
	KeyPoints   []KeyPoint     `json:"KeyPoints" gorm:"column:KeyPoints;type:jsonb"` //pogledati za kasnije kako povezati dve tabele
	Durations   []TourDuration `json:"Durations" gorm:"column:Durations;type:jsonb"`
	Reviews     []Review       `json:"Reviews" gorm:"column:Reviews;type:jsonb"`
	Category    TourCategory   `json:"Category" gorm:"column:Category"`
}

func (Tour) TableName() string {
	return `tours."Tours"`
}

// // StringArray represents a PostgreSQL array of text
// type StringArray []string

// // Value converts StringArray to a driver Value
// func (a StringArray) Value() (driver.Value, error) {
// 	return pq.Array(a).Value()
// }

// // Scan converts a database column value to a StringArray
// func (a *StringArray) Scan(src interface{}) error {
// 	if src == nil {
// 		*a = nil
// 		return nil
// 	}
// 	var array pq.StringArray
// 	if err := array.Scan(src); err != nil {
// 		return err
// 	}
// 	*a = []string(array)
// 	return nil
// }

func (td *TourDuration) Scan(value interface{}) error {
	if value == nil {
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to unmarshal JSONB value")
	}
	return json.Unmarshal(bytes, td)
}

func (td TourDuration) Value() (driver.Value, error) {
	return json.Marshal(td)
}
