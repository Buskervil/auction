import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Good } from "../api/goods";
import { User } from "../api/common";

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
  }, // здесь объекты, хранящие состояние

  getters: {
    access_token: (state) => {
      return `Bearer ${state.token.access}`;
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
    setProfile(state, data) {
      state.user = data;
    },
  }, // здесь функции для изменения состояния (синхронные)

  actions: {
    getGoods({ commit }) {
      console.log("зашли");
      Good.list().then((goods) => {
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
      User.get_profile(state.user_id).then((response) => {
        console.log("Ответ пришел");
        console.log(response.data);
        commit("setProfile", response.data);
      });
    },
  }, // это прокси для mutation (здесь можно асинхрон)
  modules: {},
});
