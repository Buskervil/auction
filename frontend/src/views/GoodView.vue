<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <div class="flex">
          <div class="good-image-container cover">
            <img
              :src="
                good.images[activeImgIndex]
                  ? good.images[activeImgIndex].image
                  : require('../assets/placeholder.png')
              "
              alt=""
              class="good-image img-fluid"
            />
          </div>
          <div v:if="good.images[0]" class="flex-start">
            <div
              v-on:click="setActiveImage(index)"
              v-for="(image, index) in good.images"
              v-bind:key="index"
              class="img-container cover cursor-zoom"
              style="height: 100px"
            >
              <img :src="getUrl(good.images[index])" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-5 text-sm-start">
        <h2 class="good-header">{{ good.title }}</h2>
        <p class="good__description">{{ good.description }}</p>
        <p class="good_published-at">
          {{ formatDate }}
        </p>
        <p class="good_published-at">
          Продавец
          <router-link
            :to="'/profile/' + good.owner.id"
            class="good-link link"
            >{{ good.owner.username }}</router-link
          >
        </p>
      </div>
      <div class="col-2 text-sm-start">
        <div class="flex-start buy-block">
          <router-link
            v-if="good.owner.id == user"
            :to="'/good/edit/' + good.id"
            class="good-link link"
            >редактировать</router-link
          >
          <p class="display-6">{{ good.price }}р</p>
          <button class="btn btn-dark">В корзину</button>
        </div>
      </div>
      <div class="col-12"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeImgIndex: 0,
    };
  },
  computed: {
    good() {
      return this.$store.state.goods[this.$route.params.id - 1];
    },
    formatDate() {
      console.log(typeof this.good.published_at);
      return "";
    },
    user() {
      return this.$store.state.user_id;
    },
  },
  methods: {
    getUrl(file) {
      console.log(file.image);
      if (file.image) {
        return file.image;
      } else {
        return URL.createObjectURL(file);
      }
    },
    setActiveImage(index) {
      this.activeImgIndex = index;
    },
  },
};
</script>

<style>
.flex {
  display: flex;
  flex-direction: column;
}

.cursor-zoom {
  cursor: zoom-in;
}

.buy-block {
  flex-direction: column;
  /* align-items: start; */
}

.button-block {
  display: block;
}
.good-image-container {
  width: 100%;
  height: 400px;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}
.good-image-container.cover img {
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
