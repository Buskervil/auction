import { createStore } from "vuex";
import { Good } from '../api/goods'

// дока тут https://vue3js.cn/vuex/ru/guide/state.html
export default createStore({
  state: {
    goods: []
  }, // здесь объекты, хранящие состояние

  getters: {

  }, // здесь функции для получения состояния в предобработанном виде (сортировки, фильтры и т.п)

  mutations: {
    setGoods (state, {goods}) {
      state.goods = goods
    }
  }, // здесь функции для изменения состояния (синхронные)

  actions: {
    getGoods ({ commit }) {
      console.log("зашли")
      Good.list().then(goods => {        
        commit('setGoods', {goods})
      })
    }
  }, // это прокси для mutation (здесь можно асинхон)

  modules: {},
});
