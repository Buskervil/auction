<template>
  <div class="container">
    <div class="form">
      <p>Товар</p>
      <input type="text" id="title" v-model="good.title" />
      <label for="title">Название товара</label>
      <input type="text" id="description" v-model="good.description" />
      <label for="description">Описание товара</label>
      <input type="image" id="images" v-model="good.images[0]" />
      <label for="images">Картинка</label>
      <input type="number" id="price" v-model="good.price" />
      <label for="price">Цена</label>
      <input type="checkbox" id="is_active" v-model="good.is_active" />
      <label for="is_active">Опубликовать сейчас</label>
    </div>
    <div class="form">
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
    {{ good }}
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
