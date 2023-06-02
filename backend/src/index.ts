import express, { Express, Request, Response } from "express";
import cors from "cors";
// import http from "http";
import { UserService } from "./services/user.service";
import { MovieService } from "./services/movie.service";
import { validateToken, verifyToken } from "./middlewares/auth.middleware";
import { createServer } from "http";
import { Server } from "socket.io";

const app: Express = express();
const port: number = Number(process.env.APP_PORT) || 3001;

export const userAndSocketMap: { [k: number]: any } = {};
const httpServer = createServer(app);
const httpSocketIo = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

httpSocketIo.on("connection", function (socket: any) {
  console.log("a user connected");
  socket.on("send-jwt-token", (data: any) => {
    const jwtPayload = validateToken(data);
    if (jwtPayload) {
      userAndSocketMap[jwtPayload.id] = socket;
    } else {
      socket.disconnect();
    }
  });

  socket.on("disconnect", () => {
    // remove the disconnected socket out of the map
    Object.keys((userId: number) => {
      if (userAndSocketMap[userId].id === socket.id) {
        userAndSocketMap[userId] = undefined;
      }
    });
  });
});

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

app.get("/api/movie", async (req: Request, res: Response) => {
  MovieService.getAll(req, res);
});

httpServer.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
);
