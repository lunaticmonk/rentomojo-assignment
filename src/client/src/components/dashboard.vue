<template>
	<div class="ui container">
		<div id="authButtons" v-if="isLoggedIn()">
			<div id="comments" class="ui form">
				<button class="ui button primary inverted right floated" v-on:click="logOut()">LogOut</button>
				<div class="field">
					<label><span class="ui huge header">Post comment</span></label>
					<textarea id="commentValue"></textarea>
					<div class="ui hidden divider"></div>
					<button class="ui submit button primary inverted right floated" v-on:click="postComment()">Submit</button>
				</div>
				<h1>Comments</h1>
			</div>
		</div>
		<div v-else>
			<button class="ui button primary inverted"><router-link to="/register">Register</router-link></button>
			<button class="ui button primary inverted"><router-link to="/login">Login</router-link></button>
			<div class="ui hidden divider"></div>
			<div id="comments">
				<p>Please create an account and sign in to create/upvote/downvote a comment.</p>
				<h1>Comments</h1>
			</div>
		</div>
		<div class="ui small segment" v-for="(comment, index) in comments" v-bind:key="index">
			<div class="ui grid stackable">
				<div class="ui eight wide column">
					<span class="ui header">{{ index + 1 }} ) </span>
					<span class="ui header">{{ comment.author.name }} ({{ comment.author.username }})</span>
					<div class="ui hidden divider"></div>
					<span>{{ comment.value }}</span>
				</div>
				<div class="ui four wide column right floated">
					<div class="ui labeled button" v-bind:class="{ disabled: !isLoggedIn() }" tabindex="0">
						<div class="ui button" v-on:click="upvoteComment(comment._id)">
							<i class="thumbs up outline icon"></i> <span>Upvote</span>
						</div>
						<a class="ui basic label">
							{{ comment.upvotes.length }}
						</a>
					</div>
					<div class="ui hidden divider"></div>
					<div class="ui labeled button" v-bind:class="{ disabled: !isLoggedIn() }" tabindex="0">
						<div class="ui button" v-on:click="downvoteComment(comment._id)">
							<i class="thumbs down outline icon"></i> <span>Downvote</span>
						</div>
						<a class="ui basic label">
							{{ comment.downvotes.length }}
						</a>
					</div>
				</div>
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
    let commentData = await this.populateComments();
    this.comments = commentData.data;
  },
  data() {
    return {
      comments: []
    };
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
    async populateComments() {
      const result = await axios.get(`${API_BASE}/comment/all`);
      const { data: comments } = result;
      return comments;
    },
    async postComment() {
      const config = {
        headers: { "access-token": localStorage.getItem("accessToken") }
      };
      let comment = document.querySelector("#commentValue").value;
      await axios.post(
        `${API_BASE}/comment/create`,
        {
          value: comment
        },
        config
      );
      window.location = "/";
    },
    async upvoteComment(commentId) {
      const config = {
        headers: { "access-token": localStorage.getItem("accessToken") }
      };
      await axios.patch(`${API_BASE}/comment/${commentId}/upvote`, {}, config);
      window.location = "/";
    },
    async downvoteComment(commentId) {
      const config = {
        headers: { "access-token": localStorage.getItem("accessToken") }
      };
      await axios.patch(
        `${API_BASE}/comment/${commentId}/downvote`,
        {},
        config
      );
      window.location = "/";
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
