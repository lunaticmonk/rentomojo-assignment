<template>
  <div id="signup">
  <div class="ui hidden divider"></div>
    <div class="ui raised very padded text container segment bg-primary">
      <h2 class="ui header">Sign up</h2>
      <div class="ui form success" id="signupform">
		<div class="field">
          <label>username</label>
          <input type="text" placeholder="joedoe" name="username"/>
        </div>
        <div class="field">
          <label>email</label>
          <input type="email" placeholder="joe@doe.com" name="email"/>
        </div>
        <div class="field">
          <label>password</label>
          <input type="password" placeholder="*********" name="password"/>
        </div>
        <div class="field">
          <label>name</label>
          <input type="text" placeholder="Faizal" name="name"/>
        </div>
        <div class="ui error message" style="display: none" id="form_error_success">
          <div class="header">Error</div>
          <p></p>
        </div>
        <button class="ui submit button primary inverted" v-on:click="submit">Submit</button>
        <p>Already have an account?. Log in <router-link to="/login">here</router-link></p>
      </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import { API_BASE } from "../../configs/app";

export default {
  name: "Register",
  methods: {
    async submit(event) {
      event.preventDefault();
      const data = {
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
        name: document.querySelector('input[name="name"]').value,
        username: document.querySelector('input[name="username"]').value
      };
      try {
        const result = await axios.post(`${API_BASE}/user/register`, data);
        const { data: resultData } = result;
        if (localStorage) {
          localStorage.setItem("user", resultData.user);
          this.$router.push({ path: "/" });
        } else {
          document
            .querySelector("#form_error_success")
            .setAttribute("style", "display: block");
          document.querySelector("#form_error_success p").innerHTML =
            "Please enable local storage";
        }
      } catch (error) {
        document
          .querySelector("#form_error_success")
          .setAttribute("style", "display: block");
        document.querySelector("#form_error_success p").innerHTML =
          error.response.data.message;
      }
    }
  }
};
</script>

<style>
</style>
