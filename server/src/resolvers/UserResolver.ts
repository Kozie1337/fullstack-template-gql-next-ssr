import { validateUser, User } from "../entity/User/User";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import argon2, { hash } from "argon2";
import makeUserManager from "../entity/User/makeUserManager";
import { LoginResponse } from "../entity/User/responses";
import { MyContext } from "../types/MyContext";
import { createRefreshToken, createAccessToken } from "../helpers/auth";
import {
  makeLoginError,
  serverError,
  makeUserInputError,
} from "../helpers/errors/errors";
import { isAuth } from "../middleware/isAuth";

// require("dotenv-safe").config();

const UserManager = makeUserManager();

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async user(@Ctx() { jwtPayload }: MyContext) {
    const user = await UserManager.findByEmail(jwtPayload!.email);
    if (!user) return null;
    return user;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const user = await validateUser(new User(email, password)).catch((err) => {
      throw makeUserInputError(err);
    });

    const existingUser = await UserManager.findByEmail(email).catch((err) => {
      throw serverError;
    });

    if (existingUser) {
      throw makeUserInputError({
        email: "Account with this Email already exists",
      });
    }

    try {
      const hashedPassword = await argon2.hash(user.password as string);
      await UserManager.insert(new User(email, hashedPassword));
      // todo, return a signed JWT instead of boolean
      return true;
    } catch (err) {
      throw serverError;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse> {
    let user = null;

    await validateUser(new User(email, password)).catch((err) => {
      console.log(err);
      throw makeUserInputError(err);
    });

    user = await UserManager.findByEmail(email).catch((err) => {
      console.log(err);

      throw makeLoginError();
    });

    if (!user) throw makeLoginError();

    try {
      if (await argon2.verify(user.password, password)) {
        const token = createAccessToken(user);
        res.cookie("jt", createRefreshToken(user), { httpOnly: true });
        return { accessToken: token };
      } else {
        throw makeLoginError();
      }
    } catch (err) {
      console.log(err);

      throw makeLoginError();
    }
  }
}
