package model

import (
	"time"
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
	Id          int            `json:"Id"`
	AuthorID    int            `json:"AuthorId"`
	Name        string         `json:"Name"`
	Description string         `json:"Description"`
	Difficulty  int            `json:"Difficulty"`
	Tags        []string       `json:"Tags" gorm:"type:text[]"`
	Status      TourStatus     `json:"Status"`
	Price       float64        `json:"Price"`
	Distance    float64        `json:"Distance"`
	PublishDate time.Time      `json:"PublishDate" gorm:"type:time"`
	ArchiveDate time.Time      `json:"ArchiveDate" gorm:"type:time"`
	KeyPoints   []KeyPoint     `json:"KeyPoints" gorm:"type:text[]"`
	Durations   []TourDuration `json:"Durations" gorm:"type:text[]"`
	Reviews     []Review       `json:"Reviews" gorm:"type:text[]"`
	Category    TourCategory   `json:"Category"`
}

// func (a StringArray) Value() (driver.Value, error) {
// 	return json.Marshal(a)
// }

// func (a *StringArray) Scan(value interface{}) error {
// 	if value == nil {
// 		*a = nil
// 		return nil
// 	}
// 	b, ok := value.([]byte)
// 	if !ok {
// 		return errors.New("type assertion to []byte failed")
// 	}
// 	return json.Unmarshal(b, a)
// }
