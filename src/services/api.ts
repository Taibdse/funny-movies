import axiosClient from "@/config/httpClient";
import { FetchYoutubeVideoInfoData, YoutubeVideoInfo } from "@/types/app";
import { AxiosResponse } from "axios";

export class ApiService {
  static async getYoutubeVideoInfo(
    youtubeLink: string
  ): Promise<AxiosResponse<FetchYoutubeVideoInfoData>> {
    return axiosClient.get<FetchYoutubeVideoInfoData>(youtubeLink);
  }
}
