import sequelize from "./config/db.js";
import Semester from "./model/Semester.js";

const insertSemesters = async () => {
  try {
    await sequelize.sync(); // Drops & recreates tables

    await Semester.bulkCreate([
      { semester_Name: "1" },
      { semester_Name: "2" },
      { semester_Name: "3" },
      { semester_Name: "4" },
      { semester_Name: "5" },
      { semester_Name: "6" }
    ]);

    console.log("Dummy semesters inserted successfully");
  } catch (error) {
    console.error("Error inserting semesters:", error);
  } finally {
    await sequelize.close();
  }
};

insertSemesters();
