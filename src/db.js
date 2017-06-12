import Sequelize from 'sequelize'
import config from '../config'
import sqlite3 from 'sqlite3'
import models from './models'

function createDB() {
    return new Promise(resolve => {
        new sqlite3.Database('./db/store.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function () {
            resolve();
        });
    });
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/store.sqlite'
});

models(sequelize, Sequelize);
//sequelize.sync();

export default sequelize;