import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Course from "./Course.js";

const Subject = sequelize.define("Subject", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subjectCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Course,  // table name or model name
      key: "courseId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
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
  tableName: "Subjects",
  timestamps: true
});

export default Subject;
