import Sequelize from 'sequelize'

export default function (db, DataTypes) {
    const Todo = db.define('todo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        order: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        caption: {
            type: DataTypes.STRING
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        underscored: true,
    });

    return Todo;
}