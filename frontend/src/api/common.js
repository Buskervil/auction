import axios from "axios";
import store from "../store";
import router from "../router";
import { Token } from "./token";

export const HTTP = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

HTTP.interceptors.request.use((request) => {
  console.log("устанавливаю заголовки");
  console.log(store.state.token.access);
  if (store.state.token.access)
    request.headers.common.Authorization = store.getters.access_token;
  return request;
});

HTTP.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const status = error?.response?.status;
    if (
      status === 401 &&
      !error.config.url.includes("token") &&
      store.state.token.refresh
    ) {
      return Token.refreshAccessToken().then((response) => {
        store.commit("setToken", response.data);
        error.config.headers["Authorization"] = store.getters.access_token;
        return HTTP.request(error.config.url);
      });
    } else if (error.config.url.includes("token")) {
      store.commit("logout");
      store.commit("clear");
      router.push("/login");
      return error.response;
    }
    return Promise.reject(error);
  }
);
