import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  error?: string; //  -> return error if error

  @Field(() => User, { nullable: true })
  user?: User; //  -> return user if user
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;
}
