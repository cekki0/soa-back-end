package model

type TourEquipment struct {
	EquipmentID int `json:"EquipmentListId" gorm:"primaryKey;column:EquipmentListId"`
	TourID      int `json:"ToursId" gorm:"primaryKey;column:ToursId"`
}

func (TourEquipment) TableName() string {
	return `tours."TourEquipment"`
}
