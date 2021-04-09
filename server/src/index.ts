import "reflect-metadata";
require("dotenv-safe").config();

import establishDbConnection from "./db";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { UserResolver } from "./resolvers/UserResolver";
import cors from "cors";

(async () => {
  await establishDbConnection();

  const app = express();

  app.set("trust proxy", 1);
  // for cookie forwarding since server sits behind the nginx proxy

  app.use(cors());

  app.get("/state/pulse", (_req, res) => res.send({ alive: true }));
  app.get("/");

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(8080, () => {
    console.log("express server started");
  });
})();
