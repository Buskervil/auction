<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Зачем она нужна?{{ message }}</p>
    <button v-on:click="reverseMessage">Перевернуть</button>
    <button v-on:click="get">Запрос</button>
    <GoodCard v-for="g in goods" v-bind:good="g" v-bind:key="g.id" />
  </div>
</template>

<script>
import GoodCard from "@/components/GoodCard.vue";

export default {
  data() {
    return {
      count: "hello",
      message: "Привет",
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
      console.log(this.$store.state.goods);
      return this.$store.state.goods;
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
  },
  components: {
    GoodCard,
  },
};
</script>

<style>
button {
  padding: 20px;
}
</style>
