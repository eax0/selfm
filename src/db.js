import mongoose from 'mongoose'
import * as autoIncrement from "mongoose-auto-increment";

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test2');

let db = mongoose.connection;

autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('db connected')
})

db.autoIncrement = autoIncrement;
global.db = global.db || db;
