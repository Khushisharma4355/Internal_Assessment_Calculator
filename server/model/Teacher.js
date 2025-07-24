import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Department from "./Department.js";
const Teacher = sequelize.define("Teacher", {
    emp_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emp_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emp_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 15],
            is: /^[0-9]+$/i
        }
    },
    emp_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    dep_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Departments",
            key: "dep_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    },
}, {
    tableName: "Teachers",
    timestamps: true
}
)

export default Teacher