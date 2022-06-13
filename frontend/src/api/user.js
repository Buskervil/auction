import { HTTP } from "./common";
import store from "../store";

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
