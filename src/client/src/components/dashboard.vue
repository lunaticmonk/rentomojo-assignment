<template>
	<div class="ui container">
		<div id="authButtons" v-if="isLoggedIn()">
			<p class="ui huge green label right floated">{{ currentUser }}</p>
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
      comments: [],
      currentUser: localStorage.getItem("username")
    };
  },
  methods: {
    isLoggedIn() {
      let accessToken = localStorage.getItem("accessToken");
      if (
        accessToken !== "" &&
        accessToken !== null &&
        accessToken !== undefined
      ) {
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
      const result = await axios.post(
        `${API_BASE}/comment/create`,
        {
          value: comment
        },
        config
      );

      let commentData = await this.populateComments();
      this.comments = commentData.data;
      document.querySelector("#commentValue").value = "";
      this.$toasted.show(result.data.message);
    },
    async upvoteComment(commentId) {
      const config = {
        headers: { "access-token": localStorage.getItem("accessToken") }
      };
      const result = await axios.patch(
        `${API_BASE}/comment/${commentId}/upvote`,
        {},
        config
      );

      if (result.data.data) {
        const { data: comment } = result.data;

        const index = this.comments.findIndex(function(elem) {
          return elem._id === comment._id;
        });

        if (index > -1 && comment) {
          this.comments[index].upvotes = comment.upvotes;
          this.comments[index].downvotes = comment.downvotes;
        }
      }
      this.$toasted.show(result.data.message);
    },
    async downvoteComment(commentId) {
      const config = {
        headers: { "access-token": localStorage.getItem("accessToken") }
      };
      const result = await axios.patch(
        `${API_BASE}/comment/${commentId}/downvote`,
        {},
        config
      );

      if (result.data.data) {
        const { data: comment } = result.data;

        const index = this.comments.findIndex(function(elem) {
          return elem._id === comment._id;
        });

        if (index > -1 && comment) {
          this.comments[index].upvotes = comment.upvotes;
          this.comments[index].downvotes = comment.downvotes;
        }
      }
      this.$toasted.show(result.data.message);
    },
    logOut() {
      if (localStorage) {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("userId", "");
        this.$toasted.show("Logged out successfully");
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

<style>
</style>
