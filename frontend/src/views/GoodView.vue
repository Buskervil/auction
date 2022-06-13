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
        <p>Количество заказов: {{ good.orders_count }}</p>
        <p>Количество отзывов: {{ good.comments.length }}</p>
      </div>
      <div class="col-2 text-sm-start">
        <div class="flex-start buy-block">
          <router-link
            v-if="good.owner.id == user.id"
            :to="'/good/edit/' + good.id"
            class="good-link link"
            >редактировать</router-link
          >
          <p class="display-6">{{ good.price }}р</p>
          <button class="btn btn-dark" v-on:click="toBasket">В корзину</button>
        </div>
      </div>
      <h4>Аукционы</h4>
      <div class="good-auctions col-md-8">
        <p v-if="!good.auctions[0]">Нет активных аукционов</p>
        <div v-if="good.auctions[0]" class="active-auction">
          <AuctionComponent
            v-bind:auction="good.auctions[0]"
            class="blic"
          ></AuctionComponent>
        </div>
      </div>
      <div class="closed-auction col-md-4">
        <p>
          Всего прошло аукционов:
          {{
            good.auctions.length == 0
              ? good.auctions.length
              : good.auctions.length - 1
          }}
        </p>
      </div>
      <div class="comments-block col-12">
        <h4>Отзывы</h4>
        <CommentComponent
          v-for="(comment, index) in good.comments"
          v-bind:key="index"
          v-bind:comment="comment"
        ></CommentComponent>
      </div>
    </div>
  </div>
</template>

<script>
import CommentComponent from "@/components/CommentComponent.vue";
import AuctionComponent from "@/components/AuctionComponent.vue";

export default {
  data() {
    return {
      activeImgIndex: 0,
    };
  },
  computed: {
    good() {
      return this.$store.state.currentGood;
    },
    formatDate() {
      console.log(typeof this.good.published_at);
      return "";
    },
    user() {
      return this.$store.state.user;
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
    // updateState() {
    //   let goodId = this.$route.params.id;
    // },
    toBasket() {
      this.$store.commit("addToBasket", this.good);
    },
  },
  components: {
    CommentComponent,
    AuctionComponent,
  },
  beforeMount() {
    //console.log(this.$route.params.id);
    this.$store.dispatch("updateCurrentGood", { id: this.$route.params.id });
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

h4 {
  margin-top: 40px;
}
</style>
