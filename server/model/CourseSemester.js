import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Course from "./Course.js";
import Semester from "./Semester.js";
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
      model: Course,
      key: "courseId"
    }
  },
  semesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Semester,
      key: "sem_id"
    }
  }
}, {
  tableName: "CourseSemester",
  timestamps: false
});
export default CourseSemester