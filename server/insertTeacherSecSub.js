import sequelize from "./config/db.js";
import TeacherSubjectSection from "./model/TeacherSubSection.js";

const insertTeacherSubjectSection = async () => {
  try {
    // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    // await sequelize.sync({ force: true });
    // await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    await sequelize.sync();

    const inserted = await TeacherSubjectSection.bulkCreate([
      // ===== T001 - BCA (courseId: 1) =====
      { emp_id: "T001", courseId: "1", semester_id: 1, section_id: "S001", subjectCode: "SUB001" }, // Mathematics
      { emp_id: "T001", courseId: "1", semester_id: 1, section_id: "S001", subjectCode: "SUB002" }, // Data Structures
      { emp_id: "T001", courseId: "1", semester_id: 2, section_id: "S002", subjectCode: "SUB004" }, // DBMS Lab
      { emp_id: "T001", courseId: "1", semester_id: 3, section_id: "S003", subjectCode: "SUB005" }, // Computer Networks
      { emp_id: "T001", courseId: "1", semester_id: 4, section_id: "S004", subjectCode: "SUB006" }, // Web Development

      // ===== T002 - BBA (courseId: 2) =====
      { emp_id: "T002", courseId: "2", semester_id: 1, section_id: "S005", subjectCode: "SUB010" }, // Principles of Management
      { emp_id: "T002", courseId: "2", semester_id: 2, section_id: "S006", subjectCode: "SUB012" }, // Marketing Management
      { emp_id: "T002", courseId: "2", semester_id: 3, section_id: "S007", subjectCode: "SUB013" }, // Financial Accounting
      // ===== T002 - BCA (courseId: 1) =====
      { emp_id: "T002", courseId: "1", semester_id: 5, section_id: "S008", subjectCode: "SUB008" }, // Software Engineering

      // ===== T003 - MCA (courseId: 4) =====
      { emp_id: "T003", courseId: "4", semester_id: 1, section_id: "S009", subjectCode: "SUB025" }, // Advanced Mathematics
      { emp_id: "T003", courseId: "4", semester_id: 2, section_id: "S010", subjectCode: "SUB026" }, // Advanced Data Structures
      { emp_id: "T003", courseId: "4", semester_id: 3, section_id: "S011", subjectCode: "SUB027" }, // Cloud Computing
      { emp_id: "T003", courseId: "4", semester_id: 5, section_id: "S012", subjectCode: "SUB029" }, // Big Data Analytics
      { emp_id: "T003", courseId: "4", semester_id: 6, section_id: "S013", subjectCode: "SUB030" }  // Deep Learning
    ], { ignoreDuplicates: true });

    console.log(`Inserted entries:`, inserted.map(e => e.toJSON()));
    console.log("Dummy Teacher-Subject-Section mappings inserted successfully");
  } catch (error) {
    console.error("Error inserting TeacherSubjectSection mappings:", error);
  } finally {
    await sequelize.close();
  }
};

insertTeacherSubjectSection();
