import { Arg, Mutation, Query } from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/user";

class UserResolver {
  @Query(() => String)
  async login(
    @Arg("email") emailFromClient: string,
    @Arg("password") passwordFromClient: string
  ) {
    try {
      const userFromDB = await User.findOneByOrFail({ email: emailFromClient });
      console.log("UserFromDB", userFromDB);
      const isPasswordCorrect = await argon2.verify(
        userFromDB.hashedPassword,
        passwordFromClient
      );
      console.log("is password correct", isPasswordCorrect);
      if (isPasswordCorrect) {
        return "login ok";
      } else {
        throw new Error("Bad Login");
      }
    } catch (err) {
      return "bad login";
    }
  }

  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await argon2.hash(password);
    await User.save({ email: email, hashedPassword: hashedPassword });

    return "User was created";
  }
}

export default UserResolver;
