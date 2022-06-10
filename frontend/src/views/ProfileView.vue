<template>
  <div class="container">
    <div class="row">
      <div class="img-container col-5">
        <img src="" alt="" class="uset-avatar" />
      </div>

      <div class="user-profile col-7">
        Ваш профиль
        <p>Ваша почта: {{ profile.email }}</p>
        <p>Ваш никнейм: {{ profile.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "a@a",
    };
  },
  computed: {
    profile() {
      console.log("Уже беру данные");
      return this.$store.state.user;
    },
  },
  beforeMount() {
    console.log("До монтирования");
    this.$store.dispatch("getProfile").then();
  },
};
</script>

<style></style>
