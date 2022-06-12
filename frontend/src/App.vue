<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="./assets/logo.png" alt="Лого" width="80" />
        Товары и аукционы
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Переключатель навигации"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-if="userId" class="nav-item">
            <router-link to="/good/edit" class="nav-link plus"
              >Новый товар</router-link
            >
          </li>
          <li v-if="userId" class="nav-item">
            <router-link to="/profile" class="nav-link"
              >Мой профиль</router-link
            >
          </li>
          <li v-if="userId" class="nav-item">
            <router-link to="" class="nav-link" v-on:click="logout"
              >Выход</router-link
            >
          </li>
          <li v-if="!userId" class="nav-item">
            <router-link to="/register" class="nav-link"
              >Регистрация</router-link
            >
          </li>
          <li v-if="!userId" class="nav-item">
            <router-link to="/login" class="nav-link">Вход</router-link>
          </li>
          <li v-if="userId" class="nav-item">
            <router-link to="/basket" class="nav-link">
              <img src="./assets/basket.png" alt="Корзина" width="25" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    userId() {
      return this.$store.state.user_id;
    },
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  z-index: 10;
  margin-bottom: 40px;
  // padding: 30px;

  // a {
  //   // font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }
}
</style>
