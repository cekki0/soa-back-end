package model

type TourEquipment struct {
	EquipmentID int `json:"EquipmentID" gorm:"primaryKey"`
	TourID      int `json:"TourID" gorm:"primaryKey"`
}

func (TourEquipment) TableName() string {
	return `tours."TourEquipments"`
}
