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
	ID          int            `json:"id"`
	AuthorID    int            `json:"authorId"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Difficulty  int            `json:"difficulty"`
	Tags        []string       `json:"tags" gorm:"type:text[]"`
	Status      TourStatus     `json:"status"`
	Price       float64        `json:"price"`
	Distance    float64        `json:"distance"`
	PublishDate time.Time      `json:"publishDate" gorm:"type:time"`
	ArchiveDate time.Time      `json:"archiveDate" gorm:"type:time"`
	KeyPoints   []KeyPoint     `json:"keyPoints" gorm:"type:text[]"`
	Durations   []TourDuration `json:"durations" gorm:"type:text[]"`
	Reviews     []Review       `json:"reviews" gorm:"type:text[]"`
	Category    TourCategory   `json:"category"`
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
