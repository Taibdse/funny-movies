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

export class MovieService {
  static async createMovie(req: Request, res: Response) {
    return null;
  }
}
