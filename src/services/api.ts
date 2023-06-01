import axiosClient from "@/config/httpClient";
import {
  FetchYoutubeVideoInfoData,
  LoginOrRegisterForm,
  LoginOrRegisterResponseBody,
  YoutubeVideoInfo,
} from "@/types/app";
import { AxiosResponse } from "axios";

export class ApiService {
  static async getYoutubeVideoInfo(
    youtubeLink: string
  ): Promise<AxiosResponse<FetchYoutubeVideoInfoData>> {
    return axiosClient.get<FetchYoutubeVideoInfoData>(youtubeLink);
  }

  static async loginOrRegister(
    data: LoginOrRegisterForm
  ): Promise<AxiosResponse<LoginOrRegisterResponseBody>> {
    const url = "/auth/login-or-register";
    return axiosClient.post<LoginOrRegisterResponseBody>(url, data);
  }
}
