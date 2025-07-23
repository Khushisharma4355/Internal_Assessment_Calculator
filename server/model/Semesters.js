import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Semesters=sequelize.define("Semesters",{
    sem_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    course_id:{
        type:DataTypes.STRING,
        allowNull:true,
        
    },

})
export default Semesters