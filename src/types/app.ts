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

export type FetchYoutubeVideoInfoData = {
  data: YoutubeVideoInfo;
};

export type LoginOrRegisterForm = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
};

export type Movie = {
  id: number;
  title: string;
  description: string;
  videoLink: string;
  youtubeLink: string;
  user?: User;
  userId: number;
};

export class LoginOrRegisterResponseBody {
  isAuth: boolean = false;
  message: string = "";
  data: User | null = null;
  jwtToken: string | null = null;
}

export class ShareMovieResponseBody {
  message: string = "";
  data: User | null = null;
  isDuplicatedLink: boolean = false;
  success: boolean = true;
}

export type ShareMovieForm = {
  ytLink: string;
};
