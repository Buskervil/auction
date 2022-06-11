<template>
  <div class="container">
    <div class="form">
      <p>Товар</p>
      <div class="form-floating">
        <input
          type="text"
          id="title"
          v-model="good.title"
          placeholder="Чайник электрический"
          class="form-control"
        />
        <label for="title">Название товара</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          id="description"
          v-model="good.description"
          placeholder="Чайник электрический"
          class="form-control"
        />
        <label for="description">Описание товара</label>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        id="images"
        ref="images"
        v-on:change="handleFileUploads"
        class="invisible"
      />
      <button v-on:click="addFiles()" class="btn btn-dark">
        Загрузить изображения
      </button>
      <div class="form-floating">
        <input
          type="number"
          id="price"
          v-model="good.price"
          placeholder="Чайник электрический"
          class="form-control"
        />
        <label for="price">Цена</label>
      </div>
      <div class="form-check">
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

      <img
        v-for="(image, index) in good.images"
        v-bind:key="index"
        :src="getUrl(good.images[index])"
        alt=""
      />
    </div>
    <!-- <div class="form">
      <p>Аукцион</p>
      <input
        type="datetime-local"
        id="started_at"
        v-model="good.auctions[0].started_at"
      />
      <label for="closed_at">Время начала</label>
      <input
        type="datetime-local"
        id="closed_at"
        v-model="good.auctions[0].closed_at"
      />
      <label for="closed_at">Время окончания</label>
      <input type="number" id="price" v-model="good.price" />
      <label for="price">Цена</label>
      <input
        type="checkbox"
        id="is_active"
        v-model="good.auctions[0].is_active"
      />
      <label for="is_active">Активен</label>
    </div>
    {{ good }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      newGood: {
        title: "",
        description: "",
        price: "",
        amount: "",
        is_active: "",
        auctions: [{ started_at: "", colsed_at: "", min_price: "" }],
        images: [],
      },
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
  },
};
</script>

<style>
.good-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.good-image {
  /* width: 100%;
  height: auto; */
}
</style>
