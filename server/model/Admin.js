import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Teacher from "./Teacher.js";
const Admin = sequelize.define("Admin", {
emp_id:{
    type:DataTypes.STRING,
    allowNull:false,
    primaryKey:true,
    references:{
        model:Teacher,
        key:"emp_id"
    }
   
},
   password:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    }
},{
    tableName:"Admin",
    timestamps:true
}
);
export default Admin;