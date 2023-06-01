import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string =
    req.body.token || req.query.token || req.headers["Authorization"];

  if (!token || token.includes("Bearer")) {
    return res
      .status(403)
      .send("A bearer token is required for authentication");
  }
  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET_KEY || ""
    );
    console.log({ decoded });
    // req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
