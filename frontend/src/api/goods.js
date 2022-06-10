import { HTTP } from "./common";

export const Good = {
  list(query = "") {
    return HTTP.get(`/good/?search=${query}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
};
