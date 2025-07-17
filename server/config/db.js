// Sequelize is a Node.js ORM (Object-Relational Mapper) that lets you interact with SQL databases using JavaScript instead of raw SQL queries
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
   {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
}
)
export default sequelize;