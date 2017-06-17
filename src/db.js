import Sequelize from 'sequelize'
import config from '../config'
import models from './models'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.db.store,
    logging: false
});

models(sequelize, Sequelize);

export default sequelize;