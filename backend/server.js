const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();

// Requirements: Enable CORS so HTML can call API, and JSON
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 3000;

// ============================================
// PART B - 5 ENDPOINTS - Q6 Travel Guide
// ============================================

// 1. GET /api/destinations -> List all records
app.get('/api/destinations', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM destinations ORDER BY id DESC");
    res.json(rows); // Return JSON for all responses
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET /api/destinations/:id -> Get one record
app.get('/api/destinations/:id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM destinations WHERE id =?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST /api/destinations -> Create a record
app.post('/api/destinations', async (req, res) => {
  try {
    const { name, country, city, category, description, price_per_night, rating, best_season } = req.body;

    if (!name ||!country) {
      return res.status(400).json({ error: "Name and country are required" });
    }

    const [result] = await db.query(
      "INSERT INTO destinations (name, country, city, category, description, price_per_night, rating, best_season) VALUES (?,?,?,?,?,?,?,?)",
      [name, country, city, category, description, price_per_night || 0, rating || 0, best_season]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Destination created successfully",
      data: { id: result.insertId,...req.body }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT /api/destinations/:id -> Update a record
app.put('/api/destinations/:id', async (req, res) => {
  try {
    const { name, country, city, category, description, price_per_night, rating, best_season } = req.body;

    const [result] = await db.query(
      "UPDATE destinations SET name=?, country=?, city=?, category=?, description=?, price_per_night=?, rating=?, best_season=? WHERE id=?",
      [name, country, city, category, description, price_per_night, rating, best_season, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json({ message: "Destination updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE /api/destinations/:id -> Delete a record
app.delete('/api/destinations/:id', async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM destinations WHERE id =?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Q6 Travel Guide API running on http://localhost:${PORT}`);
  console.log(`✅ Frontend: http://localhost:${PORT}`);
  console.log(`✅ Endpoints:`);
  console.log(` GET /api/destinations`);
  console.log(` GET /api/destinations/:id`);
  console.log(` POST /api/destinations`);
  console.log(` PUT /api/destinations/:id`);
  console.log(` DELETE /api/destinations/:id`);
});