import axiosClient from "@/config/httpClient";
import {
  LoginOrRegisterForm,
  LoginOrRegisterResponseBody,
  Movie,
  ShareMovieForm,
  ShareMovieResponseBody,
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

  static async getMovies(): Promise<AxiosResponse<Movie[]>> {
    const url = "/movie";
    return axiosClient.get<Movie[]>(url);
  }
}
