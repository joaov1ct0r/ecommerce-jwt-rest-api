import dbConnection from '../config/database.js';

import Product from './productModel.js';

import { DataTypes } from 'sequelize';

let User = dbConnection.define(
    'users',
    {
        id: {
            unique: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'users',
        timestamps: false
    }
);

User.sync();

export default User;
