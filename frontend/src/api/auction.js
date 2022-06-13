import { HTTP } from "./common";

export const Auction = {
  get(id) {
    return HTTP.get(`/auction/${id}/`)
      .then((response) => {
        return response;
      })
      .catch((error) => error.response);
  },
  create(auction) {
    return HTTP.post("/auction/", {
      closed_at: auction.closed_at,
      min_price: auction.min_price,
      good: auction.good,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  },
};
