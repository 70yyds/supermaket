import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/home/Home";
import Category from "views/category/Category";
import Shop from "views/shop/Shop";
import Profile from "views/profile/Profile";
import Detail from "views/detail/Detail";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Home"
  },

  {
    path: "/Home",
    component: Home
  },
  {
    path: "/Category",
    component: Category
  },
  {
    path: "/Shop",
    component: Shop
  },
  {
    path: "/Profile",
    component: Profile
  },
  {
    path: "/Detail/:iid",
    component: Detail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
