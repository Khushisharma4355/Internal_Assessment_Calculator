import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subject = sequelize.define("Subject", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subjectCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "courses",  // table name or model name
      key: "courseId"
    }
  },
  semester_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: "Semesters",
    //   key: "id"
    // }
  },
  subjectType: {
    type: DataTypes.ENUM("Theory", "Practical"),
    defaultValue: "Theory"
  }
}, {
  tableName: "subjects",
  timestamps: true
});

export default Subject;
