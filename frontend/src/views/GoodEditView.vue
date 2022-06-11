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
    </div>
  </div>
</template>

<script>
import { Good } from "../api/goods";

export default {
  data() {
    return {
      newGood: {
        title: "",
        description: "",
        price: "",
        amount: "",
        is_active: true,
        auctions: [{ started_at: "", colsed_at: "", min_price: "" }],
        images: [],
      },
      oldImagesToDelete: [],
    };
  },
  computed: {
    good() {
      return this.$store.state.goods[this.$route.params.id - 1] || this.newGood;
    },
    formatDate() {
      console.log(typeof this.good.published_at);
      return "";
    },
  },
  methods: {
    addFiles() {
      this.$refs.images.click();
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
      console.log("Иду в axios количество картинок:" + this.good.images.length);
      if (this.good.id)
        Good.update({ good: this.good, toDelete: this.oldImagesToDelete });
      else Good.create(this.good);
    },
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
