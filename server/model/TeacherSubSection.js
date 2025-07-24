import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const TeacherSubjectSection = sequelize.define("TeacherSubjectSection", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  emp_id: {
    type: DataTypes.STRING,
    references: {
      model: "Teachers",
      key: "emp_id"
    }
  },
  subjectCode: {
    type: DataTypes.STRING,
    references: {
      model: "Subjects",
      key: "subjectCode"
    }
  },
  section_id: {
    type: DataTypes.STRING,
    references: {
      model: "Sections",
      key: "section_id"
    }
  }
}, {
  tableName: "TeacherSubjectSection",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["emp_id", "subjectCode", "section_id"] // ✅ Unique across all 3 now
    }
  ]
});
export default TeacherSubjectSection