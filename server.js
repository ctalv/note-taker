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

console.log(__dirname)
// html routes
// get * to return index.html
// get /notes to return notes.html

// api routes
// get /api/notes to read and return db.json file
// post /api/notes to receive a new note on request body and save to db.json


app.get('*', (req, res) => {
    console.info(`${req.method} request received for * path or index.html`)
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received for /notes path or notes.html`)
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to read and return notes`)
    res.json(data);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to save new note`)
    // destructuring assignment
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
    };

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(200).json(response);

});

// listen
app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);