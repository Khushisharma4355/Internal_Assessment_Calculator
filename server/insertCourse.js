import sequelize from "./config/db.js";
import Course from "./model/Course.js";

const insertDummyCourses = async () => {
  try {
    // await sequelize.sync({ force: true }); // ensure table exists

    await Course.bulkCreate([
      {
        courseId: "1",
        courseName: "BCA",
        dep_id: "DEP001"
      },
      {
        courseId: "2",
        courseName: "BBA",
        dep_id: "DEP002"
      },
      {
        courseId: "3",
        courseName: "MBA",
        dep_id: "DEP002"
      },
      {
        courseId: "4",
        courseName: "MCA",
        dep_id: "DEP001"
      },
      {
        courseId: "5",
        courseName: "BCA CTIS",
        dep_id: "DEP001"
      }
    ]);

    console.log("Dummy courses inserted successfully");
  } catch (error) {
    console.error("Error inserting courses:", error);
  } finally {
    await sequelize.close();
  }
};

insertDummyCourses();
