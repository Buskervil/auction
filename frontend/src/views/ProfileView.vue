<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="avatar-container">
          <img
            :src="
              userProfile.avatar
                ? userProfile.avatar
                : require('../assets/default-avatar.jpg')
            "
            alt=""
            class="uset-avatar"
          />
        </div>
      </div>

      <div class="user-profile col">
        <p>Ваш профиль</p>
        <p>Товаров в продаже: {{ user.goods_count }}</p>
        <p>Товаров заказано: {{ user.orders_count }}</p>
        <p>Имя: {{ user.first_name }} Фамилия: {{ user.last_name }}</p>
        <p>Ваша почта: {{ user.email }}</p>
        <p>Ваш никнейм: {{ user.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "a@a",
      defAvatar: "../assets/default-avatar.jpg",
    };
  },
  computed: {
    user() {
      console.log("Уже беру данные");
      return this.$store.state.user;
    },
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
  beforeMount() {
    console.log("До монтирования");
    this.$store.dispatch("getProfile").then();
  },
};
</script>

<style>
.avatar-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
}

.uset-avatar {
  width: 100%;
  height: auto;
}

.user-profile {
  text-align: start;
}
</style>
