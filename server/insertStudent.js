// This file is used to insert data into the Student table only
// So run this whenever you want to insert new data, okkk Shri Shri Pallavi ji 😄
// 👍👍👍 okkk Khushi jiiii

import sequelize from './config/db.js';
import Student from './model/Student.js';

const insertStudent = async () => {
  try {
    await sequelize.sync(); // make sure the table exists

    const newStudents = [
      {
        student_name: "Sarita Rana",
        classs: "BBA",
        courseId: "2", // BBA
        rollno: 2001,
        registrationNo: 20231001,
        student_email: "saritarana7788@gmail.com",
        parent_Detail: "8307239166",
        section_id: "S002",
        semester_id: "3",
        dep_id: "DEP002"
      },
      {
        student_name: "Aditya Verma",
        classs: "MCA",
        courseId: "3", // MCA
        rollno: 2002,
        registrationNo: 20231002,
        student_email: "aditya.verma@example.com",
        parent_Detail: "9812345670",
        section_id: "S001",
        semester_id: "1",
        dep_id: "DEP001"
      },
      {
        student_name: "Megha Kapoor",
        classs: "MBA",
        courseId: "4", // MBA
        rollno: 2003,
        registrationNo: 20231003,
        student_email: "megha.kapoor@example.com",
        parent_Detail: "9765432100",
        section_id: "S002",
        semester_id: "1",
        dep_id: "DEP002"
      },
      {
        student_name: "Rajesh Kumar",
        classs: "BCA",
        courseId: "1",
        rollno: 2004,
        registrationNo: 20231004,
        student_email: "rajesh.kumar@example.com",
        parent_Detail: "9856741230",
        section_id: "S001",
        semester_id: "1",
        dep_id: "DEP001"
      },
      {
        student_name: "Priya Nair",
        classs: "BBA",
        courseId: "2",
        rollno: 2005,
        registrationNo: 20231005,
        student_email: "priya.nair@example.com",
        parent_Detail: "9900112233",
        section_id: "S001",
        semester_id: "3",
        dep_id: "DEP002"
      },
      {
        student_name: "Vikram Sharma",
        classs: "MCA",
        courseId: "3",
        rollno: 2006,
        registrationNo: 20231006,
        student_email: "vikram.sharma@example.com",
        parent_Detail: "9876501234",
        section_id: "S002",
        semester_id: "2",
        dep_id: "DEP001"
      },
      {
        student_name: "Sneha Gupta",
        classs: "MBA",
        courseId: "4",
        rollno: 2007,
        registrationNo: 20231007,
        student_email: "sneha.gupta@example.com",
        parent_Detail: "9823456781",
        section_id: "S001",
        semester_id: "2",
        dep_id: "DEP002"
      },
      {
        student_name: "Aman Yadav",
        classs: "BCA",
        courseId: "1",
        rollno: 2008,
        registrationNo: 20231008,
        student_email: "aman.yadav@example.com",
        parent_Detail: "9811223344",
        section_id: "S002",
        semester_id: "2",
        dep_id: "DEP001"
      },
      {
        student_name: "Tanya Choudhary",
        classs: "BBA",
        courseId: "2",
        rollno: 2009,
        registrationNo: 20231009,
        student_email: "tanya.choudhary@example.com",
        parent_Detail: "9876123456",
        section_id: "S002",
        semester_id: "3",
        dep_id: "DEP002"
      },
      {
        student_name: "Deepak Joshi",
        classs: "BCA",
        courseId: "1",
        rollno: 2010,
        registrationNo: 20231010,
        student_email: "deepak.joshi@example.com",
        parent_Detail: "9812345678",
        section_id: "S002",
        semester_id: "2",
        dep_id: "DEP001"
      },
      {
        student_name: "Pallavi Goswami",
        classs: "BCA",
        courseId: "1",
        rollno: 2011,
        registrationNo: 20231011,
        student_email: "pallavi.goswami@example.com",
        parent_Detail: "9012345678",
        section_id: "S002",
        semester_id: "2",
        dep_id: "DEP001"
      },
      {
        student_name: "Khushi Sharma",
        classs: "BCA",
        courseId: "1",
        rollno: 2012,
        registrationNo: 20231012,
        student_email: "khushi.sharma@example.com",
        parent_Detail: "9876543210",
        section_id: "S001",
        semester_id: "1",
        dep_id: "DEP001"
      }
    ];

    for (const student of newStudents) {
      const exists = await Student.findOne({
        where: { registrationNo: student.registrationNo }
      });

      if (!exists) {
        await Student.create(student);
        console.log(`✅ Added: ${student.student_name}`);
      } else {
        console.log(`⚠ Skipped (already exists): ${student.student_name}`);
      }
    }

    console.log("🎉 Student insertion completed!");
  } catch (error) {
    console.error("❌ Error inserting students:", error);
  } finally {
    await sequelize.close();
  }
};

insertStudent();
