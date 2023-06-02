import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined | string[] = req.headers["authorization"];

  if (!token || !token.includes("Bearer")) {
    return res
      .status(403)
      .send("A bearer token is required for authentication");
  }
  try {
    const decoded: any = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET_KEY || ""
    );
    req.user = { id: decoded.id, email: decoded.email };
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export const validateToken = (token: string | null): any => {
  if (!token || !token.includes("Bearer")) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET_KEY || ""
    );
    return decoded;
  } catch (err) {
    return null;
  }
};
