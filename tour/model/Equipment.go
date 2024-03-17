package model

type Equipment struct {
	ID          int    `json:"Id" gorm:"column:Id"`
	Name        string `json:"Name" gorm:"column:Name"`
	Description string `json:"Description" gorm:"column:Description"`
	Tours       []Tour `json:"Tours,omitempty" gorm:"many2many:TourEquipments;"`
}

func (Equipment) TableName() string {
	return `tours."Equipment"`
}
