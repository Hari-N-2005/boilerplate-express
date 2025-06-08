require('dotenv').config();

let express = require('express');
let app = express();

console.log("Hello World");

const absolutePath = __dirname + '/views/index.html';
app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
});

module.exports = app;