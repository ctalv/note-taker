// require exress, path, and db data
const express = require('express');
const path = require('path');
let data = require('./db/db.json');
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
    data = JSON.parse(fs.readFileSync('./db/db.json')) || []; // always updates data
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

data.push(newNote);

    const writeToFile = (destination, content) =>
        fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData written to ${destination}`)
        );

    const readAndAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(content);
                writeToFile(file, parsedData);
            }
        });
    };



    readAndAppend(newNote, `./db/db.json`)

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(200).json(data);

});

// app.get('*', (req, res) => {
//     console.info(`${req.method} request received for * path or index.html`)
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });

// listen
app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);