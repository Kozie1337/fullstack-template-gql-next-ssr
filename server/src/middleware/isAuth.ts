import { MyContext } from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { makeAuthenticationError } from "../helpers/errors/errors";
import { verifyToken } from "../helpers/auth";
// cookie:   bearer jniegrjneirjgnerijngri (in authorization headers)

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authHeader = context.req.headers["Authorization"];
  if (!authHeader || Array.isArray(authHeader)) throw makeAuthenticationError();

  let payload = null;

  try {
    const token = authHeader.split(" ")[1];
    const jwtPayload = verifyToken(token); // the payload we signed when user logged in, either object or string
    payload = jwtPayload;
  } catch (err) {
    throw makeAuthenticationError();
  }

  if (payload != null) {
    context.jwtPayload = payload;
  } else {
    throw makeAuthenticationError(); // if the function verifyToken returned null, the token wasnt valid
  }

  return next();
};
