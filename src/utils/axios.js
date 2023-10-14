import axios from "axios";

import AuthProvider from "./auth";
import { refresh } from "./refreshToken";

const baseUrl = "https://product-feedback-api-nicg.onrender.com/api";

const axiosBase = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  function (config) {
    if (!config.headers["Authorization"] && AuthProvider.jwt) {
      config.headers["Authorization"] = "Bearer " + AuthProvider.jwt;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  function (req) {
    return req;
  },
  async function (error) {
    const prevRequest = error?.config;

    if (error.response.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;

      const jwt = await refresh();
      AuthProvider.setJwt(jwt);
      prevRequest.headers["Authorization"] = "Bearer " + jwt;
      return axiosBase(prevRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

export { axiosBase, axiosPrivate };
