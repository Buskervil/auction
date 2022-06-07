import { HTTP } from "./common";
import axios from "axios";

export const Good = {
  list() {
    // const response = await HTTP.get('/good')
    // return response.data

    return HTTP.get("/good/").then((response) => {
      return response.data;
    });
  },
};
