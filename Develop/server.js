const express = require('express');
const app = express();
const db = require('./db/db.json');
const PORT = 3001;

app.get('/', (req, res) => {
    res.json(db);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);