//this file is use to insert data into the table only nothing else
//so run this whenver you want to insert new data to the table okkk shri shri pallavi ji
import sequelize from './config/db.js';
import Student from './model/Student.js';
import Course from './model/Course.js';
const insertStudent = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to DB');

        //  sync the model (run this only once)
        await sequelize.sync(); // to create table if they dont exist

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
const insertCourse = async () => {
    try {
        await sequelize.authenticate();
        console.log("connected to database");
        await sequelize.sync();
        const course = await Course.bulkCreate([{
            courseId: "1",
            courseName: "BCA"
        }, {
            courseId: "2",
            courseName: "BBA"
        },
            {
                courseId: "3",
                courseName: "MBA"
            },
            {
                courseId: "4",
                courseName: "MCA"
            }
        ]);
        console.log("courses inserted");
        await sequelize.close();
    }
    catch (err) {
        console.log("Error inserting in course", err.message)
    }

};
// insertStudent();
insertCourse();
