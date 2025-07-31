import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Department = sequelize.define("Department", {
  dep_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  dept_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // Remove any courseId field - this belongs in Course model
}, {
  tableName: "Departments",
  timestamps: true
});

export default Department;