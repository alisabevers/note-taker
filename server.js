const express = require('express');
const path = require('path');
const app = express();
const {readFile, writeFile} = require('fs/promises');
const PORT = process.env.PORT || 3001;
const getNotes = () => {
  return readFile('./Develop/db/db.json').then(rawNotes => [].concat(JSON.parse(rawNotes)))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './Develop/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  getNotes().then(notes => res.json(notes))
  .catch(err => res.status(404).json(err))
});

app.post('/api/notes', (req, res) => {
  getNotes().then(oldNotes => {
    const { title, text } = req.body;
    if (title && text ) {
      const newNote = {
        title,
        text,
        id: Math.floor(Math.random()*10000).toString()
      };
      const noteArray = [...oldNotes, newNote];
      writeFile("./Develop/db/db.json", JSON.stringify(noteArray)).then(() => res.json({
        msg: "ok" }))
    }
  })
})

app.delete('/api/notes/:id', (req, res) => {
  getNotes().then(oldNotes => {
    let filteredNotes = oldNotes.filter(note => note.id !== req.params.id);
    console.log(filteredNotes);
    writeFile("./Develop/db/db.json", JSON.stringify(filteredNotes))
  })
  .then(() => res.json({
    msg: "ok" }))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);