// require exress, path, and db data
const express = require('express');
const path = require('path');
let data = require('./db/db.json');
const { randomUUID } = require('crypto');
const { readAndAppend } = require('./helpers/fsUtils');
const fs = require('fs');

// port
PORT = process.env.PORT || 3001;

// app express
app = express();

// middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

// get / to return index.html
app.get('/', (req, res) => {
    console.info(`${req.method} request received for / path or index.html`)
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// get /notes to return notes.html
app.get('/notes', (req, res) => {
    console.info(`${req.method} request received for /notes path or notes.html`)
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// get /api/notes to read and return db.json file
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to read and return notes`)
    data = JSON.parse(fs.readFileSync('./db/db.json')) || []; // always updates data
    res.json(data);
});

// post /api/notes to receive a new note on request body and save to db.json
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to save new note`)
    // destructuring assignment
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: randomUUID(),
    };

    data.push(newNote);

    readAndAppend(newNote, `./db/db.json`)

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(200).json(data);

});



// listen
app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);