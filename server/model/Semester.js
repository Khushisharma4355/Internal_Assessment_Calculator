import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Semester=sequelize.define("Semesters",{
    sem_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
},{
    tableName:"Semesters",
    timestamps:true
})
export default Semester