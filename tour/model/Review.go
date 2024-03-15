package model

import (
	"github.com/lib/pq"
)

type Review struct {
	ID            int            `json:"Id" gorm:"column:Id;"`
	Rating        int            `json:"Rating" gorm:"column:Rating"`
	Comment       string         `json:"Comment" gorm:"column:Comment"`
	TouristID     int            `json:"TouristId" gorm:"column:TouristId"`
	TourVisitDate pq.NullTime    `json:"TourVisitDate" gorm:"type:time;column:TourVisitDate"`
	CommentDate   pq.NullTime    `json:"CommentDate" gorm:"type:time;column:CommentDate"`
	TourID        int            `json:"TourId" gorm:"column:TourId"`
	Images        pq.StringArray `json:"Images" gorm:"type:text[];column:Images"`
}

func (Review) TableName() string {
	return `tours."Reviews"`
}
