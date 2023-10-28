import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Member = db.define(
  "members",
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    penalty: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    penaltyEndDate: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Member;
