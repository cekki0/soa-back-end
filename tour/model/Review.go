package model

import (
	"errors"
	"time"
)

type Review struct {
    ID            int
    Rating        int
    Comment       string
    TouristID     int64
    TourVisitDate time.Time
    CommentDate   time.Time
    TourID        int64
    Images        []string
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