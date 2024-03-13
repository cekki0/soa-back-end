package model

import (
	"errors"

	"github.com/lib/pq"
)

type Review struct {
	Id            int          `json:"Id" gorm:"column:Id"`	
	Rating        int          `json:"Rating" gorm:"column:Rating"`
	Comment       string       `json:"Comment" gorm:"column:Comment"`
	TouristID     int          `json:"TouristId" gorm:"column:TouristId"`
	TourVisitDate pq.NullTime  `json:"TourVisitDate" gorm:"type:time;column:TourVisitDate"`
	CommentDate   pq.NullTime  `json:"CommentDate" gorm:"type:time;column:CommentDate"`
	TourID        int          `json:"TourId" gorm:"column:TourId;column:TourId"`
	Images        pq.StringArray  `json:"Images" gorm:"type:text[];column:Images"`
}

func (Review) TableName() string {
	return `tours."Reviews"`
}

func NewReview(id, rating int, comment string, touristID int, tourVisitDate, commentDate pq.NullTime, tourID int, images []string) (*Review, error) {
	if rating < 1 || rating > 5 {
		return nil, errors.New("invalid rating")
	}
	if comment == "" {
		return nil, errors.New("invalid comment")
	}
	if len(images) < 1 {
		return nil, errors.New("invalid images input")
	}

	return &Review{
		Id:            id,
		Rating:        rating,
		Comment:       comment,
		TouristID:     touristID,
		TourVisitDate: tourVisitDate,
		CommentDate:   commentDate,
		TourID:        tourID,
		Images:        images,
	}, nil
}
