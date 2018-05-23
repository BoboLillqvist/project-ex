const express = require('express');
const jwt = require('jsonwebtoken')
const exJwt = require('express-jwt');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//#region jasonwebtoken
const isTokenValid = exJwt({
    secret: new Buffer('ohhSecret', 'base64')
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];

        req.token = bearerToken;

        next();

    } else {
        console.log('403 ???');
        res.sendStatus(403);
    }
}

app.route('/api/*').get(verifyToken, (req, res, next) => {

    jwt.verify(req.token, 'ohhSecret', (err, authData) => {
        if(err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            next();
        }
    });
    
});

//#endregion

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});

