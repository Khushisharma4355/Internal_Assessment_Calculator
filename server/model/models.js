// models/index.js
import sequelize from "../config/db.js";
import Student from "./Student.js";
import Course from "./Course.js";
// import Subject from "./subject.js";
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // create/update tables
    console.log("All models synced successfully");
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

export { Student, Course, syncDatabase };
