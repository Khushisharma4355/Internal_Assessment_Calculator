import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Semester = sequelize.define("Semesters", {
  semester_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  semester_Name: {
    type: DataTypes.STRING,  // Changed to STRING for name
    allowNull: false          // Optional, but usually you want a name here
  }
}, {
  tableName: "Semesters",
  timestamps: true
});

export default Semester;
