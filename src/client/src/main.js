import Vue from "vue";
import App from "./App.vue";
import Toasted from "vue-toasted";

import router from "./router";

import "../node_modules/semantic-ui-css/semantic.min.css";

/**
 * Vue-Toasted for toasts
 */

let toastOptions = {
  theme: "toasted-primary",
  position: "top-right",
  duration: 1000
};

Vue.use(Toasted, toastOptions);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
