import axios from "axios";
import store from "../store";

export const HTTP = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 1000,
});

HTTP.interceptors.request.use((request) => {
  request.headers.common.Authorization = store.getters.access_token;
  return request;
});

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

  get_profile(id) {
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
};
