// models/course.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Department from "./Department.js";

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
  dep_id: {
    type: DataTypes.STRING,
    references: {
      model:Department,
      key: "dep_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }
}, {
  tableName: "Courses",
  timestamps: true

});

export default Course;
