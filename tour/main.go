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
	"gorm.io/gorm/schema"
)

func initDB() *gorm.DB {
	dsn := "host=localhost user=postgres password=super dbname=explorer-v1 port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "tours.",
			SingularTable: false,
		},
	})
	if err != nil {
		print(err)
		return nil
	}

	database.AutoMigrate(&model.Tour{}, &model.KeyPoint{}, &model.Review{})
	return database
}

func startServer(tourHandler *handler.TourHandler, reviewHandler *handler.ReviewHandler, keyPointHandler *handler.KeyPointHanlder) {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/tour/{id}", tourHandler.FindById).Methods("GET")
	router.HandleFunc("/tours", tourHandler.FindAll).Methods("GET")
	router.HandleFunc("/tour", tourHandler.Create).Methods("POST")

	router.HandleFunc("/review/{id}", reviewHandler.FindById).Methods("GET")
	router.HandleFunc("/reviews", reviewHandler.FindAll).Methods("GET")
	router.HandleFunc("/review", reviewHandler.Create).Methods("POST")

	router.HandleFunc("/keypoint/{id}", keyPointHandler.FindById).Methods("GET")
	router.HandleFunc("/keypoints", keyPointHandler.FindAll).Methods("GET")
	router.HandleFunc("/keypoint", keyPointHandler.Create).Methods("POST")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	println("Server is running")
	log.Fatal(http.ListenAndServe(":8088", router))
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

	reviewRepo := &repo.ReviewRepository{DatabaseConnection: database}
	reviewService := &service.ReviewService{ReviewRepo: reviewRepo}
	reviewHandler := &handler.ReviewHandler{ReviewService: reviewService}

	keyPointRepo := &repo.KeyPointRepository{DatabaseConnection: database}
	keyPointService := &service.KeyPointService{KeyPointRepo: keyPointRepo}
	keyPointHandler := &handler.KeyPointHanlder{KeyPointService: keyPointService}

	startServer(tourHandler, reviewHandler, keyPointHandler)
}
