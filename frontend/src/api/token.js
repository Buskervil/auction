import { HTTP } from "./common";
import store from "../store";

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
