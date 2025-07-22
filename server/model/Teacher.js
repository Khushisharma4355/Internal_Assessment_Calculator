import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Department from "./Department";
const Teacher = sequelize.define("Teacher",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
    allowNull:false,
    validate: {
        len: [10,15],
        is:/^[0-9]+$/i
    }
    },
    emp_id:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:Department,
            key:"dep_id"
        }
    },
})

export default Teacher