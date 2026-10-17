const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const FILE = path.join(__dirname, 'destinations.json');

// Load or create file
function getData(){
  if(!fs.existsSync(FILE)){
    fs.writeFileSync(FILE, '[]');
  }
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}
function saveData(data){
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET - All Destinations
app.get('/api/destinations', (req, res) => {
  res.json(getData());
});

// POST - Add new - PERMANENT
app.post('/api/destinations', (req, res) => {
  const data = getData();
  const newItem = {
    id: Date.now().toString(),
    name: req.body.name,
    category: req.body.category,
    country: req.body.country,
    imageUrl: req.body.imageUrl || '',
    description: req.body.description || ''
  };
  data.push(newItem);
  saveData(data);
  res.status(201).json(newItem);
});

// PUT - Update
app.put('/api/destinations/:id', (req, res) => {
  let data = getData();
  data = data.map(d => d.id === req.params.id ? {...d, ...req.body} : d);
  saveData(data);
  res.json({message: 'Updated'});
});

// DELETE
app.delete('/api/destinations/:id', (req, res) => {
  let data = getData();
  data = data.filter(d => d.id !== req.params.id);
  saveData(data);
  res.json({message: 'Deleted'});
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Running on', PORT));
