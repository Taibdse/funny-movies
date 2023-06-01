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

export class LoginOrRegisterResponseBody {
  isAuth: boolean = false;
  message: string = "";
  data: User | null = null;
  jwtToken: string | null = null;
}
