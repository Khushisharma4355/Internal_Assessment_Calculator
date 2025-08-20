// models/index.js
import Department from "./Department.js";
import sequelize from "../config/db.js";
import Student from "./Student.js";
import Course from "./Course.js";
import Subject from "./Subjects.js";
// import Subject from "./subject.js";
import Teacher from "./Teacher.js";
import Admin from "./Admin.js";
import Semester from "./Semester.js";
import CourseSemester from "./CourseSemester.js";
import Section from "./Section.js";
// import TeacherSubjectSection from "./TeacherSubSection.js";
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
  otherKey: "subjectCode",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});



Subject.belongsToMany(Teacher, {
  through: TeacherSubjectSection,
  foreignKey: "subjectCode",
  otherKey: "emp_id",
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

// Course.belongsToMany(Semester, {
//   through: {
//     model: CourseSemester,
//     unique: false // if you want to allow duplicates
//   },
//   foreignKey: "courseId",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE"
// });

// Semester.belongsToMany(Course, {
//   through: "CourseSemester",
//   foreignKey: "semester_id",
//    onDelete: "CASCADE",
//   onUpdate: "CASCADE"
// });
Course.belongsToMany(Semester, {
  through: CourseSemester,
  foreignKey: "courseId",
  otherKey: "semester_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Semester.belongsToMany(Course, {
  through: CourseSemester,
  foreignKey: "semester_id",
  otherKey: "courseId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});


Subject.belongsTo(Course, { foreignKey: 'courseId' });
Subject.belongsTo(Semester, { foreignKey: 'semester_id' });

Course.hasMany(Subject, { foreignKey: 'courseId' });
Semester.hasMany(Subject, { foreignKey: 'semester_id' });












Subject.belongsTo(Course, { foreignKey: "courseId" });
Subject.belongsTo(Semester, { foreignKey: "semester_id" });

TeacherSubjectSection.belongsTo(Section, { foreignKey: "section_id" });












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
Teacher.hasOne(Admin,{
  foreignKey:"emp_id",
   onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

// Section belongs to a specific course and semester
Course.hasMany(Section, { foreignKey: "courseId" });
Semester.hasMany(Section, { foreignKey: "semester_id" });
Section.belongsTo(Course, { foreignKey: "courseId" });
Section.belongsTo(Semester, { foreignKey: "semester_id" });



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
  foreignKey: "semester_id"
});
Assessment.belongsTo(Semester, {
  foreignKey: "semester_id"
});

const syncDatabase = async () => {
  try {
  //   console.log('Disabling foreign key checks...');
    // await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
   
    // // Drop all tables safely
    // console.log('Dropping all tables...');
    // await sequelize.drop();

    // console.log('Re-enabling foreign key checks...');
    // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Sync all models
    console.log('Syncing models...');
    await sequelize.sync();
// await Admin.drop();
    console.log("All models synced successfully.");
  } catch (err) {
    console.error("Error syncing models:", err);
  } finally {
    // await sequelize.close(); // Optional: close the DB connection after syncing
  }
};


//teacher subject section 
Teacher.hasMany(TeacherSubjectSection, { foreignKey: 'emp_id' });
TeacherSubjectSection.belongsTo(Teacher, { foreignKey: 'emp_id' });
function setupAssociations() {
  Course.belongsTo(Department, { foreignKey: "dep_id" });
  Department.hasMany(Course, { foreignKey: "dep_id" });
}

setupAssociations(); // Call this after all imports
export { 
  Student, 
  Course, 
  Subject,
  Teacher,
  Admin,
  Department,
  Semester,
  CourseSemester,
  Section,
  TeacherSubjectSection,
  Assessment,
  syncDatabase
};