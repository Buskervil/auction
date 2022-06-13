<template>
  <div class="container">
    <div class="row gy-3">
      <div class="form-floating col-md-6">
        <input
          type="text"
          id="title"
          v-model="good.title"
          placeholder="Чайник электрический"
          class="form-control"
        />
        <label for="title">Название товара</label>
      </div>
      <div class="form-floating col-sm-2">
        <input
          type="number"
          id="price"
          v-model="good.price"
          placeholder="Чайник электрический"
          class="form-control"
        />
        <label for="price">Цена</label>
      </div>
      <div class="form-check col-sm-2">
        <input
          type="checkbox"
          id="is_active"
          v-model="good.is_active"
          placeholder="Чайник электрический"
          class="form-check-input"
        />
        <label for="is_active" class="form-check-label"
          >Опубликовать сейчас</label
        >
      </div>
      <div class="col-md-6">
        <textarea
          id="description"
          v-model="good.description"
          class="form-control"
          wrap="soft"
          rows="5"
          placeholder="Описание товара"
        ></textarea>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        id="images"
        ref="images"
        v-on:change="handleFileUploads"
        class="hide"
      />
      <div class="col-sm-3">
        <div class="flex-start">
          <button v-on:click="addFiles()" class="btn btn-dark self-start">
            Загрузить изображения
          </button>
        </div>
      </div>
      <div v-if="good.images[0]" class="col-12">
        <div class="flex-start">
          <div
            class="img-container cover"
            v-for="(image, index) in good.images"
            v-bind:key="index"
          >
            <img :src="getUrl(good.images[index])" alt="" />
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="flex-start">
          <button v-on:click="submit()" class="btn btn-dark">Сохранить</button>
        </div>
      </div>
      <div class="form-check col-sm-2">
        <input
          type="checkbox"
          id="is_active"
          v-model="runAuction"
          placeholder="Чайник электрический"
          class="form-check-input"
        />
        <label for="is_active" class="form-check-label"
          >Запустить аукцион</label
        >
      </div>
      <div class="col-sm-5"></div>
      <div class="form-floating col-md-3" v-if="runAuction">
        <input
          class="form-control"
          type="date"
          id="closed_at"
          placeholder="01.01.1990"
          v-model="auction.closed_at_date"
        />
        <label for="closed_at">Дата окончания</label>
      </div>
      <div class="form-floating col-md-3" v-if="runAuction">
        <input
          class="form-control"
          type="time"
          id="closed_at"
          placeholder="14:00"
          v-model="auction.closed_at_time"
        />
        <label for="closed_at">Время окончания</label>
      </div>
      <div class="form-floating col-md-3" v-if="runAuction">
        <input
          class="form-control"
          type="number"
          id="min_price"
          placeholder="400"
          v-model="auction.min_price"
        />
        <label for="min_price">Начальная цена</label>
      </div>
    </div>
    {{ auction.closed_at_time }}
    {{ auction.closed_at_date }}
    {{ new Date(`${auction.closed_at_date}T${auction.closed_at_time}`) }}

    <div class="auction row"></div>
  </div>
</template>

<script>
import { Auction } from "../api/auction";
import { Good } from "../api/good";

export default {
  data() {
    return {
      newGood: {
        title: "",
        description: "",
        price: "",
        amount: "",
        is_active: true,
        auctions: [],
        images: [],
      },

      auction: {
        closed_at_date: "",
        closed_at_time: "",
        min_price: 1000,
      },
      oldImagesToDelete: [],
      count: 0,
      runAuction: false,
    };
  },
  computed: {
    good() {
      let currentGood = this.$store.state.currentGood.id
        ? this.$store.state.currentGood
        : this.newGood;
      this.checkAuction(currentGood);
      this.setAuction(currentGood);
      return currentGood;
    },
    date() {
      return new Date();
    },
  },
  methods: {
    addFiles() {
      this.$refs.images.click();
    },
    checkAuction(good) {
      if (good.auctions[0]) this.runAuction = true;
    },
    setAuction(good) {
      if (good.auctions[0]) {
        let closed_at = new Date(good.auctions[0].closed_at);
        this.auction = {
          closed_at_date: closed_at.toLocaleDateString(),
          closed_at_time: closed_at.toLocaleTimeString(),
          min_price: good.auctions[0].min_price,
        };
      }
      return;
    },
    handleFileUploads() {
      let uploadedFiles = this.$refs.images.files;
      this.oldImagesToDelete = this.good.images;
      this.good.images = [];
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.good.images.push(uploadedFiles[i]);
      }
    },
    getUrl(file) {
      console.log(file.image);
      if (file.image) {
        return file.image;
      } else {
        return URL.createObjectURL(file);
      }
    },
    submit() {
      let date = new Date(
        `${this.auction.closed_at_date}T${this.auction.closed_at_time}`
      );

      console.log("Иду в axios количество картинок:" + this.good.images.length);
      if (this.good.id) {
        Good.update({
          good: this.good,
          toDelete: this.oldImagesToDelete,
        }).then(() => {
          let auction = {
            closed_at: date,
            min_price: this.auction.min_price,
            good: this.good.id,
          };
          if (this.runAuction) Auction.create(auction);
          this.$router.push(`/good/${this.good.id}`);
        });
      } else {
        Good.create(this.good).then((response) => {
          console.log("После создания нового продукта");
          console.log(response);
          let auction = {
            closed_at: date,
            min_price: this.auction.min_price,
            good: response.data.id,
          };
          console.log("пусть аксиос создасть аукцион");
          console.log(auction);
          if (this.runAuction) Auction.create(auction);
          this.$router.push(`/good/${response.data.id}`);
        });
      }
    },
  },
  beforeMount() {
    console.log(this.$route.params.id);
    if (this.$route.params.id)
      this.$store.dispatch("updateCurrentGood", { id: this.$route.params.id });
    else this.$store.commit("updateCurrentGood", {});
  },
};
</script>

<style lang="scss">
.hide {
  display: none;
}

.flex-start {
  display: flex;
  justify-content: start;
  gap: 20px;
}

.img-wraper-container {
  display: flex;
  justify-content: space-between;
}

.img-container {
  width: 20%;
  height: 200px;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.img-container.contain img {
  position: absolute;
  left: -10000%;
  right: -10000%;
  top: -10000%;
  bottom: -10000%;
  margin: auto auto;
  max-width: 10%;
  max-height: 10%;
  -webkit-transform: scale(10);
  transform: scale(10);
}
.img-container.cover img {
  position: absolute;
  left: -10000%;
  right: -10000%;
  top: -10000%;
  bottom: -10000%;
  margin: auto auto;
  min-width: 1000%;
  min-height: 1000%;
  -webkit-transform: scale(0.1);
  transform: scale(0.1);
}
</style>
