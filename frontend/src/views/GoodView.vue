<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="good-image-container">
          <img
            :src="
              good.images[0]
                ? good.images[0].image
                : require('../assets/placeholder.png')
            "
            alt=""
            class="good-image img-fluid"
          />
        </div>
      </div>
      <div class="col">
        <h2 class="good-header">{{ good.title }}</h2>
        <p class="good__description">{{ good.description }}</p>
        <p class="good_published-at">
          {{ formatDate }}
        </p>
      </div>
    </div>
    {{ good }}
  </div>
</template>

<script>
export default {
  computed: {
    good() {
      return this.$store.state.goods[this.$route.params.id - 1];
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
