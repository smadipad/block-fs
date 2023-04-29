package main

import (
	"backend/config"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Users struct {
	// gorm.Model
	User_ID    string `json:"User_id"`
	FIRST_NAME string `json:"first_name"`
	LAST_NAME  string `json:"last_name"`
	ADDRESS    string `json:"address"`
	PHONE      uint   `json:"phone"`
	EMAIL      string `json:"email"`
	USERNAME   string `json:"username"`
	PASSWORD   string `json:"password"`
	ROLE_ID    string `json:"role_id"`
}

var db = config.GetDB()

// func sendErr(w http.ResponseWriter, code int, message string) {
// 	resp, _ := json.Marshal(map[string]string{"error": message})
// 	http.Error(w, string(resp), code)
// }

func authenticateUser(w http.ResponseWriter, r *http.Request) {
	var User Users
	queryParams := mux.Vars(r)
	db.Raw("select User_ID, FIRST_NAME, LAST_NAME, ADDRESS, PHONE, EMAIL, USERNAME, PASSWORD, ROLE_ID From UserS where EMAIL=?", queryParams["UserId"]).Scan(&User)
	fmt.Println(queryParams["UserId"])
	e := json.NewEncoder(w).Encode(User)
	if e != nil {
		sendErr(w, http.StatusInternalServerError, e.Error())
	}
}
