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
import CourseSemester from "./CourseSemester.js";
import Section from "./Section.js";
import TeacherSubjectSection from "./TeacherSubSection.js";
import Assessment from "./Assessment.js";
//course has many sem 
// Course.hasMany(Semester,{
//   foreignKey:"courseId",
//    onDelete: "CASCADE",
//   onUpdate: "CASCADE"
// })
//Course has many Students
Course.hasMany(Student, {
  foreignKey: "courseId"
});
Student.belongsTo(Course, {
  foreignKey: "courseId",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// A teacher can teach many subjects in different sections
Teacher.belongsToMany(Subject, {
  through: TeacherSubjectSection,
  foreignKey: "emp_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Subject.belongsToMany(Teacher, {
  through: TeacherSubjectSection,
  foreignKey: "subjectCode",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// A section can have multiple teachers for different subjects
Section.belongsToMany(Teacher, {
  through: TeacherSubjectSection,
  foreignKey: "section_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Teacher.belongsToMany(Section, {
  through: TeacherSubjectSection,
  foreignKey: "emp_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});


//course belongs to department
Course.belongsTo(Department,{
  foreignKey:"dep_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

// Student belongs to a section (already handled in your Student model as section_id)
Section.hasMany(Student, { foreignKey: "section_id" });
Student.belongsTo(Section, { foreignKey: "section_id" });

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

// Section belongs to a specific course and semester
Course.hasMany(Section, { foreignKey: "courseId" });
Semester.hasMany(Section, { foreignKey: "semesterId" });
Section.belongsTo(Course, { foreignKey: "courseId" });
Section.belongsTo(Semester, { foreignKey: "semesterId" });



// Student - Assessment
Student.hasMany(Assessment, {
  foreignKey: "registrationNo",
});
Assessment.belongsTo(Student, {
  foreignKey: "registrationNo"
});

// Subject - Assessment
Subject.hasMany(Assessment, {
  foreignKey: "subjectCode"
});
Assessment.belongsTo(Subject, {
  foreignKey: "subjectCode"
});

// Teacher - Assessment
Teacher.hasMany(Assessment, {
  foreignKey: "emp_id"
});
Assessment.belongsTo(Teacher, {
  foreignKey: "emp_id"
});

// Semester - Assessment
Semester.hasMany(Assessment, {
  foreignKey: "sem_id"
});
Assessment.belongsTo(Semester, {
  foreignKey: "sem_id"
});

const syncDatabase = async () => {
  try {
    // await TeacherSubjectSection.drop();
    await sequelize.sync({alter:true}); // create/update tables
    console.log("All models synced successfully");
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

export { Student, Course, Subject,Teacher,Admin,Department,syncDatabase};
