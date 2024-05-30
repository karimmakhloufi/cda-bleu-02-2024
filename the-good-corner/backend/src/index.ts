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
import UserResolver from "./resolvers/UserResolver";
import DevResolver from "./resolvers/DevResolver";

export type Context = {
  id: number;
  email: string;
  role: string;
};

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      DevResolver,
      AdResolver,
      CategoryResolver,
      TagResolver,
      UserResolver,
    ],
    authChecker: ({ context }: { context: Context }, roles) => {
      console.log("roles for this query/mutation ", roles);
      // Check user
      if (!context.email) {
        // No user, restrict access
        return false;
      }

      // Check '@Authorized()'
      if (roles.length === 0) {
        // Only authentication required
        return true;
      }

      // Check '@Authorized(...)' roles inclues the role of user
      if (roles.includes(context.role)) {
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
