import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Department from "./Department.js"; // This import is used for associations below

const Teacher = sequelize.define("Teacher", {
  emp_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  emp_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emp_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  emp_phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 15],
      is: /^[0-9]+$/i
    }
  },
  dep_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Department,  
      key: "dep_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
}, {
  tableName: "Teachers",
  timestamps: true
});

export default Teacher;
