import express from 'express'
import '../src/db';
import tmRoutes from './routes/tm'
import bodyParser from 'body-parser'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    // cross domain enabled
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/tm/', tmRoutes)

export function startServer() {
    app.listen(3000, function () {
    });
}