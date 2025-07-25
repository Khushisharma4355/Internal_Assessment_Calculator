import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Course from "./Course.js";
const Department =sequelize.define("Department",{
    dep_id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    dept_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // courseId:{
    //     type:DataTypes.STRING,
    //     references:{
    //         model:"Courses",
    //         key:"courseId"
    //     }
    // }
},
{
    tableName:"Departments",
    timestamps:true
}
);
// console.log("inside department")
export default Department