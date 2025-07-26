import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Subject from "./Subjects.js";
import Semester from "./Semester.js";
import Student from "./Student.js";
import Teacher from "./Teacher.js";

const Assessment = sequelize.define("Assessment", {
  assmt_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  registrationNo: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Student,    // Table name (string) or Student model
      key: "registrationNo"
    }
  },
  subjectCode: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Subject,
      key: "subjectCode"
    }
  },
  Class_test_1: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  Class_test_2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  MTE: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  ETE: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  sem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Semester,
      key: "sem_id"
    }
  },
  attendance: {            // Spelling fixed: 'attendance'
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  emp_id: {            // clearer naming
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Teacher,
      key: "emp_id"
    }
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ["registrationNo", "subjectCode", "sem_id"]
    }
  ],
  tableName: "Assessments"
});

export default Assessment;
