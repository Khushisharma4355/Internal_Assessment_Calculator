// This file is used to insert data into the Student table only
// So run this whenever you want to insert new data, okkk Shri Shri Pallavi ji 😄
// 👍👍👍 okkk Khushi jiiii

import sequelize from './config/db.js';
import Student from './model/Student.js';

const insertStudent = async () => {
  try {
    await sequelize.sync(); // make sure the table exists

    await Student.bulkCreate([
      {
        student_name: "Khushi Sharma",
        classs: "BCA",
        courseId: "1", // BCA
        rollno: 1001,
        registrationNo: 20230001,
        student_email: "khushi@example.com",
        parent_Detail: "9876543210",
        section_id: "S001",
        dep_id: "DEP001"
      },
      {
        student_name: "Rohan Mehta",
        classs: "BBA",
        courseId: "2", // BBA
        rollno: 1002,
        registrationNo: 20230002,
        student_email: "rohan@example.com",
        parent_Detail: "9988776655",
        section_id: "S001",
        dep_id: "DEP002"
      },
      {
        student_name: "Ananya Singh",
        classs: "BCA",
        courseId: "1", // BCA
        rollno: 1003,
        registrationNo: 20230003,
        student_email: "ananya@example.com",
        parent_Detail: "9123456789",
        section_id: "S002",
        dep_id: "DEP001"
      },
      {
        student_name: "Pallavi Goswami",
        classs: "BCA",
        courseId: "1", // BCA
        rollno: 1004,
        registrationNo: 20230004,
        student_email: "pallavi@example.com",
        parent_Detail: "9012345678",
        section_id: "S002",
        dep_id: "DEP001"
      }
    ]);

    console.log("Dummy students inserted successfully");
  } catch (error) {
    console.error("Error inserting students:", error);
  } finally {
    await sequelize.close();
  }
};

insertStudent();
