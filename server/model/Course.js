// models/course.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Course = sequelize.define("Course", {
  courseId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
    tableName: "course",
  timestamps: true
  
});

export default Course;
