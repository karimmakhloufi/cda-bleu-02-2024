import "reflect-metadata";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { dataSource } from "./config/db";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import { Category } from "./entities/category";
import UserResolver from "./resolvers/UserResolver";

const start = async () => {
  await dataSource.initialize();
  const categories = await Category.find();
  if (categories.length === 0) {
    Category.save({ name: "divers" });
  }
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context }) => {
      console.log("context in auth checker", context);
      if (context.email !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error("NO JWT SECRET KEY CONFIGURED");
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (payload) {
          return payload;
        }
      }
      return {};
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
