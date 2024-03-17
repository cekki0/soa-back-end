package model

type FacilityCategory int

const (
	Restaurant FacilityCategory = iota
	ParkingLot
	Toilet
	Hospital
	Cafe
	Pharmacy
	ExchangeOffice
	BusStop
	Shop
	Other
)

type Facility struct {
	ID          int              `json:"Id" gorm:"column:Id"`
	IsDeleted   bool             `json:"IsDeleted" gorm:"column:IsDeleted" default:"false"`
	Name        string           `json:"Name" gorm:"column:Name;type:text"`
	Description string           `json:"Description" gorm:"column:Description;type:text"`
	ImagePath   string           `json:"ImagePath" gorm:"column:ImagePath"`
	AuthorID    int              `json:"AuthorId" gorm:"column:AuthorId"`
	Category    FacilityCategory `json:"Category" gorm:"column:Category"`
	Longitude   float64          `json:"Longitude" gorm:"column:Longitude;type:double precision"`
	Latitude    float64          `json:"Latitude" gorm:"column:Latitude;type:double precision"`
}

func (Facility) TableName() string {
	return `tours."Facilities"`
}
