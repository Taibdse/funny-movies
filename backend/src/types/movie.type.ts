import { Movie } from "@prisma/client";

export class ShareMovieRequestBody {
  ytLink: string = "";
}

export class ShareMovieResponseBody {
  success: boolean = true;
  isDuplicatedLink: boolean = false;
  message: string = "";
  data: Movie | null = null;
}

export type YoutubeVideoInfo = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};
