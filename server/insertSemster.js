import sequelize from "./config/db.js";
import Semester from "./model/Semester.js"; 

const insertSemesters = async () => {
  try {
    await sequelize.sync(); // ensure the table exists

    await Semester.bulkCreate([
      { sem_id: 1 }, 
      { sem_id: 2 }, 
      { sem_id: 3 }, 
      { sem_id: 4 }, 
      { sem_id: 5 }, 
      { sem_id: 6 }  
    ]);

    console.log("Dummy semesters inserted successfully");
  } catch (error) {
    console.error("Error inserting semesters:", error);
  } finally {
    await sequelize.close();
  }
};

insertSemesters();
