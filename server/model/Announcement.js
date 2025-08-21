
// export default Announcement;
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Teacher from "./Teacher.js";

const Announcement = sequelize.define(
  "Announcement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // e.g., Exam, Notice, Event
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Teacher, // 👈 foreign key relation with Teacher
        key: "emp_id",
      },
    },
  },
  {
    tableName: "Announcement",
    timestamps: true,
  }
);

// Associations
Teacher.hasMany(Announcement, { foreignKey: "createdBy" });
Announcement.belongsTo(Teacher, { foreignKey: "createdBy" });


export default Announcement;
