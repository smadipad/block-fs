package main

import (
	"backend/config"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// import "gorm.io/gorm"

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}
func RootEndPoint(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(200)
	response.Write([]byte("Hello World"))

}

func InitRouter() {
	router := mux.NewRouter()

	router.HandleFunc("/login/{email}", authenticateUser).Methods("GET")
	router.HandleFunc("/fileUpload/{email}", uploadFile).Methods("POST")
	router.HandleFunc("/user/add", addNewUser).Methods("POST")
	router.HandleFunc("/fetch/{fileId}")
}

func main() {
	fmt.Println("Server Started")
	config.ConnectSqlite()
	InitRouter()
}
