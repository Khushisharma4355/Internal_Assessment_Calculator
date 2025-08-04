import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// import { typeDefs } from "./graphql/typeDefs.js";
// import { resolvers } from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs/index.js";
import resolvers from "./graphql/resolvers/index.js";
import cors from "cors";
import dotenv from "dotenv";
import { syncDatabase } from "./model/models.js";
dotenv.config();
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
