import DB from "../config/database";

import { DataTypes, ModelStatic } from "sequelize";

import IUser from "../../types/userInterface";

const User: ModelStatic<IUser> = DB.define(
  "users",
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
    tableName: "users",
    timestamps: false
  }
);

User.sync();

export default User;
