package main

import (
	"log"
	"net/http"
	"tour/handler"
	"tour/model"
	"tour/repo"
	"tour/service"

	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initDB() *gorm.DB {
	dsn := "host=localhost user=postgres password=super dbname=gorm port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		print(err)
		return nil
	}

	database.AutoMigrate(&model.Tour{})
	return database
}

func main() {
	database := initDB()
	if database == nil {
		print("Database connection failed")
		return
	}

	tourRepo := &repo.TourRepository{DatabaseConnection: database}
	tourService := &service.TourService{TourRepo: tourRepo}
	tourHandler := &handler.TourHandler{TourService: tourService}

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/tour/{id}", tourHandler.FindById).Methods("GET")
	router.HandleFunc("/tours", tourHandler.FindAll).Methods("GET")
	router.HandleFunc("/tour", tourHandler.Create).Methods("POST")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	println("Server is running")
	log.Fatal(http.ListenAndServe(":8090", router))
}
