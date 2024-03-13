package model

import (
	"errors"
	"time"
)

type Review struct {
	Id            int       `json:"Id"`
	Rating        int       `json:"Rating"`
	Comment       string    `json:"Comment"`
	TouristID     int64     `json:"TouristId"`
	TourVisitDate time.Time `json:"TourVisitDate" gorm:"type:time"`
	CommentDate   time.Time `json:"CommentDate" gorm:"type:time"`
	TourID        int64     `json:"TourId"`
	Images        []string  `json:"Images" gorm:"type:text"`
}

func NewReview(id, rating int, comment string, touristID int64, tourVisitDate, commentDate time.Time, tourID int64, images []string) (*Review, error) {
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
