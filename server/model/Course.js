import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Course = sequelize.define("Course", {
  courseId: {
   type: DataTypes.STRING, // or STRING if using ID!
      primaryKey: true,
      allowNull: false
    },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dep_id: {
    type: DataTypes.STRING
    // Remove the references object - we'll handle this in index.js
  }
}, {
  tableName: "Courses",
  timestamps: true
});

export default Course;