import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { LoginOrRegisterResponseBody, UserLoginBody } from "../user.type";
import { prisma } from "../../prisma";
import { User } from "@prisma/client";

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

  static async loginOrRegister(req: Request, res: Response) {
    // const posts = await prisma.post.findMany({
    //   where: { published: true },
    //   include: { author: true },
    // })
    // res.json(posts)
    const result = new LoginOrRegisterResponseBody();
    const userLoginRegisterBody: UserLoginBody = req.body;
    const user = await prisma.user.findFirst({
      where: { email: userLoginRegisterBody.email },
    });
    if (user) {
      const matchedPassword = await UserService.comparePassword(
        userLoginRegisterBody.password,
        user.password
      );
      if (matchedPassword) {
        result.isAuth = true;
        return res.status(200).json(result);
      } else {
        result.message = "";
        return res.status(401).json(result);
      }
    } else {
      const createdUser: User = await UserService.register(
        userLoginRegisterBody.email,
        userLoginRegisterBody.password
      );
      result.isAuth = true;
      result.data = { ...createdUser, password: undefined };
      return res.status(201).json(result);
    }
  }
}
