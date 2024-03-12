package main

import (
	"log"
	"net/http"
	"tour/handler"

	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
) 

func initDB() *gorm.DB {
	dsn := "user=postgres password=super dbname=gorm host=localhost port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		print(err)
		return nil
	}

	return database
}

func startServer(handler *handler.TourHandler) {
	router := mux.NewRouter().StrictSlash(true)
	
	router.HandleFunc("/tour/{id}", handler.Get).Methods("GET")

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	println("Server starting")
	log.Fatal(http.ListenAndServe(":8090", router))
}

func main() {		
	router := mux.NewRouter()
	
	log.Panicln(http.ListenAndServe(":8080", router))
}