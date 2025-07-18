// models/index.js
import sequelize from "../config/db.js";
import Student from "./Student.js";
import Course from "./Course.js";
import Subject from "./Subjects.js";
// import Subject from "./subject.js";

//Course has many Students
Course.hasMany(Student, {
  foreignKey: "courseId"
});

Student.belongsTo(Course, {
  foreignKey: "courseId"
});

Course.hasMany(Subject, {
  foreignKey: "courseId"
});

Subject.belongsTo(Course, {
  foreignKey: "courseId"
});
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // create/update tables
    console.log("All models synced successfully");
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

export { Student, Course, Subject,syncDatabase};
