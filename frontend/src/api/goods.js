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
};
