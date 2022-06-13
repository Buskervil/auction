import { HTTP } from "./common";

export const Good = {
  list(query = "") {
    console.log("axios пошел за Товарами");
    return HTTP.get(`/good/?search=${query}`)
      .then((response) => {
        console.log("Товары получены");
        return response;
      })
      .catch((error) => {
        console.log("Товары не получены");
        return error.response;
      });
  },
  create(good) {
    var formatData = new FormData();
    formatData.append("title", good.title);
    formatData.append("description", good.description);
    formatData.append("price", good.price);

    return HTTP.post("/good/", formatData, {
      headers: {
        "Content-Type": "mulripart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        this.uploadGoodImages(good.images, response.data.id);
        return response;
      })
      .catch((error) => console.log(error));
  },
  update({ good, toDelete }) {
    var formatData = new FormData();
    formatData.append("title", good.title);
    formatData.append("description", good.description);
    formatData.append("price", good.price);

    return HTTP.put("/good/" + good.id + "/", formatData, {
      headers: {
        "Content-Type": "mulripart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        this.uploadGoodImages(good.images, response.data.id);
      })
      .then(() => {
        this.deleteGoodImages(toDelete);
      })
      .catch((error) => console.log(error));
  },
  uploadGoodImages(images, goodId) {
    console.log("Буду отправлять картинки их у меня;" + images.length);
    for (var i = 0; i < images.length; i++) {
      let formatData = new FormData();
      formatData.append("image", images[i]);
      formatData.append("title", "images[0]");
      formatData.append("good", goodId);
      HTTP.post("/image/", formatData, {
        headers: {
          "Content-Type": "mulripart/form-data",
        },
      })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  },
  deleteGoodImages(images) {
    console.log("Буду удалять картинки их у меня;" + images.length);
    for (var i = 0; i < images.length; i++) {
      HTTP.delete("/image/" + images[i].id)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  },
  getById(id) {
    console.log("axios пошел за товаром");
    return HTTP.get(`/good/${id}/`)
      .then((response) => {
        console.log("Товары получены");
        return response;
      })
      .catch((error) => {
        console.log("Товары не получены");
        return error.response;
      });
  },
};
