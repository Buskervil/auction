import axios from "axios";
import store from "../store";
import router from "../router";

export const HTTP = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

HTTP.interceptors.request.use((request) => {
  console.log("устанавливаю заголовки");
  if (store.getters.access_token)
    request.headers.common.Authorization = store.getters.access_token;
  return request;
});

HTTP.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const status = error?.response?.status;
    if (status === 401) {
      return Token.refreshAccessToken().then((response) => {
        store.commit("setToken", response.data);
        error.config.headers["Authorization"] = store.getters.access_token;
        return HTTP.request(error.config.url);
      });
    } else if (error.config.url.includes("token")) {
      store.commit("logout");
      store.commit("clear");
      router.push("/login");
      return;
    }
    return Promise.reject(error);
  }
);

export const Token = {
  refreshAccessToken() {
    console.log("axios пошел за токеном");
    return HTTP.post("/token/refresh/", {
      refresh: store.getters.refresh_token,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
};

export const User = {
  register([name, email, pass, pass_retype, first_name, last_name]) {
    console.log("имя" + name);
    return HTTP.post("/register/", {
      username: name,
      email: email,
      password: pass,
      password2: pass_retype,
      first_name: first_name,
      last_name: last_name,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  login(name, pass) {
    return HTTP.post("/token/", {
      username: name,
      password: pass,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  getUserById(id) {
    console.log(store.state.token.access);
    console.log("Иду в api");
    console.log(`Bearer ${store.state.token.access}`);
    return HTTP.get(`/user/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  getUserProfile(id) {
    console.log(store.state.token.access);
    console.log("Иду в api");
    return HTTP.get(`/user-profile/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
};
