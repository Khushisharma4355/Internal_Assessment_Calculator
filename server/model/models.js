// models/index.js
import sequelize from "../config/db.js";

// Import Models
import Department from "./Department.js";
import Student from "./Student.js";
import Course from "./Course.js";
import Subject from "./Subjects.js";
import Teacher from "./Teacher.js";
import Admin from "./Admin.js";
import Semester from "./Semester.js";
import CourseSemester from "./CourseSemester.js";
import Section from "./Section.js";
import Announcement from "./Announcement.js";
import TeacherSubjectSection from "./TeacherSubSection.js";
import Assessment from "./Assessment.js";
import  Activity  from "./Activity.js"; // Your new model

//----------------------------------------
// Associations
//----------------------------------------

// Course ↔ Student
Course.hasMany(Student, { foreignKey: "courseId" });
Student.belongsTo(Course, { foreignKey: "courseId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Teacher ↔ Subject (many-to-many through TeacherSubjectSection)
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

// Teacher ↔ Section (many-to-many)
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

// Course ↔ Department
Course.belongsTo(Department, { foreignKey: "dep_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Department.hasMany(Course, { foreignKey: "dep_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Student ↔ Section
Section.hasMany(Student, { foreignKey: "section_id" });
Student.belongsTo(Section, { foreignKey: "section_id" });

// Course ↔ Subject
Course.hasMany(Subject, { foreignKey: "courseId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Subject.belongsTo(Course, { foreignKey: "courseId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Course ↔ Semester (many-to-many)
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

// Subject ↔ Semester
Subject.belongsTo(Semester, { foreignKey: "semester_id" });
Semester.hasMany(Subject, { foreignKey: "semester_id" });

// TeacherSubjectSection ↔ Teacher & Section
Teacher.hasMany(TeacherSubjectSection, { foreignKey: "emp_id" });
TeacherSubjectSection.belongsTo(Teacher, { foreignKey: "emp_id" });
TeacherSubjectSection.belongsTo(Section, { foreignKey: "section_id" });

// Student ↔ Department
Department.hasMany(Student, { foreignKey: "dep_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Student.belongsTo(Department, { foreignKey: "dep_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Teacher ↔ Department
Teacher.belongsTo(Department, { foreignKey: "dep_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Department.hasMany(Teacher, { foreignKey: "dep_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Admin ↔ Teacher (1-to-1)
Admin.belongsTo(Teacher, { foreignKey: "emp_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Teacher.hasOne(Admin, { foreignKey: "emp_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Section ↔ Course & Semester
Course.hasMany(Section, { foreignKey: "courseId" });
Section.belongsTo(Course, { foreignKey: "courseId" });

Semester.hasMany(Section, { foreignKey: "semester_id" });
Section.belongsTo(Semester, { foreignKey: "semester_id" });

// Teacher ↔ Activity
Teacher.hasMany(Activity, { foreignKey: "emp_id" });
Activity.belongsTo(Teacher, { foreignKey: "emp_id" });

// Assessment Associations
Student.hasMany(Assessment, { foreignKey: "registrationNo" });
Assessment.belongsTo(Student, { foreignKey: "registrationNo" });

Subject.hasMany(Assessment, { foreignKey: "subjectCode" });
Assessment.belongsTo(Subject, { foreignKey: "subjectCode" });

Teacher.hasMany(Assessment, { foreignKey: "emp_id" });
Assessment.belongsTo(Teacher, { foreignKey: "emp_id" });

Semester.hasMany(Assessment, { foreignKey: "semester_id" });
Assessment.belongsTo(Semester, { foreignKey: "semester_id" });

//----------------------------------------
// Sync Function
//----------------------------------------
const syncDatabase = async () => {
  try {
    console.log("Syncing models...");
    await sequelize.sync();
    console.log("All models synced successfully.");
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

//----------------------------------------
// Export
//----------------------------------------
export {
  sequelize,
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
  Announcement,
  Activity,
  syncDatabase
};
