package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"
)

type TourStatus int
type TourCategory int
type StringArray []string

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
	ID          int            `json:"id"`
	AuthorID    int            `json:"authorId"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Difficulty  int            `json:"difficulty"`
	Tags        StringArray    `json:"tags"`
	Status      TourStatus     `json:"status"`
	Price       float64        `json:"price"`
	Distance    float64        `json:"distance"`
	PublishDate time.Time      `json:"publishDate"`
	ArchiveDate time.Time      `json:"archiveDate"`
	KeyPoints   []KeyPoint     `json:"keyPoints"`
	Durations   []TourDuration `json:"durations"`
	Reviews     []Review       `json:"reviews"`
	Category    TourCategory   `json:"category"`
}

func (a StringArray) Value() (driver.Value, error) {
	return json.Marshal(a)
}

func (a *StringArray) Scan(value interface{}) error {
	if value == nil {
		*a = nil
		return nil
	}
	b, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(b, a)
}
