// models/Activity.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Teacher from "./Teacher.js";

const Activity = sequelize.define("Activity", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false // e.g. "Uploaded Marks", "Created Announcement"
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true // optional extra info like "Uploaded marks for SubjectCode: MATH101"
  },
  emp_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Teacher,
      key: "emp_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
}, {
  tableName: "Activities",
  timestamps: true // createdAt, updatedAt
});

export default Activity;
