import { Arg, Mutation } from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/user";

class UserResolver {
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
