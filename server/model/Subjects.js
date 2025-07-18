import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subject = sequelize.define("Subject", {
  subjectId: {
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
    unique: true
  },
  subjectType: {
    type: DataTypes.ENUM("Theory", "Practical"),
    defaultValue: "Theory"
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semesterNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "subjects",
  timestamps: false
});

export default Subject;
