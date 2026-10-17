const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Requirements: CORS + JSON + .env
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const FILE = path.join(__dirname, 'destinations.json');
const PORT = process.env.PORT || 10000;

function getData(){
  if(!fs.existsSync(FILE)){
    fs.writeFileSync(FILE, JSON.stringify([
      {id: "1", name: "Bali", destination: "Bali", category: "beach", country: "Indonesia", imageUrl: "https://picsum.photos/300", description: "Beautiful beach", created_at: new Date().toISOString(), updated_at: new Date().toISOString()}
    ], null, 2));
  }
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function saveData(data){
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// 1. GET ALL - 200 OK
app.get('/api/destinations', (req, res) => {
  res.json(getData());
});

// 2. GET ONE BY ID - 200 OK (This is what you were missing for video)
app.get('/api/destinations/:id', (req, res) => {
  const data = getData();
  const item = data.find(d => d.id == req.params.id);
  if(!item) return res.status(404).json({message: "Not found"});
  res.json(item);
});

// 3. POST - 201 Created
app.post('/api/destinations', (req, res) => {
  const data = getData();
  const newItem = {
    id: Date.now().toString(),
    name: req.body.name || req.body.destination,
    destination: req.body.name || req.body.destination,
    category: req.body.category || '',
    country: req.body.country || '',
    imageUrl: req.body.imageUrl || '',
    image: req.body.imageUrl || '',
    description: req.body.description || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  data.push(newItem);
  saveData(data);
  res.status(201).json(newItem);
});

// 4. PUT - Update
app.put('/api/destinations/:id', (req, res) => {
  let data = getData();
  data = data.map(d => {
    if(d.id == req.params.id){
      return {...d, ...req.body, name: req.body.name || d.name, destination: req.body.name || d.destination, updated_at: new Date().toISOString()};
    }
    return d;
  });
  saveData(data);
  res.json({message: "Updated successfully", data: data.find(d=>d.id==req.params.id)});
});

// 5. DELETE
app.delete('/api/destinations/:id', (req, res) => {
  let data = getData();
  data = data.filter(d => d.id != req.params.id);
  saveData(data);
  res.json({message: "Deleted successfully"});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
