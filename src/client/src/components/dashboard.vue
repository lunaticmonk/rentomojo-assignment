<template>
	<div>
		<button><router-link to="/register">Register</router-link></button>
		<button><router-link to="/login">Login</router-link></button>
		<div id="comments">
			<h1>Comments</h1>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { API_BASE } from "../../configs/app";

export default {
  name: "Dashboard",
  async mounted() {
    const result = await axios.get(`${API_BASE}/comment/all`);
    const { data: comments } = result;
    if (comments.data.length > 0) {
      // loop here.
      for (let comment of comments.data) {
        let commentDiv = document.createTextNode(comment.value);
        document.querySelector("#comments").appendChild(commentDiv);
      }
    } else {
      document.querySelector("#comments").innerHTML = "No comments found.";
    }
  }
};
</script>

<style>
</style>
