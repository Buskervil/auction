<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="message" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {
      message: "Приветствую, твое Вью приложение",
    };
    
  },
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
