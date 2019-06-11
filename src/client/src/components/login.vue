<template>
<div id="login">
	<button class="ui button primary inverted"><router-link to="/">Home</router-link></button>
	<div class="ui hidden divider"></div>
		<div class="ui raised very padded text container segment bg-primary">
			<h2 class="ui header">Log In</h2>
			<div class="ui form success" id="signupform">
				<div class="field">
					<label>username</label>
					<input type="text" placeholder="joedoe" name="username"/>
				</div>
				<div class="field">
					<label>password</label>
					<input type="password" placeholder="*********" name="password"/>
				</div>
				<div class="ui error message" style="display: none" id="form_error_success">
					<div class="header"></div>
					<p></p>
				</div>
				<button class="ui submit button bg-primary-dark" v-on:click="submit">Submit</button>
				<p>Don't have an account. Create one <router-link to="/register">here</router-link></p>
		</div>
	</div>
</div>
</template>

<script>
import axios from "axios";
import { API_BASE } from "../../configs/app";

export default {
  name: "Login",
  methods: {
    async submit(event) {
      event.preventDefault();
      const data = {
        password: document.querySelector('input[name="password"]').value,
        username: document.querySelector('input[name="username"]').value
      };

      try {
        const result = await axios.post(`${API_BASE}/user/login`, data);
        const { data: resultData } = result;
        if (localStorage) {
          localStorage.setItem("accessToken", resultData.accessToken);
          localStorage.setItem("userId", resultData.user._id);
          localStorage.setItem("username", resultData.user.username);
          this.$toasted.show("Logged in successfully");
          this.$router.push({ path: "/" });
        } else {
          document
            .querySelector("#form_error_success")
            .setAttribute("style", "display: block");
          document.querySelector("#form_error_success p").innerHTML =
            "Please enable local storage";
        }
      } catch (error) {
        let errorMessage;
        if (!data.username || !data.password) {
          errorMessage = `username and password are required to sign in.`;
        } else {
          errorMessage = error.response.data.message;
        }
        document
          .querySelector("#form_error_success")
          .setAttribute("style", "display: block");
        document.querySelector(
          "#form_error_success p"
        ).innerHTML = errorMessage;
      }
    }
  }
};
</script>

<style>
</style>
