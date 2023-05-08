// require exress, path, and db data
const express = require('express');
const path = require('path');
const data = require('./db/db.json');
// const uuid = require('./helpers/uuid');
const { randomUUID } = require('crypto');
const fs = require('fs');
// const api = require('./public/assets/js/index.js');

PORT = process.env.PORT || 3001;

// app express
app = express();

// middleware for parsing
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
// app.use('/api', api);

// console.log(data)

// html routes
// get * to return index.html
// get /notes to return notes.html

// api routes
// get /api/notes to read and return db.json file
// post /api/notes to receive a new note on request body and save to db.json


app.get('/', (req, res) => {
    console.info(`${req.method} request received for / path or index.html`)
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
        id: randomUUID(),
    };

    const noteString = JSON.stringify(newNote);

    fs.appendFile(`./db/db.json`, 
    `${noteString},`, 
    (err) =>
      err
        ? console.error(err)
        : console.log(
            `New note titled ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(200).json(response);

});

// app.get('*', (req, res) => {
//     console.info(`${req.method} request received for * path or index.html`)
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });

// listen
app.listen(PORT, () => 
    console.log(`Server listening at http://localhost:${PORT}`)
);