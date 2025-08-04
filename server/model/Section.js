// models/Section.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Section = sequelize.define("Section", {
  section_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  section_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "Sections",
  timestamps: true
});

export default Section;
