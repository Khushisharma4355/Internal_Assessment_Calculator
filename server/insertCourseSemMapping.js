import sequelize from "./config/db.js";
import CourseSemester from "./model/CourseSemester.js";

const insertCourseSemesterMappings = async () => {
  try {
    await sequelize.sync({ force: true }); // Make sure the table exists

    await CourseSemester.bulkCreate([
      // BCA → 1 to 6
      { courseId: "1", semesterId: 1 },
      { courseId: "1", semesterId: 2 },
      { courseId: "1", semesterId: 3 },
      { courseId: "1", semesterId: 4 },
      { courseId: "1", semesterId: 5 },
      { courseId: "1", semesterId: 6 },

      // BBA → 1 to 6
      { courseId: "2", semesterId: 1 },
      { courseId: "2", semesterId: 2 },
      { courseId: "2", semesterId: 3 },
      { courseId: "2", semesterId: 4 },
      { courseId: "2", semesterId: 5 },
      { courseId: "2", semesterId: 6 },

      // MBA → 1 to 4
      { courseId: "3", semesterId: 1 },
      { courseId: "3", semesterId: 2 },
      { courseId: "3", semesterId: 3 },
      { courseId: "3", semesterId: 4 },

      // MCA → 1 to 4
      { courseId: "4", semesterId: 1 },
      { courseId: "4", semesterId: 2 },
      { courseId: "4", semesterId: 3 },
      { courseId: "4", semesterId: 4 },

      // BCA CTIS → 1 to 6
      { courseId: "5", semesterId: 1 },
      { courseId: "5", semesterId: 2 },
      { courseId: "5", semesterId: 3 },
      { courseId: "5", semesterId: 4 },
      { courseId: "5", semesterId: 5 },
      { courseId: "5", semesterId: 6 },
    ]);

    console.log("Course-Semester mappings inserted successfully");
  } catch (error) {
    console.error("Error inserting Course-Semester mappings:", error);
  } finally {
    await sequelize.close();
  }
};

insertCourseSemesterMappings();
