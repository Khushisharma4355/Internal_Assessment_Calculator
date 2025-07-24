import { DataTypes } from "sequelize";
import sequelize from "../config/db";
const CourseSemester = sequelize.define("CourseSemester", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: "CourseSemester",
  timestamps: false
});
export default CourseSemester;
