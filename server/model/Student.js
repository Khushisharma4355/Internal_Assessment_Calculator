import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Student = sequelize.define("Student", {     //create a table named Students in the db
    //       id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //   },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classs: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Courses",     // table name 
            key: "courseId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
    },
    rollno: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    registrationNo: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    student_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    parent_Detail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 15], // Optional: restrict to valid mobile number lengths
            is: /^[0-9]+$/i // Optional: allows only digits (no letters)
        }
    },
    section_id: {
        type: DataTypes.STRING,
        allowNull: true, //  Allows MCA or non-section students
        // references: {
        //     model: 'Sections',
        //     key: 'id'
        // }
    },
    dep_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: "Departments",
            key: "dep_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    }
},
    {
        tableName: "Students",
        timestamps: true
    }
);
export default Student