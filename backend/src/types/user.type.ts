import { User } from "@prisma/client";

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
