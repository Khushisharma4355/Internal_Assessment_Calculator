// // ES Module style Sequelize model
// import { DataTypes } from "sequelize";
// import sequelize from "../config/db.js";
// // /export default (sequelize) => {
//   const Announcement = sequelize.define("Announcement", {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     audience: {
//       type: DataTypes.ENUM("Students", "Teachers", "Both"),
//       allowNull: false,
//     },
//     file: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     fileUrl: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     type: {
//       type: DataTypes.ENUM("Date Sheet", "Time Table", "Event", "General"),
//       allowNull: false,
//     },
//     fileUrl: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     uploadedBy: {
//       type: DataTypes.STRING, // could be foreign key if linked with User
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     expiresAt: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//   });
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
