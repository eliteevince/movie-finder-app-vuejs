<template>
	<div class="container">
		<div class=""> <img src="logo.png" alt="MovieFinder"></div>
		<div class="result-wrapper">
			<div class="search-header btn-group pull-right">
				<input type="text" v-model="movieTitle" name="search-box" placeholder="Find Movie"/>
				<button class="search-button btn btn-primary" v-on:click="searchTitle"> Search </button>
			</div>
			<div class="result-items">
				<div class="result-item" v-for="result in allResult" :key="result.imdbID">
					<div class="title">{{result.Title}}</div>								
					<div class="poster">
						<img :src="result.Poster"/>
					</div>
					<div class="year">{{result.Year}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
export default {
	name: "HomeComponent",
	data: function() {
		return {
			allResult : [],
			pagination : {
				currentPage : 1
			},
			movieTitle : ""
		}
	},
	methods: {
		setInitialData(){
		},		
		searchTitle (){			
			if(this.movieTitle.length < 3) {
				this.$swal("Movie title length should be atleast 3 charcter long");
				return;
			}
			this.$router.push({ path: 'result', query: { movieTitle: this.movieTitle } });
			console.log(this)
		}
	}	
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search-header.btn-group.pull-right{
    margin-top: 100px;
}
.search-header.btn-group.pull-right,
input[type="text"] {
    width: 100%;
}
</style>
