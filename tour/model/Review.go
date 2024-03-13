package model

import (
	"errors"
	"time"
)

type Review struct {
	ID            int       `json:"id"`
	Rating        int       `json:"rating"`
	Comment       string    `json:"comment"`
	TouristID     int64     `json:"touristId"`
	TourVisitDate time.Time `json:"tourVisitDate"`
	CommentDate   time.Time `json:"commentDate"`
	TourID        int64     `json:"tourId"`
	Images        []string  `json:"images"`
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
		ID:            id,
		Rating:        rating,
		Comment:       comment,
		TouristID:     touristID,
		TourVisitDate: tourVisitDate,
		CommentDate:   commentDate,
		TourID:        tourID,
		Images:        images,
	}, nil
}
