const express = require('express');
const bodyParser = require('body-parser')
const winston = require('winston');
const fs = require('fs');


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'data.log' }),
    ],
});

app.get('/test', (req, res) => {
    res.send('alive');
})

app.post('/log', (req, res) => {
    if(req.body.log) {
        logger.info(new Date() + '\t' + req.body.log);
    }
    res.send('ok');
})

app.get('/data', (req, res) => {
    fs.readFile('data.log', (err, data) => {
        res.send(data.toString());
    });
})

app.listen(3000);
console.log('Listening on http://localhost:' + port);