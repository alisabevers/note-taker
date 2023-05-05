const express = require('express');
const path = require('path');
const app = express();
const db = require('./Develop/db/db.json');
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './Develop/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
}); //need to get the styling to connect on this page

// app.post('/api/notes', (req, res) => {
//   console.info(`${req.method} request received to add a review`);
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);