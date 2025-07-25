const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    tasks: [],
    events: [],
    notes: []
  }, null, 2));
}

app.get('/api/data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch (error) {
    console.error('can not read the file:', error);
    res.status(500).json({ error: 'can not read the file' });
  }
});

app.post('/api/save', (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('can not save the data:', error);
    res.status(500).json({ error: 'can not save the data' });
  }
});

app.listen(PORT, () => {
  console.log(`run http://localhost:${PORT}`);
});