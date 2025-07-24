// models/index.js
import sequelize from "../config/db.js";
import Student from "./Student.js";
import Course from "./Course.js";
import Subject from "./Subjects.js";
// import Subject from "./subject.js";
import Department from "./Department.js";
import Teacher from "./Teacher.js";
import Admin from "./Admin.js";
import Semester from "./Semester.js";
// import CourseSemester from "./CourseSemester.js";
//course has many sem 
Course.hasMany(Semester,{
  foreignKey:"courseId",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
//Course has many Students
Course.hasMany(Student, {
  foreignKey: "courseId"
});
Student.belongsTo(Course, {
  foreignKey: "courseId",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

//course belongs to department
Course.belongsTo(Department,{
  foreignKey:"dep_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})


// Course has many Subjects
Course.hasMany(Subject, {
  foreignKey: "courseId",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Subject.belongsTo(Course, {
  foreignKey: "courseId",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
});


//course belongs to many semsster and semster belongs to many course
Course.belongsToMany(Semester, {
  through: "CourseSemester",
  foreignKey: "courseId",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Semester.belongsToMany(Course, {
  through: "CourseSemester",
  foreignKey: "semesterId",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
});


//student and department
Department.hasMany(Student,{
  foreignKey:"dep_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Student.belongsTo(Department,{
  foreignKey:"dep_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

//teacher 
Teacher.belongsTo(Department,{
  foreignKey:"dep_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Department.hasMany(Teacher,{
  foreignKey:"dep_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Admin.belongsTo(Teacher,{
  foreignKey:"emp_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Teacher.hasMany(Admin,{
  foreignKey:"emp_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

//


const syncDatabase = async () => {
  try {
    // await sequelize.drop();
    await sequelize.sync({alter:true}); // create/update tables
    console.log("All models synced successfully");
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

export { Student, Course, Subject,Teacher,Admin,Department,syncDatabase};
