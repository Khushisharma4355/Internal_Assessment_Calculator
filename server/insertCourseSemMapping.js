import sequelize from "./config/db.js";
import CourseSemester from "./model/CourseSemester.js";

const insertCourseSemesterMappings = async () => {
  try {
    await sequelize.sync(); // Make sure the table exists

    await CourseSemester.bulkCreate([
      // BCA → 1 to 6
      { courseId: "1", semester_id: 1 },
      { courseId: "1", semester_id: 2 },
      { courseId: "1", semester_id: 3 },
      { courseId: "1", semester_id: 4 },
      { courseId: "1", semester_id: 5 },
      { courseId: "1", semester_id: 6 },

      // BBA → 1 to 6
      { courseId: "2", semester_id: 1 },
      { courseId: "2", semester_id: 2 },
      { courseId: "2", semester_id: 3 },
      { courseId: "2", semester_id: 4 },
      { courseId: "2", semester_id: 5 },
      { courseId: "2", semester_id: 6 },

      // MBA → 1 to 4
      { courseId: "3", semester_id: 1 },
      { courseId: "3", semester_id: 2 },
      { courseId: "3", semester_id: 3 },
      { courseId: "3", semester_id: 4 },

      // MCA → 1 to 4
      { courseId: "4", semester_id: 1 },
      { courseId: "4", semester_id: 2 },
      { courseId: "4", semester_id: 3 },
      { courseId: "4", semester_id: 4 },

      // BCA CTIS → 1 to 6
      { courseId: "5", semester_id: 1 },
      { courseId: "5", semester_id: 2 },
      { courseId: "5", semester_id: 3 },
      { courseId: "5", semester_id: 4 },
      { courseId: "5", semester_id: 5 },
      { courseId: "5", semester_id: 6 },
    ]);

    console.log("Course-Semester mappings inserted successfully");
  } catch (error) {
    console.error("Error inserting Course-Semester mappings:", error);
  } finally {
    await sequelize.close();
  }
};

insertCourseSemesterMappings();
