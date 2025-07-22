import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Teacher from "./Teacher";
const Admin = sequelize.define("Admin", {
emp_id:{
    type:DataTypes.STRING,
    allowNull:false,
    references:{
        model:Teacher,
        key:"emp_id"
    }
}
});
export default Admin;