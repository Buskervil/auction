import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Good } from "../api/goods";
import { User } from "../api/common";
import { Token } from "../api/common";

// дока тут https://vue3js.cn/vuex/ru/guide/state.html
export default createStore({
  plugins: [createPersistedState()],
  state: {
    goods: [],
    user_id: undefined,
    token: {
      refresh: "",
      access: "",
    },
    user: {},
    userProfile: {},
  }, // здесь объекты, хранящие состояние

  getters: {
    access_token: (state) => {
      return `Bearer ${state.token.access}`;
    },
    refresh_token: (state) => {
      return state.token.refresh;
    },
    goods: (state) => {
      return state.goods;
    },
  }, // здесь функции для получения состояния в предобработанном виде (сортировки, фильтры и т.п)

  mutations: {
    setGoods(state, goods) {
      console.log("Сохраняю");
      console.log(goods);
      state.goods = goods;
    },
    login(state, { refresh, access, user_id }) {
      state.token = { refresh: refresh, access: access };
      state.user_id = user_id;
    },
    setUser(state, data) {
      state.user = data;
    },
    setUserProfile(state, data) {
      state.userProfile = data;
    },
    setToken(state, { refresh, access }) {
      state.token = { refresh: refresh, access: access };
    },
    logout(state) {
      state.token = {};
      state.user = {};
      state.userProfile = {};
      state.user_id = "";
    },
    clear(state) {
      state.goods = [];
    },
  }, // здесь функции для изменения состояния (синхронные)

  actions: {
    getGoods({ commit }) {
      console.log("вызван action получения товаров");
      return Good.list()
        .then((goods) => {
          console.log("Получил из API" + goods.data);
          console.log(goods.data);
          commit("setGoods", goods.data.results);
        })
        .then(() => console.log("12345"));
    },
    searchGoods({ commit }, { query = "" }) {
      console.log("вызван action получения товаров");
      Good.list(query).then((goods) => {
        console.log("Получил из API");
        console.log(goods.data);
        commit("setGoods", goods.data.results);
      });
    },
    login({ commit }, { username, password }) {
      console.log("Username" + username);
      return User.login(username, password).then((response) => {
        if (response.status == 200) {
          commit("login", response.data);
          return response;
        } else {
          console.log(response.data);
          return response;
        }
      });
    },
    getProfile({ commit, state }) {
      console.log("Мы зареганы, я пошел за профилем");
      User.getUserById(state.user_id)
        .then((response) => {
          console.log("Ответ пришел");
          console.log(response.data);
          commit("setUser", response.data);
        })
        .then(() => {
          User.getUserProfile(state.user.id).then((r) => {
            console.log("Получил профиль" + r.data);
            commit("setUserProfile", r.data);
          });
        });
    },
    refreshAccessToken({ commit }) {
      console.log("вызван action обновления токена");
      Token.refreshAccessToken().then((response) => {
        console.log("action получил токен из axios");
        if (response.status == 200) {
          commit("setToken", response.data);
          return Promise.resolve();
        } else {
          console.log(response.data);
          return Promise.reject();
        }
      });
    },
  }, // это прокси для mutation (здесь можно асинхрон)
  modules: {},
});
