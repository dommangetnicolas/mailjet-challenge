package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

func connectToDB() *sql.DB {
	psqlconn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)
	db, err := sql.Open("postgres", psqlconn)
	checkError(err)

	err = db.Ping()
	checkError(err)

	fmt.Println("Connected to DB!")

	return db
}

// Can be removed, just to test your setup.
func dummyDBRequest(db *sql.DB) {
	rows, err := db.Query(`SELECT id FROM dummy_table`)
	checkError(err)

	defer rows.Close()
	for rows.Next() {
		var id int

		err = rows.Scan(&id)
		checkError(err)

		fmt.Println(id)
	}
}

func main() {
	db := connectToDB()
	defer db.Close()

	dummyDBRequest(db)

	r := mux.NewRouter()
	r.HandleFunc("/hello", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "Good luck\n")
	})
	http.Handle("/", r)

	http.ListenAndServe(":8000", nil)
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
