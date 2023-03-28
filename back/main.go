package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"log"
	"strings"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	_ "github.com/lib/pq"
)

type Garden struct {
    ID        int    		`json:"id"`
    Name      string 		`json:"name"`
	Lawns	  []Lawn 		`json:"lawns"`
	LawnItems []LawnItem    `json:"lawnItems"`
    CreatedAt string 		`json:"createdAt"`
    UpdatedAt string 		`json:"updatedAt"`
}

type Lawn struct {
    ID        int    `json:"id"`
    Position  int    `json:"position"`
    GardenID  int    `json:"gardenId"`
}

type LawnItem struct {
    ID        int    `json:"id"`
    Type      string `json:"type"`
    Position  int    `json:"position"`
    LawnID    int    `json:"lawnId"`
}

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

// Fonction utilitaire pour générer les placeholders pour une requête SQL avec plusieurs lignes
func placeholders(n int, colsPerVal int) string {
    placeholders := []string{}
    for i := 1; i <= n; i++ {
        var vals []string
        for j := 1; j <= colsPerVal; j++ {
            vals = append(vals, fmt.Sprintf("$%d", (i-1)*colsPerVal+j))
        }
        placeholders = append(placeholders, "("+strings.Join(vals, ", ")+")")
    }
    return strings.Join(placeholders, ", ")
}

func createGarden(db *sql.DB, garden Garden) {
	stmt, err := db.Prepare("INSERT INTO gardens (id, name) VALUES ($1, $2) RETURNING id")
    if err != nil {
        log.Fatal(err)
    }

    defer stmt.Close()

    err = stmt.QueryRow(garden.ID, garden.Name).Scan(&garden.ID)
    if err != nil {
        log.Fatal(err)
    }
}

func createLawns(db *sql.DB, garden Garden) {
	stmt, err := db.Prepare(fmt.Sprintf("INSERT INTO lawns (id, position, garden_id) VALUES %s", placeholders(len(garden.Lawns), 3)))
    if err != nil {
        log.Fatal(err)
    }

    defer stmt.Close()

    values := []interface{}{}
    for _, lawn := range garden.Lawns {
        values = append(values, lawn.ID, lawn.Position, lawn.GardenID)
    }

    _, err = stmt.Exec(values...)
    if err != nil {
        log.Fatal(err)
    }
}

func createLawnItems(db *sql.DB, garden Garden) {
	stmt, err := db.Prepare(fmt.Sprintf("INSERT INTO lawnitems (id, type, position, lawn_id) VALUES %s", placeholders(len(garden.LawnItems), 4)))
    if err != nil {
        log.Fatal(err)
    }

    defer stmt.Close()

    values := []interface{}{}
    for _, lawnItem := range garden.LawnItems {
        values = append(values, lawnItem.ID, lawnItem.Type, lawnItem.Position, lawnItem.LawnID)
    }

    _, err = stmt.Exec(values...)
    if err != nil {
        log.Fatal(err)
    }
}

func postGarden(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	defer db.Close()

    var garden Garden
    json.NewDecoder(r.Body).Decode(&garden)

	createGarden(db, garden)
	createLawns(db, garden)
	createLawnItems(db, garden)

    json.NewEncoder(w).Encode(garden)
}

func getGarden(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	defer db.Close()

	params := mux.Vars(r)
    id, err := strconv.Atoi(params["id"])

    var garden Garden

    row := db.QueryRow("SELECT * FROM gardens WHERE id = $1", id)
    err = row.Scan(&garden.ID, &garden.Name, &garden.CreatedAt, &garden.UpdatedAt)
    if err != nil {
        log.Fatal(err)
    }

	lawnRows, err := db.Query("SELECT id, position FROM lawns WHERE garden_id = $1", id)
	if err != nil {
        log.Fatal(err)
    }
	defer lawnRows.Close()

	for lawnRows.Next() {
		lawn := Lawn{}
		err := lawnRows.Scan(&lawn.ID, &lawn.Position)
		if err != nil {
			log.Fatal(err)
		}

		itemRows, err := db.Query("SELECT id, type, position, lawn_id FROM lawnitems WHERE lawn_id = $1", lawn.ID)
			if err != nil {
				log.Fatal(err)
			}
            defer itemRows.Close()

            for itemRows.Next() {
                item := LawnItem{}
                err := itemRows.Scan(&item.ID, &item.Type, &item.Position, &item.LawnID)
                if err != nil {
					log.Fatal(err)
				}
				garden.LawnItems = append(garden.LawnItems, item)
                // lawn.Items = append(lawn.Items, item)
            }

		garden.Lawns = append(garden.Lawns, lawn)
	}

    json.NewEncoder(w).Encode(garden)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/garden", postGarden).Methods("POST")
	r.HandleFunc("/garden/{id}", getGarden).Methods("GET")

	http.Handle("/", r)

	handler := cors.Default().Handler(r)
	http.ListenAndServe(":8000", handler)
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
