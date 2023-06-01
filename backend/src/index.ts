import express, { Express, Request, Response } from "express";
import cors from "cors";
import { UserService } from "./services/user.service";
import { MovieService } from "./services/movie.service";
import { verifyToken } from "./middlewares/auth.middleware";

const app: Express = express();
const port: number = Number(process.env.APP_PORT) || 3001;

app.use(express.json());
app.use(cors());

app.post("/api/auth/login-or-register", async (req: Request, res: Response) => {
  UserService.loginOrRegister(req, res);
});

app.post(
  "/api/movie/share",
  verifyToken,
  async (req: Request, res: Response) => {
    MovieService.createMovie(req, res);
  }
);

const server = app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);
