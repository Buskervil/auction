import { HTTP } from "./common";

export const Good = {
  list() {
    return HTTP.get("/good/")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
};
