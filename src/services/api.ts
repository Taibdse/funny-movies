import { ShareMovieForm } from "@/app/share/constants";
import axiosClient from "@/config/httpClient";
import {
  FetchYoutubeVideoInfoData,
  LoginOrRegisterForm,
  LoginOrRegisterResponseBody,
  ShareMovieResponseBody,
  YoutubeVideoInfo,
} from "@/types/app";
import { AxiosResponse } from "axios";

export class ApiService {
  static async loginOrRegister(
    data: LoginOrRegisterForm
  ): Promise<AxiosResponse<LoginOrRegisterResponseBody>> {
    const url = "/auth/login-or-register";
    return axiosClient.post<LoginOrRegisterResponseBody>(url, data);
  }

  static async shareMovie(
    data: ShareMovieForm
  ): Promise<AxiosResponse<ShareMovieResponseBody>> {
    const url = "/movie/share";
    return axiosClient.post<ShareMovieResponseBody>(url, data);
  }
}
