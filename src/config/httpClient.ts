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

export default axiosClient;
