// models/Section.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Section = sequelize.define("Section", {
  section_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  section_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Courses",
      key: "courseId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  },
  semesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Semesters",
      key: "sem_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }
}, {
  tableName: "Sections",
  timestamps: true
});

export default Section;
