<template>
  <div class="card mb-3 text-bg-light">
    <router-link :to="goodPage + good.id" class="good-link link">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="
              good.images[0]
                ? good.images[0].image
                : require('../assets/placeholder.png')
            "
            alt="Изображение товара"
            class="img-fluid rounded-start"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body good-card">
            <h5 class="card-title">{{ good.title }}</h5>
            <p class="card-text">{{ good.description }}</p>
            <p class="good-price">{{ good.price }}</p>
            <div class="auction-label" v-if="good.auctions[0]">
              <p>Идет аукцион</p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GoodCard",
  data() {
    return {
      goodPage: "/good/",
    };
  },
  props: {
    good: Object,
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.good-link {
  text-decoration: none;
  cursor: pointer;
}
</style>
