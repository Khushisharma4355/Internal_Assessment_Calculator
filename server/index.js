// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from '@apollo/server/standalone';
import express from "express";
import sequelize from "./config/db.js";
// import  Student  from "./model/Student.js";
// import Course from "./model/Course.js";
import { syncDatabase } from "./model/models.js";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.json());
const PORT=process.env.PORT||4000;
// sequelize.sync({alter:true})
// .then(()=>{
//     console.log("My sql synced");
// })
syncDatabase();
app.listen(PORT,()=>{
    console.log("server running  at 4000 port");
})
