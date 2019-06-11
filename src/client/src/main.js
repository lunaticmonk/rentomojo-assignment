import Vue from "vue";
import App from "./App.vue";
import Toasted from "vue-toasted";

import router from "./router";

import "../node_modules/semantic-ui-css/semantic.min.css";

/**
 * Vue-Toasted for toasts
 */

//  options to the normal toast.
let toastOptions = {
  theme: "toasted-primary",
  position: "top-right",
  duration: 1000
};

Vue.use(Toasted, toastOptions);

// options to the error toast
let errorToastOptions = {
  position: "top-right",
  duration: 1000,
  className: "error"
};

/**
 * Register error message toast.
 */
Vue.toasted.register(
  "error",
  payload => {
    if (!payload.message) {
      return "Something Went Wrong.";
    }
    return payload.message;
  },
  errorToastOptions
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
