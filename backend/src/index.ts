import "reflect-metadata";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import setCookieParser from "set-cookie-parser";
import argon2 from "argon2";
import { dataSource } from "./config/db";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";
import DevResolver from "./resolvers/DevResolver";
import { Category } from "./entities/category";
import { Ad } from "./entities/ad";
import { User } from "./entities/user";

export type Context = {
  id: number;
  email: string;
  role: string;
};

const start = async () => {
  await dataSource.initialize();
  const users = await User.find();
  if (users.length === 0) {
    await User.save({
      email: "john.doe@gmail.com",
      hashedPassword: await argon2.hash("test"),
    });
  }
  const categories = await Category.find();
  if (categories.length === 0) {
    await Category.save({ name: "Divers" });
  }
  const ads = await Ad.find();
  if (ads.length === 0) {
    await Ad.save({
      category: { id: 1 },
      title: "lunettes",
      description: "Super lunettes",
      owner: { id: 1 },
      ville: "Paris",
      price: 100,
    });
  }
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
    context: async ({ req, res }) => {
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error("NO JWT SECRET KEY CONFIGURED");
      }
      const cookies = setCookieParser.parse(req.headers.cookie ?? "", {
        map: true,
      });

      if (cookies.token && cookies.token.value) {
        const payload = jwt.verify(
          cookies.token.value,
          process.env.JWT_SECRET_KEY
        ) as jwt.JwtPayload;
        if (payload) {
          return { ...payload, res: res };
        }
      }
      return { res: res };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
