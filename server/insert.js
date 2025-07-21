//this file is use to insert data into the table only nothing else
    //so run this whenver you want to insert new data to the table okkk shri shri pallavi ji
import sequelize from './config/db.js';
import Student from './model/Student.js';

const insertStudent = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to DB');

    //  sync the model (run this only once)
    await sequelize.sync(); // or sync({ alter: true }) to run everytime

    // Insert student data
    const student = await Student.create({
      name: 'Pallavi Goswami',
      classs: 'BCA',
      courseId: 'BCA2023',
      rollno: 101001,
      registrationNo: 2023123457,
      email: 'pallvi.sharma@example.com',
      parent: '9876543210',
      section_id: 'A', // or null if not applicable because maine allow null feild bnayi hai in case of mca
    });

    console.log('Student inserted:', student.toJSON());

    await sequelize.close();
  } catch (error) {
    console.error('Error inserting student:', error.message);
  }
};
insertStudent();
