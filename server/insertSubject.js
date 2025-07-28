import sequelize from "./config/db.js";
import Subject from "./model/Subjects.js";

const insertSubjects = async () => {
  try {
    await sequelize.sync({ force: true }); // ensure table exists

    await Subject.bulkCreate([
      {
        subjectCode: "SUB001",
        subjectName: "Mathematics",
        courseId: "1",       // e.g. BCA
        semester_id: 1,
        subjectType: "Theory"
      },
      {
        subjectCode: "SUB002",
        subjectName: "Data Structures",
        courseId: "1",       // BCA
        semester_id: 2,
        subjectType: "Theory"
      },
      {
        subjectCode: "SUB003",
        subjectName: "Operating Systems",
        courseId: "2",       // e.g. BBA
        semester_id: 3,
        subjectType: "Theory"
      },
      {
        subjectCode: "SUB004",
        subjectName: "DBMS Lab",
        courseId: "1",       // BCA
        semester_id: 2,
        subjectType: "Practical"
      }
    ]);

    console.log("Dummy subjects inserted successfully");
  } catch (error) {
    console.error("Error inserting subjects:", error);
  } finally {
    await sequelize.close();
  }
};

insertSubjects();
