import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Student=sequelize.define("Student",{     //create a table named Students in the db
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    classs:{
        type:DataTypes.STRING,
        allowNull:false
    },
    course:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rollno:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    registrationNo:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    parent:{
        type:DataTypes.STRING,
    },

});
export default Student