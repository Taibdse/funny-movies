import { User } from "@prisma/client";
import { Request } from "express";

export class UserLoginBody {
  email: string = "";
  password: string = "";
}

export class LoginOrRegisterResponseBody {
  isAuth: boolean = false;
  message: string = "";
  data: Partial<User> | null = null;
  jwtToken: string | null = null;
}

export class JwtUserPayload {
  id: number = 1;
  email: string = "";
}

export type RequestWithJwtUserPayload = Request & { user: JwtUserPayload };
