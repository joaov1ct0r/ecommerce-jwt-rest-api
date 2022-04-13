import dbConnection from '../config/database.js';

import { DataTypes } from 'sequelize';

let User = dbConnection.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'users',
        timestamps: false
    }
);
