if (process.env.NODE_ENV !== 'production') {
    var db = {store: './db/test.sqlite'};        
} else {
    db = {store: './db/store.sqlite'};
}

/*const db = {
    host: 'localhost',
    port: '5432',
    db: 'selfm_db',
    user: 'eax',
    pass: 'oke'
};*/

module.exports = {db};