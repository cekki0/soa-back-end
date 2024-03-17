package repo

import (
	"encoding/json"
	"tour/model"

	"gorm.io/gorm"
)

type KeyPointRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *KeyPointRepository) FindById(id string) (model.KeyPoint, error) {
	keyoint := model.KeyPoint{}
	dbResult := repo.DatabaseConnection.First(&keyoint, `"Id" = ?`, id)
	if dbResult.Error != nil {
		return keyoint, dbResult.Error
	}
	return keyoint, nil
}

func (repo *KeyPointRepository) Create(keyPoint model.KeyPoint) (model.KeyPoint, error) {
	var response model.KeyPoint
	jsonSecret, _ := json.Marshal(keyPoint.Secret)
	dbResult := repo.DatabaseConnection.Raw(`INSERT INTO "tours"."KeyPoints" ("IsDeleted","TourId","Name","Description","Longitude","Latitude","LocationAddress","ImagePath","Order",
										"HaveSecret","Secret","IsEncounterRequired","HasEncounter") VALUES (false,?,?,?,?,?,?,?,?,?,
										?,?,?) RETURNING *`, keyPoint.TourID, keyPoint.Name, keyPoint.Description, keyPoint.Longitude, keyPoint.Latitude,
		keyPoint.LocationAddress, keyPoint.ImagePath, keyPoint.Order, keyPoint.HaveSecret, string(jsonSecret), keyPoint.IsEncounterRequired, keyPoint.HasEncounter).Scan(&response)
	if dbResult.Error != nil {
		return response, dbResult.Error
	}
	return response, nil
}

func (repo *KeyPointRepository) FindAll() ([]model.KeyPoint, error) {
	var keyPoints []model.KeyPoint
	dbResult := repo.DatabaseConnection.Find(&keyPoints)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return keyPoints, nil
}
