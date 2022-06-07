<template>
    <div >
        <div class="good-card">
            <div class="good-card__description">
            <p class="good-card__title">{{good.title}}</p>
            <p class="good-card__short">{{good.description}}</p>
            <p class="good-price">{{good.price}}</p>
            </div>
            <div class="good-card__image-container">
                <img src="" alt="Изображение товара" class="good-card__image">
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

<style lang="scss">
.good-card{
    display: flex;
    height: 80px;
    width: 80%;
    background-color: #ccc;
    padding: 20px;
}
</style>