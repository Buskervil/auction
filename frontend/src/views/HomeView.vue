<template>
  <div class="container">
    <div class="row search-form gy-3">
      <div class="form-floating col-md-5 offset-md-3">
        <input
          type="text"
          id="search"
          class="form-control"
          v-model="query"
          v-on:input="searchHandler"
          placeholder="Чайник электрический"
        />
        <label for="search">Введите название товара</label>
      </div>
      <button class="search-button btn btn-dark col-md-1" v-on:click="get">
        Поиск
      </button>
    </div>

    <div class="row"></div>
    <GoodCard v-for="good in goods" v-bind:good="good" v-bind:key="good.id" />
  </div>
</template>

<script>
import GoodCard from "@/components/GoodCard.vue";

export default {
  data() {
    return {
      count: "hello",
      query: "",
      testGood: {
        title: "Microwave",
        description: "Very good, I want it self",
        price: 21980.45,
        published_at: Date.now(),
        author: "Rosette",
        is_active: true,
      },
    };
  },
  computed: {
    goods() {
      console.log(
        "Шаблон запрашивает товары" + this.$store.getters.goods || []
      );
      return this.$store.getters.goods;
    },
  },

  methods: {
    reverseMessage: function () {
      this.message = this.message.split("").reverse().join("");
    },
    get: function () {
      console.log("get");
      this.$store.dispatch("getGoods");
    },
    searchHandler: function () {
      this.$store.dispatch("searchGoods", { query: this.query });
    },
  },
  async beforeMount() {
    await this.$store.dispatch("searchGoods", { query: "" });
  },
  components: {
    GoodCard,
  },
};
</script>

<style>
.search-form {
  margin-bottom: 40px;
}
</style>
