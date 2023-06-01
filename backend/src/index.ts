import express, { Express, Request, Response } from "express";
import { UserLoginBody } from "./types/user.type";
import { UserService } from "./types/services/user.service";

const app: Express = express();
const port: number = 3001;

app.get("/login-or-resgister", async (req: Request, res: Response) => {
  UserService.loginOrRegister(req, res);
});
console.log(123);

const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);
