import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

import Teacher from "./Teacher.js";
import Subject from "./Subjects.js";
import Section from "./Section.js";
import Course from "./Course.js";
import Semester from "./Semester.js";

const TeacherSubjectSection = sequelize.define("TeacherSubjectSection", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  emp_id: {
    type: DataTypes.STRING(20), // reduced length
    references: {
      model: Teacher,
      key: "emp_id"
    },
    allowNull: false
  },
  courseId: {
    type: DataTypes.STRING(10), // reduced length
    references: {
      model: Course,
      key: "courseId"
    },
    allowNull: false
  },
  semester_id: {
    type: DataTypes.INTEGER, // kept as INTEGER
    references: {
      model: Semester,
      key: "semester_id"
    },
    allowNull: false
  },
  subjectCode: {
    type: DataTypes.STRING(20), // reduced length
    references: {
      model: Subject,
      key: "subjectCode"
    },
    allowNull: false
  },
  section_id: {
    type: DataTypes.STRING(10), // reduced length
    references: {
      model: Section,
      key: "section_id"
    },
    allowNull: false
  }
}, {
  tableName: "TeacherSubjectSection",
  timestamps: false,
 indexes: [
  {
    unique: true,
    name: 'uniq_emp_course_sem_sub_sec',
    fields: [
      { name: "emp_id", length: 20 },
      { name: "courseId", length: 10 },
      { name: "semester_id"},
      { name: "subjectCode", length: 20 },
      { name: "section_id", length: 10 }
    ]
  }
]

});

// Associations
TeacherSubjectSection.belongsTo(Teacher, { foreignKey: "emp_id" });
TeacherSubjectSection.belongsTo(Course, { foreignKey: "courseId" });
TeacherSubjectSection.belongsTo(Semester, { foreignKey: "semester_id" });
TeacherSubjectSection.belongsTo(Subject, { foreignKey: "subjectCode" });
TeacherSubjectSection.belongsTo(Section, { foreignKey: "section_id" });

export default TeacherSubjectSection;
