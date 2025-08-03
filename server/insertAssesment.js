import sequelize from "./config/db.js";
import Assessment from "./model/Assessment.js";

const insertAssessment = async () => {
  try {
    // Remove force:true if tables already exist and data is there
    await sequelize.sync();

    await Assessment.bulkCreate([
      {
        assmt_id: "A001",
        registrationNo: 20230001,  // Khushi
        subjectCode: "SUB001",
        section_id: "S001",
        Class_test_1: null,
        Class_test_2: null,
        MTE: null,
        ETE: null,
        semester_id: 1,
        attendance: null,
        emp_id: "T001"
      },
      {
        assmt_id: "A002",
        registrationNo: 20230002,  // Rohan
        subjectCode: "SUB002",
        section_id: "S001",
        Class_test_1: 16,
        Class_test_2: null,
        MTE: null,
        ETE: null,
        semester_id: 1,
        attendance: 82,
        emp_id: "T002"
      },
      {
        assmt_id: "A003",
        registrationNo: 20230003,  // Ananya
        subjectCode: "SUB001",
        section_id: "S002",        // Updated section_id
        Class_test_1: 19,
        Class_test_2: 18,
        MTE: 39,
        ETE: 72,
        semester_id: 2,            // Updated semester_id
        attendance: 88,
        emp_id: "T001"
      },
      {
        assmt_id: "A004",
        registrationNo: 20230004,  // Pallavi
        subjectCode: "SUB002",
        section_id: "S002",        // Updated section_id
        Class_test_1: null,
        Class_test_2: null,
        MTE: null,
        ETE: null,
        semester_id: 2,            // Updated semester_id
        attendance: null,
        emp_id: "T002"
      },
      // {
      //   assmt_id: "A006",
      //   registrationNo: 20230004,  // Pallavi
      //   subjectCode: "SUB001",
      //   section_id: "S002",        // Updated section_id
      //   Class_test_1: 25,
      //   Class_test_2: null,
      //   MTE: null,
      //   ETE: 22,
      //   semester_id: 2,            // Updated semester_id
      //   attendance: null,
      //   emp_id: "T002"
      // }
    ]);

    console.log("Dummy assessment data inserted successfully");
  } catch (e) {
    console.error("Error occurred while inserting assessments:", e);
  } finally {
    await sequelize.close();
  }
};

insertAssessment();
