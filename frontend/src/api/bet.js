import { HTTP } from "./common";

export const Bet = {
  create(auction, price) {
    return HTTP.post("/bet/", { auction: auction, price: price })
      .then((response) => {
        return response;
      })
      .catch((error) => error.response);
  },
};
