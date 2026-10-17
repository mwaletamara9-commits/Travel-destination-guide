const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory storage - Q6 requirement, no database needed
let destinations = [];
let nextId = 1;

// GET all destinations
app.get('/api/destinations', (req, res) => {
  res.json(destinations);
});

// GET one destination
app.get('/api/destinations/:id', (req, res) => {
  const dest = destinations.find(d => d.id == req.params.id);
  if (!dest) return res.status(404).json({ error: 'Destination not found' });
  res.json(dest);
});

// POST - Add destination - FIXED, will not crash
app.post('/api/destinations', (req, res) => {
  try {
    console.log('POST body:', req.body);
    const { name, description, category, country, imageUrl, rating, title, price_per_night, best_season } = req.body;
    
    if (!name && !title) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newDest = {
      id: nextId++,
      name: name || title || 'Unnamed',
      title: title || name || 'Unnamed',
      description: description || '',
      category: category || 'General',
      country: country || req.body.country || '',
      imageUrl: imageUrl || 'https://via.placeholder.com/300',
      rating: rating || 5,
      price_per_night: price_per_night || 0,
      best_season: best_season || '',
      createdAt: new Date()
    };

    destinations.push(newDest);
    console.log('Saved! Total:', destinations.length);
    res.status(201).json(newDest);
  } catch (err) {
    console.error('POST ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update
app.put('/api/destinations/:id', (req, res) => {
  const index = destinations.findIndex(d => d.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  destinations[index] = { ...destinations[index], ...req.body, id: destinations[index].id };
  res.json(destinations[index]);
});

// DELETE
app.delete('/api/destinations/:id', (req, res) => {
  const initial = destinations.length;
  destinations = destinations.filter(d => d.id != req.params.id);
  if (destinations.length === initial) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});

// For frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Travel Guide API running on port ${PORT}`);
});
