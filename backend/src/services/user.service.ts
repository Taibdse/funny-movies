import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import {
  JwtUserPayload,
  LoginOrRegisterResponseBody,
  UserLoginBody,
} from "../types/user.type";
import { prisma } from "../prisma";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class UserService {
  static async hashPassword(plainPass: string): Promise<string> {
    return bcryptjs.hash(plainPass, 10);
  }

  static async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcryptjs.compare(plainPassword, hashedPassword);
  }

  static async register(email: string, password: string): Promise<User> {
    const hashedPassword = await UserService.hashPassword(password);
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return createdUser;
  }

  static async genJwtToken(userPayload: JwtUserPayload) {
    const token = jwt.sign(userPayload, process.env.JWT_SECRET_KEY || "", {
      expiresIn: "2d",
    });
    return token;
  }

  static async loginOrRegister(req: Request, res: Response) {
    const result = new LoginOrRegisterResponseBody();
    const userLoginRegisterBody: UserLoginBody = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: { email: userLoginRegisterBody.email },
      });
      if (user) {
        const matchedPassword = await UserService.comparePassword(
          userLoginRegisterBody.password,
          user.password
        );
        if (matchedPassword) {
          const token = await UserService.genJwtToken({
            id: user.id,
            email: user.email,
          });
          result.isAuth = true;
          result.jwtToken = token;
          return res.status(200).json(result);
        } else {
          result.message = "Username and password are not matched";
          return res.status(401).json(result);
        }
      } else {
        const createdUser: User = await UserService.register(
          userLoginRegisterBody.email,
          userLoginRegisterBody.password
        );
        const token = await UserService.genJwtToken({
          id: createdUser.id,
          email: createdUser.email,
        });

        result.isAuth = true;
        result.data = { ...createdUser, password: undefined };
        result.jwtToken = token;
        return res.status(201).json(result);
      }
    } catch (error) {
      console.log({ error });
    }
  }
}
