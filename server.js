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
}); 

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text ) {
    const newNote = {
      title,
      text,
    };

    const response = {
      status: "A new note was successfully saved!",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting your note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);