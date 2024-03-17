package model

import (
	"database/sql/driver"
	"errors"
	"time"

	"github.com/golang-sql/civil"
	"github.com/lib/pq"
)

type Review struct {
	ID            int            `json:"Id" gorm:"column:Id;"`
	Rating        int            `json:"Rating" gorm:"column:Rating;type:integer"`
	Comment       string         `json:"Comment" gorm:"column:Comment"`
	TouristID     int            `json:"TouristId" gorm:"column:TouristId"`
	TourVisitDate CustomDate     `json:"TourVisitDate" gorm:"type:date;column:TourVisitDate"`
	CommentDate   CustomDate     `json:"CommentDate" gorm:"type:date;column:CommentDate"`
	TourID        int            `json:"TourId" gorm:"column:TourId"`
	Images        pq.StringArray `json:"Images" gorm:"type:text[];column:Images"`
}

func (Review) TableName() string {
	return `tours."Reviews"`
}

type CustomDate struct {
	civil.Date
}

func (cd *CustomDate) Scan(value interface{}) error {
	if value == nil {
		return errors.New("Scan: value is nil")
	}
	switch v := value.(type) {
	case time.Time:
		cd.Date = civil.DateOf(v)
	case string:
		t, err := time.Parse("2006-01-02", v)
		if err != nil {
			return err
		}
		cd.Date = civil.DateOf(t)
	default:
		return errors.New("Scan: unsupported type for CustomDate")
	}
	return nil
}

func (cd CustomDate) Value() (driver.Value, error) {
	return cd.Date.String(), nil
}
