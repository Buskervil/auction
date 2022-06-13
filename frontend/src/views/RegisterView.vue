<template>
  <div class="screen">
    <div class="container">
      <div class="row g-1 gy-1">
        <div class="col-12">
          <h2 class="page-header">
            <a href="/login" class="link">Вход</a> |
            <a href="/login" class="link active-link">Регистрация</a>
          </h2>
        </div>

        <div
          v-for="(field, index) in registerFields"
          :key="index"
          class="mb-3 form-floating col-md-6"
        >
          <input
            :type="field.type"
            :id="field.id"
            v-bind:class="[
              response[field.id] ? 'is-invalid' : field.value ? 'is-valid' : '',
            ]"
            v-model="field.value"
            class="form-control"
            placeholder="name@example.com"
          />
          <label :for="field.label">{{ field.label }}</label>
          <div id="validationServerUsernameFeedback" class="invalid-feedback">
            {{ response[field.id] }}
          </div>
        </div>

        <button
          v-on:click="register"
          class="btn btn-lg btn-dark col-4 offset-4"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { User } from "../api/user";

export default {
  data() {
    return {
      registerFields: [
        {
          label: "Имя пользователя (логин)",
          id: "username",
          type: "text",
          placeholder: "Vanya123",
          value: "",
        },
        {
          label: "Email",
          id: "email",
          type: "email",
          placeholder: "vanya@mail.ru",
          value: "",
        },
        {
          label: "Пароль",
          id: "password",
          type: "password",
          placeholder: "password",
          value: "",
        },
        {
          label: "Повторите пароль",
          id: "password2",
          type: "password",
          placeholder: "password-retype",
          value: "",
        },
        {
          label: "Имя",
          id: "first_name",
          type: "text",
          placeholder: "Иван",
          value: "",
        },
        {
          label: "Фамилия",
          id: "last_name",
          type: "text",
          placeholder: "Александрович",
          value: "",
        },
      ],
      response: {},
    };
  },
  methods: {
    register: function () {
      console.log(this.registerFields.map((f) => f.value));
      User.register(this.registerFields.map((f) => f.value)).then(
        (response) => {
          if (response.status != 201) {
            this.response = response.data;
          } else {
            this.$router.push("/register/sucsess");
          }
        }
      );
    },
    reverseMessage: function () {
      this.message = this.message.split("").reverse().join("");
    },
  },
};
</script>

<style FieldComponent>
.screen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
}

.link {
  color: inherit;
}

.link:hover {
  color: #42b983;
}

.active-link {
  color: #2e875f;
}
</style>
