import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Member from "./MembersModel.js";

const Book = db.define("book", {
  code: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

Member.hasMany(Book);
Book.belongsTo(Member);

export default Book;
