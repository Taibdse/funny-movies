import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import {
  JwtUserPayload,
  LoginOrRegisterResponseBody,
  UserLoginBody,
} from "../types/user.type";
import { prisma } from "../prisma";
import { Movie, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  ShareMovieRequestBody,
  ShareMovieResponseBody,
  YoutubeVideoInfo,
} from "../types/movie.type";
import axios, { AxiosResponse } from "axios";
dotenv.config();

export class MovieService {
  static async getYoutubeInfoByLink(
    link: string
  ): Promise<YoutubeVideoInfo | null> {
    const url = `${process.env.YOUTUBE_API_URL}?url=${link}&format=json`;
    try {
      const res: AxiosResponse<YoutubeVideoInfo> = await axios(url);
      return res.data;
    } catch (error) {}
    return null;
  }

  static async createMovie(req: Request, res: Response) {
    const data: ShareMovieRequestBody = req.body;
    const result = new ShareMovieResponseBody();
    const movie: Movie | null = await prisma.movie.findFirst({
      where: { youtubeLink: data.ytLink },
    });
    if (movie) {
      result.success = false;
      result.isDuplicatedLink = true;
    } else {
      const youtubeVideoInfo = await MovieService.getYoutubeInfoByLink(
        data.ytLink
      );
      if (!youtubeVideoInfo) {
        result.success = false;
        result.message = "The youtube video link is incorrect!";
      } else {
        const videoId: string | null = new URLSearchParams(data.ytLink).get(
          "v"
        );

        const createdMovie: Movie = await prisma.movie.create({
          data: {
            title: youtubeVideoInfo.title,
            description: youtubeVideoInfo.title,
            youtubeLink: data.ytLink,
            videoLink: `https://www.youtube.com/embed/${videoId}?feature=oembed`,
            sharer: { connect: { id: req.user?.id } },
          },
        });
        result.data = createdMovie;
      }
    }
    return res.status(200).json(result);
  }
}
