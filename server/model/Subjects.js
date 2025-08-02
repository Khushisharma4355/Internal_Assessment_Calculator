import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Course from "./Course.js";
import Semester from './Semester.js';

const Subject = sequelize.define("Subject", {
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
      model: Course,
      key: "courseId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  },
  semester_id: {       // This is the actual column
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Semester,
      key: "semester_id"
    }
  },
  subjectType: {
    type: DataTypes.ENUM("Theory", "Practical"),
    defaultValue: "Theory"
  }
}, {
  tableName: "Subjects",
  timestamps: true
});

// Associations with consistent foreignKey name:
Subject.belongsTo(Course, { foreignKey: 'courseId' });
Subject.belongsTo(Semester, { foreignKey: 'semester_id' });

Course.hasMany(Subject, { foreignKey: 'courseId' });
Semester.hasMany(Subject, { foreignKey: 'semester_id' });
export default Subject;
