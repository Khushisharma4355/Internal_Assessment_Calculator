import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const CourseSemester = sequelize.define("CourseSemester", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Courses",
      key: "courseId"
    }
  },
  semesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Semesters",
      key: "sem_id"
    }
  }
}, {
  tableName: "CourseSemester",
  timestamps: false
});
export default CourseSemester