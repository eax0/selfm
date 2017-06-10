import express from 'express'
import test1Routes from '../routes/test1'

const app = express()

app.get('/', function (req, res) {
    res.send('hello world')
});

app.use('/test1', test1Routes)

export function startServer() {
    app.listen(3000, function () {
        console.log('start server');
    });
}