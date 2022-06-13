import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Good } from "../api/good";
import { User } from "../api/user";

// дока тут https://vue3js.cn/vuex/ru/guide/state.html
export default createStore({
  plugins: [createPersistedState()],
  state: {
    goods: [],
    currentGood: {},
    otherUser: {},
    token: {
      refresh: "",
      access: "",
    },
    user: {},
    basket: [],
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
    login(state, { refresh, access, user }) {
      state.token = { refresh: refresh, access: access };
      state.user = user;
    },
    setUser(state, data) {
      state.otherUser = data;
    },
    setToken(state, { refresh, access }) {
      state.token = { refresh: refresh, access: access };
    },
    logout(state) {
      state.token = {};
      state.user = {};
    },
    clear(state) {
      state.goods = [];
    },
    updateCurrentGood(state, good) {
      state.currentGood = good;
    },
    updateOtherUser(state, user) {
      state.otherUser = user;
    },
    addToBasket(state, good) {
      state.basket.push(good);
    },
  }, // здесь функции для изменения состояния (синхронные)

  actions: {
    searchGoods({ commit }, { query = "" }) {
      Good.list(query).then((goods) => {
        commit("setGoods", goods.data.results);
      });
    },
    login({ commit }, { username, password }) {
      return User.login(username, password).then((response) => {
        if (response.status == 200) {
          commit("login", response.data);
          return response;
        } else {
          commit("login", []);
          return response;
        }
      });
    },
    getProfile({ commit }, { id }) {
      User.getUserById(id).then((response) => {
        commit("setUser", response.data);
      });
    },
    updateCurrentGood({ commit }, { id }) {
      return Good.getById(id).then((response) => {
        if (response.status == 200) {
          commit("updateCurrentGood", response.data);
        } else {
          commit("updateCurrentGood", []);
        }
      });
    },
    updateOtherUser({ commit }, { id }) {
      return Good.getById(id).then((response) => {
        if (response.status == 200) {
          commit("updateCurrentGood", response.data);
        } else {
          commit("updateCurrentGood", []);
        }
      });
    },
  }, // это прокси для mutation (здесь можно асинхрон)
  modules: {},
});
