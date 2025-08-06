package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// Load .env hanya saat lokal development
	if os.Getenv("RENDER") == "" {
		if err := loadLocalEnv(); err != nil {
			log.Println("⚠️ .env file tidak ditemukan, menggunakan environment system")
		}
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("❌ DATABASE_URL tidak ditemukan di environment")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Gagal koneksi ke database:", err)
	}

	DB = db
	fmt.Println("✅ Connected to PostgreSQL database")
}

func loadLocalEnv() error {
	if _, err := os.Stat(".env"); err == nil {
		return godotenv.Load(".env")
	}
	return nil
}
