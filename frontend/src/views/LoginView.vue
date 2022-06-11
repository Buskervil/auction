<template>
  <div class="screen">
    <div class="container">
      <div class="row g-1 gy-1">
        <div class="col-12">
          <h2 class="page-header">
            <a href="/login" class="link active-link">Вход</a> |
            <a href="/register" class="link">Регистрация</a>
          </h2>
        </div>
        <div
          v-for="(field, index) in loginFields"
          :key="index"
          class="mb-3 form-floating col-md-6"
        >
          <input
            :type="field.type"
            :id="field.id"
            v-bind:class="[
              response[field.id] || response.detail ? 'is-invalid' : '',
            ]"
            v-model="field.value"
            class="form-control"
            placeholder="name@example.com"
          />
          <label :for="field.label">{{ field.label }}</label>
          <div id="validationServerUsernameFeedback" class="invalid-feedback">
            {{ response[field.id] || response.detail }}
          </div>
        </div>
        <button v-on:click="login" class="btn btn-lg btn-dark col-4 offset-4">
          Войти
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFields: [
        {
          label: "Имя пользователя (логин)",
          id: "username",
          type: "text",
          placeholder: "Vanya123",
          value: "",
        },
        {
          label: "Пароль",
          id: "password",
          type: "password",
          placeholder: "password",
          value: "",
        },
      ],
      response: {},
    };
  },
  methods: {
    login: function () {
      // console.log(
      //   `Зашли в логин Имя пользователя:${this.loginFields.username.value} Пароль:${this.loginFields.password.value}`
      // );
      this.$store
        .dispatch("login", {
          username: this.loginFields[0].value,
          password: this.loginFields[1].value,
        })
        .then((response) => {
          if (response.status != 200) {
            console.log(`Вернулись в логин, Response`);
            console.log(response.data);
            this.response = response.data;
            console.log(this.response);
          } else {
            this.$router.push("/profile");
          }
        });
    },
  },
  computed: {
    user_id() {
      return this.$store.state.user_id;
    },
  },
};
</script>

<style>
.register_form {
  width: 400px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
