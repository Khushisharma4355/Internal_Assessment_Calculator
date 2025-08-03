import sequelize from "./config/db.js";
import TeacherSubjectSection from "./model/TeacherSubjectSection.js";  // make sure filename matches

const insertTeacherSubjectSection = async () => {
  try {
    // Use force:true ONLY if you want to drop & recreate table, otherwise comment out
    // await sequelize.sync({ force: true });
    await sequelize.sync(); // sync without dropping tables

    const inserted = await TeacherSubjectSection.bulkCreate([
      { emp_id: "T001", subjectCode: "SUB001", section_id: "S001" },
      { emp_id: "T001", subjectCode: "SUB002", section_id: "S002" },
      { emp_id: "T002", subjectCode: "SUB001", section_id: "S001" },
      { emp_id: "T002", subjectCode: "SUB002", section_id: "S002" },
    ], { ignoreDuplicates: true });

    console.log(`Inserted entries:`, inserted);

    console.log("Dummy Teacher-Subject-Section mappings inserted successfully");
  } catch (error) {
    console.error("Error inserting TeacherSubjectSection mappings:", error);
  } finally {
    await sequelize.close();
  }
};

insertTeacherSubjectSection();
