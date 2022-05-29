import DB from "../config/database";

import { DataTypes, ModelStatic, Model } from "sequelize";

import User from "../models/userModel";

let Product = dbConnection.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    tableName: 'products',
    timestamps: false
  }
);

Product.belongsTo(User, {
  constraints: true,
  foreignKey: 'userId'
});

User.hasMany(Product, {
  foreignKey: 'userId'
});

Product.sync();

export default Product;
