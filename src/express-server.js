import express from 'express'
import '../src/db';
import todoRoutes from './routes/todos'
import bodyParser from 'body-parser'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

/*app.use(function (req, res, next) {
    req.db     = db;
    req.models = db.models;
    next();
})*/

// cross domain enabled
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', function (req, res) {
    res.send('hello world')
});

app.use('/todos/', todoRoutes)

export function startServer() {
    app.listen(3000, function () {
    });
}