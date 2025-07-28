import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Teacher from "./Teacher.js";
import Subject from "./Subjects.js";
import Section from "./Section.js";
const TeacherSubjectSection = sequelize.define("TeacherSubjectSection", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  emp_id: {
    type: DataTypes.STRING,
    references: {
      model: Teacher,
      key: "emp_id"
    }
  },
  subjectCode: {
    type: DataTypes.STRING,
    references: {
      model: Subject,
      key: "subjectCode"
    }
  },
  section_id: {
    type: DataTypes.STRING,
    references: {
      model: Section,
      key: "section_id"
    }
  }
}, {
  tableName: "TeacherSubjectSection",
  timestamps: false,
  indexes: [
    {
      unique: true, // enable unique constraint
      fields: ['emp_id', 'subjectCode', 'section_id']
    }
  ]
});
export default TeacherSubjectSection;
