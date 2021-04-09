import { Request, Response } from "express";
import { JwtPayload } from "./JwtPayload";
export type MyContext = {
  req: Request;
  res: Response;
  jwtPayload?: JwtPayload;
};
