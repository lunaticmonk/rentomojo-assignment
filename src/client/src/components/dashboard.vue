<template>
	<div>
		<div id="authButtons" v-if="isLoggedIn()">
			<div id="comments">
				<h1>Comments</h1>
			</div>
			<button v-on:click="logOut">LogOut</button>
		</div>
		<div v-else>
			<button><router-link to="/register">Register</router-link></button>
			<button><router-link to="/login">Login</router-link></button>
			<div id="comments">
				<h1>Comments</h1>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { API_BASE } from "../../configs/app";

export default {
  name: "Dashboard",
  async mounted() {
    this.showComments();
  },
  methods: {
    isLoggedIn() {
      let accessToken = localStorage.getItem("accessToken");
      let userId = localStorage.getItem("userId");
      if (accessToken !== "" && userId !== "") {
        return true;
      }
      return false;
    },
    async showComments() {
      const result = await axios.get(`${API_BASE}/comment/all`);
      const { data: comments } = result;
      if (comments.data.length > 0) {
        for (let comment of comments.data) {
          let commentDiv = document.createTextNode(comment.value);
          document.querySelector("#comments").appendChild(commentDiv);
        }
      } else {
        document.querySelector("#comments").innerHTML = "No comments found.";
      }
    },
    logOut() {
      if (localStorage) {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("userId", "");
        window.location = "/";
      }
    }
  }
};
</script>

<style>
</style>
