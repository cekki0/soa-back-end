package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
) 

func handleReq(res http.ResponseWriter, req *http.Request){
	fmt.Println(req.Header)
	res.Write([]byte("test"))
}

func handlePathReq(res http.ResponseWriter, req *http.Request){
	path := mux.Vars(req)["path"]	
	fmt.Println(req.Header)
	res.Write([]byte(path))
}

func main() {		
	router := mux.NewRouter()
	router.HandleFunc("/", handleReq)
	router.HandleFunc("/{path}", handlePathReq).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", router))
}