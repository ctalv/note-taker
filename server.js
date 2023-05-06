// require exress, path, and db data
const express = require('express');
const path = require('path');
const data = require('./db/db.json')
PORT = process.env.PORT || 3001;

// app express
app = express();

// middleware for parsing
app.use(express.json());
app.use(express.urlencoded());

// html routes
// get * to return index.html
// get /notes to return notes.html

// api routes
// get /api/notes to read and return db.json file
// post /api/notes to receive a new note on request body and save to db.json


app.get('*', (req, res) => {

})

app.get('/notes', (req, res) => {
    
});

app.get('/api/notes', (req, res) => {
    
});

app.post('/api/notes', (req, res) => {
    
});

// listen
app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);