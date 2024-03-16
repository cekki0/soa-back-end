package model

import "github.com/lib/pq"

type Preference struct {
	ID              int            `json:"Id" gorm:"column:Id"`
	UserID          int            `json:"UserId" gorm:"column:UserId"`
	DifficultyLevel int            `json:"DifficultyLevel" gorm:"column:DifficultyLevel"`
	WalkingRating   int            `json:"WalkingRating" gorm:"column:WalkingRating"`
	CyclingRating   int            `json:"CyclingRating" gorm:"column:CyclingRating"`
	CarRating       int            `json:"CarRating" gorm:"column:CarRating"`
	BoatRating      int            `json:"BoatRating" gorm:"column:BoatRating"`
	SelectedTags    pq.StringArray `json:"SelectedTags" gorm:"column:SelectedTags;type:text[]"`
}

func (Preference) TableName() string {
	return `tours."Preferences"`
}
