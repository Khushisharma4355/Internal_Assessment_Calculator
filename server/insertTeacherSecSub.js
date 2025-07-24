//this file has some error 
import sequelize from "./config/db.js";
import TeacherSubjectSection from "./model/TeacherSubSection.js";

const insertTeacherSubjectSection = async () => {
  try {
    await sequelize.sync(); // ensure table exists

    await TeacherSubjectSection.bulkCreate([
      { emp_id: "T001", subjectCode: "SUB001", section_id: "S001" },
      { emp_id: "T001", subjectCode: "SUB002", section_id: "S002" },
      { emp_id: "T002", subjectCode: "SUB001", section_id: "S003" },
      { emp_id: "T002", subjectCode: "SUB002", section_id: "S004" },
      { emp_id: "T001", subjectCode: "SUB001", section_id: "S005" },
      { emp_id: "T002", subjectCode: "SUB002", section_id: "S006" }
    ]);

    console.log("Dummy Teacher-Subject-Section mappings inserted successfully");
  } catch (error) {
    console.error("Error inserting TeacherSubjectSection mappings:", error);
  } finally {
    await sequelize.close();
  }
};

insertTeacherSubjectSection();
