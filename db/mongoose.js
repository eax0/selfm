import mongodb from 'mongodb'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var kittySchema = mongoose.Schema({
        name: String
    });

    var Kitten = mongoose.model('Kitten', kittySchema);

    var silence = new Kitten({ name: 'Silence' });
    console.log(silence.name);
});
