import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_API,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
  },
});

export const setAuthRequestHeader = (token: string | null) => {
  if (token)
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosClient.defaults.headers.common["Authorization"] = undefined;
};

export default axiosClient;
