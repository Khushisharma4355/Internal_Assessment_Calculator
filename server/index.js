import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import jwt from "jsonwebtoken";
// import { typeDefs } from "./graphql/typeDefs.js";
// import { resolvers } from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs/index.js";
import resolvers from "./graphql/resolvers/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
// import { graphqlUploadExpress } from "graphql-upload";
// server.js or app.js

import { syncDatabase } from "./model/models.js";

const app = express();
app.use(cors());
app.use(express.json()); 
//Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
});
// graphql-upload middleware
// app.use(graphqlUploadExpress());
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
//await server.start();

// Start Apollo Server
const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    bodyParser.json(), // required with expressMiddleware
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
          try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return { user }; // 🔥 available in resolvers as context.user
          } catch (err) {
            throw new Error("Invalid token");
          }
        }
        return {};
      },
    })
  );


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
}
startServer();
