import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterSucsessView from "../views/RegisterSucsessView.vue";
import ProfileView from "../views/ProfileView.vue";
import GoodView from "../views/GoodView.vue";
import GoodEditView from "../views/GoodEditView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register/sucsess",
    name: "register_sucsess",
    component: RegisterSucsessView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  { path: "/good/:id", component: GoodView },
  {
    path: "/good/edit/:id?",
    name: "good-edit",
    component: GoodEditView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
