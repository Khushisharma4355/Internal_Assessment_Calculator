import sequelize from "./config/db.js";
import Assessment from "./model/Assessment.js";

const insertAssessment = async () => {
  try {
    // Comment out or remove this line if tables are already created and populated.
    await sequelize.sync();

    await Assessment.bulkCreate([
      // {
      //   assmt_id: "A001",
      //   registrationNo: 20230001,
      //   subjectCode: "SUB001",
      //   Class_test_1: null,
      //   Class_test_2: null,
      //   MTE: null,
      //   ETE: null,
      //   semester_id: 1,
      //   attendance: null,
      //   emp_id: "T001"
      // },
      // {
      //   assmt_id: "A002",
      //   registrationNo: 20230002,
      //   subjectCode: "SUB002",
      //   Class_test_1: 16,
      //   Class_test_2: null,
      //   MTE: null,
      //   ETE: null,
      //   semester_id: 1,
      //   attendance: 82,
      //   emp_id: "T002"
      // },
      // {
      //   assmt_id: "A003",
      //   registrationNo: 20230003,
      //   subjectCode: "SUB001",
      //   Class_test_1: 19,
      //   Class_test_2: 18,
      //   MTE: 39,
      //   ETE: 72,
      //   semester_id: 1,
      //   attendance: 88,
      //   emp_id: "T001"
      // },
      // {
      //   assmt_id: "A004",
      //   registrationNo: 20230004,
      //   subjectCode: "SUB002",
      //   Class_test_1: null,
      //   Class_test_2: null,
      //   MTE: null,
      //   ETE: null,
      //   semester_id: 1,
      //   attendance: null,
      //   emp_id: "T002"
      // },
         {
        assmt_id: "A006",
        registrationNo: 20230004,
        subjectCode: "SUB001",
        Class_test_1: 25,
        Class_test_2: null,
        MTE: null,
        ETE: 22,
        semester_id: 1,
        attendance: null,
        emp_id: "T002"
      }
    ]);

    console.log("Dummy assessment data inserted successfully");
  } catch (e) {
    console.error("Error occurred while inserting assessments:", e);
  } finally {
    await sequelize.close();
  }
};

insertAssessment();
