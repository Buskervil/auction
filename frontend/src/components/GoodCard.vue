<template>
  <div class="card mb-3 text-bg-light">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          :src="
            good.images
              ? good.images[0].image
              : require('../assets/placeholder.png')
          "
          alt="Изображение товара"
          class="img-fluid rounded-start"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ good.title }}</h5>
          <p class="card-text">{{ good.description }}</p>
          <p class="good-price">{{ good.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodCard",
  props: {
    good: Object,
  },
};
</script>

<style lang="scss"></style>
