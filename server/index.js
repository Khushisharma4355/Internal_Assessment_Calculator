import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import cors from "cors";

import { syncDatabase } from "./model/models.js";

const app = express();
app.use(cors());
app.use(express.json()); 
//Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
app.use(
  "/graphql",
  expressMiddleware(server)
);
const PORT = process.env.PORT || 7000;
syncDatabase(); 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
  syncDatabase(); // connect to database
});
