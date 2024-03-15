package model

import (
	"time"

	"github.com/lib/pq"
)

type Review struct {
	ID            int            `json:"Id" gorm:"column:Id;"`
	Rating        int            `json:"Rating" gorm:"column:Rating;type:integer"`
	Comment       string         `json:"Comment" gorm:"column:Comment"`
	TouristID     int            `json:"TouristId" gorm:"column:TouristId"`
	TourVisitDate time.Time      `json:"TourVisitDate" gorm:"type:date;column:TourVisitDate"`
	CommentDate   time.Time      `json:"CommentDate" gorm:"type:date;column:CommentDate"`
	TourID        int            `json:"TourId" gorm:"column:TourId"`
	Images        pq.StringArray `json:"Images" gorm:"type:text[];column:Images"`
}

func (Review) TableName() string {
	return `tours."Reviews"`
}
