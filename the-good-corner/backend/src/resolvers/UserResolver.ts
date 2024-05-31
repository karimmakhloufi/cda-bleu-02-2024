import { Arg, Ctx, Field, Mutation, ObjectType, Query } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../entities/user";
import { Context } from "src";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  role: string;
}

class UserResolver {
  @Query(() => String)
  async login(
    @Arg("email") emailFromClient: string,
    @Arg("password") passwordFromClient: string
  ) {
    try {
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error("NO JWT SECRET KEY DEFINED");
      }
      const userFromDB = await User.findOneByOrFail({ email: emailFromClient });
      console.log("UserFromDB", userFromDB);
      const isPasswordCorrect = await argon2.verify(
        userFromDB.hashedPassword,
        passwordFromClient
      );
      console.log("is password correct", isPasswordCorrect);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { id: userFromDB.id, email: userFromDB.email, role: userFromDB.role },
          process.env.JWT_SECRET_KEY
        );
        return token;
      } else {
        throw new Error("Bad Login");
      }
    } catch (err) {
      throw new Error("Bad Login");
    }
  }

  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await argon2.hash(password);
    const userFromDB = await User.save({
      email: email,
      hashedPassword: hashedPassword,
    });
    console.log("user has just been saved", userFromDB);
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error("NO JWT SECRET KEY DEFINED");
    }
    const token = jwt.sign(
      { id: userFromDB.id, email: userFromDB.email, role: userFromDB.role },
      process.env.JWT_SECRET_KEY
    );

    return token;
  }

  @Query(() => UserInfo)
  async whoAmI(@Ctx() context: Context) {
    if (context.id !== undefined) {
      const user = await User.findOneByOrFail({ id: context.id });
      return { email: user.email, role: user.role, isLoggedIn: true };
    } else {
      return { isLoggedIn: false };
    }
  }
}

export default UserResolver;
