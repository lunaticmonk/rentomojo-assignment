import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/register",
      name: "Register",
      component: require("@/components/register").default
    },
    {
      path: "/login",
      name: "Login",
      component: require("@/components/login").default
    },
    {
      path: "/",
      name: "Dashboard",
      component: require("@/components/dashboard").default
    }
  ]
});
