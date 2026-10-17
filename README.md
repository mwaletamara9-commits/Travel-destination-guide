
# Travel Destination Guide - Mulungushi University
Project: travel-destination-guide
Database: travel_guide_db
Location: Kabwe, Zambia - October 2026

## Live Evidence - COMPLETED
✅ Backend: node server.js running on http://localhost:3000
✅ Frontend: http://localhost:3000 - Add Destination form + All Destinations (10) table
✅ Endpoints: GET, GET/:id, POST, PUT, DELETE /api/destinations
✅ Screenshots: terminal + browser localhost:3000 (attached)

## Part A - Database - travel_guide_db (1 table only) - DONE
Table: destinations
- id INT PRIMARY KEY AUTO_INCREMENT
- name VARCHAR(100) - e.g. Victoria Falls, Livingstone Island
- description TEXT
- category VARCHAR(50) - Beach, City, Nature, Wildlife, Adventure, Culture
- country VARCHAR(50) - Zambia, Kenya, Tanzania, etc
- image_url VARCHAR(255) optional
- Timestamps: created_at, updated_at recommended - included
- 10 sample records populated via INSERT:
1 Victoria Falls, 2 South Luangwa National Park, 3 Lower Zambezi, 
4 Bali Beach, 5 Zanzibar Stone Town, 6 Kafue National Park, 
7 Lake Malawi, 8 Cape Town, 9 Maasai Mara, 10 Livingstone Island

## Part B - API - Node.js + Express - DONE
GET /api/destinations -> List all 10 records
GET /api/destinations/:id -> Get one record
POST /api/destinations -> Create new
PUT /api/destinations/:id -> Update record
DELETE /api/destinations/:id -> Delete record
Requirements:
- Returns JSON for all responses
- Uses .env for DB config: DB_NAME=travel_guide_db
- CORS enabled so HTML can call API
Postman Evidence: Video showing URL, method, request body, JSON response for all 5 endpoints

## Part C - Frontend - HTML + JS - DONE (See screenshot)
- Lets user create new record (form with relevant inputs: Name, Description, Category, Country, Image URL)
- Lists existing records in table (All Destinations 10)
- Allows edit (loads values into form and saves via PUT) and delete operations (Edit/Delete buttons visible)
- Updates UI after each operation

## Project Structure
travel-destination-guide/
├── backend/
│   ├── .env (PORT=3000, DB_NAME=travel_guide_db)
│   ├── package.json (express, mysql2, cors, dotenv)
│   ├── schema.sql
│   ├── db.js
│   └── server.js
├── frontend/
│   ├── index.html
│   └── app.js
└── README.md

## How to Run
cd backend
npm i express mysql2 cors dotenv
node server.js
Open http://localhost:3000

Built in Kabwe, Zambia - Mulungushi University - Single-Table CRUD App Using Node.js