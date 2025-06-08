require('dotenv').config();

const bodyParser = require('body-parser');                      // Import body-parser to parse request bodies
let express = require('express');
let app = express();

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));             // Middleware to parse URL-encoded bodies

app.post('/name', (req, res) => {                                // API endpoint to handle POST request with JSON body
    const first = req.body.first;
    const last = req.body.last;
    res.json({name: `${first} ${last}`});
});


app.use( (req, res, next) => {                                   // Middleware to log request method, path, and IP address
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

const absolutePath = __dirname + '/views/index.html';            // Absolute path to the HTML file
app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {                                 // API endpoint to return JSON response
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
});

app.get('/now', (req, res, next) => {                            // Middleware to add current time to request object
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {                           // API endpoint to echo a word
    res.json({echo: req.params.word});
});

app.get('/name', (req, res) => {                                // API endpoint to handle query parameters
    const first = req.query.first;
    const last = req.query.last;
    res.json({name: `${first} ${last}`});
});     

module.exports = app;