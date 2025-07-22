import { DataTypes } from "sequelize";
import sequelize from "../config/db";
const Department =sequelize.define("Department",{
    dep_id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
});
export default Department