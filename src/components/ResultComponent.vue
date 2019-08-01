<template>
	<div class="container">
		<div class="pull-left"> 
		<router-link v-bind:to="'home'">Back to Home Page</router-link>

		</div>	
		<div class="result-wrapper">			
			<b-carousel ref="carousel" id="movie-slider" controls indicators :interval="0">
				<b-carousel-slide class="item" v-for="result in allResult" :key="result.imdbID">
					<div class="poster">
						<img :src="result.Poster"/>
					</div>					
					<div class="year">{{result.Year}}</div>
					<div class="title">{{result.Title}}</div>								
				</b-carousel-slide>
			</b-carousel>
			<div class="btn-group">
				<div class="btn btn-primary" v-on:click="loadPreviousPage">Previous Page</div>
				<span class="form-input page-indicator">Current Page : {{pagination.currentPage}} / Total Pages : {{pagination.totalPages}}</span>
				<div class="btn btn-primary" v-on:click="loadNextPage">Next Page</div>
			</div>
		</div>
	</div>
</template>

<script>

import CarouselPlugin from 'bootstrap-vue';
import axios from "axios";
import Vue from "vue";
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
Vue.use(CarouselPlugin);

var MOVIE_DB_CONFIG = {
	"BASIC_TITLE_SEARCH" : "http://www.omdbapi.com/?plot=full&s={MOVIE_TITLE}&apikey=9ebe2afd&page={PAGE}"
};
export default {
	name: "ResultComponent",
    components: {
      CarouselPlugin
    },
	data : function() {
		return {
			allResult : [],
			pagination : {
				currentPage : 1,
				totalPages : 1,
				totalResults : 0
			},
			movieTitle : ""
		}
	},
	created: function(){
		this.movieTitle = this.$route.query.movieTitle;
		var titleSearch = MOVIE_DB_CONFIG.BASIC_TITLE_SEARCH;
		titleSearch = titleSearch.replace(/{MOVIE_TITLE}/g, this.movieTitle);
		titleSearch = titleSearch.replace(/{PAGE}/g, this.pagination.currentPage);
		var self = this;
		axios.get(titleSearch).then(function(response){
			if(response.data.Response === "False") {
				self.pagination.totalPages = 0;
				self.$swal("No result Found, Please go back to home page and try another title");
				return;
			}
			self.allResult = response.data.Search;
			self.pagination.totalResults = parseInt(response.data.totalResults);				
			if(self.pagination.totalResults == 0) {
				self.pagination.totalPages = 0;
			} else {
				self.pagination.totalPages = parseInt(self.pagination.totalResults / 10);				
			}			
		})
	},
	methods : {	
		loadNextPage(){
			if(this.pagination.currentPage === this.pagination.totalPages) {
				this.$swal("You are on very first page of the result");
				return;
			}
			this.pagination.currentPage++; 
			this.movieTitle = this.$route.query.movieTitle;
			var titleSearch = MOVIE_DB_CONFIG.BASIC_TITLE_SEARCH;
			titleSearch = titleSearch.replace(/{MOVIE_TITLE}/g, this.movieTitle);
			titleSearch = titleSearch.replace(/{PAGE}/g, this.pagination.currentPage);
			var self = this;
			axios.get(titleSearch).then(function(response){
				self.allResult = response.data.Search;				
			})
		},
		loadPreviousPage(){
			if(this.pagination.currentPage == 1) {
				this.$swal("You are on very last page of the result");
				return;
			}
			this.pagination.currentPage--; 
			
			this.movieTitle = this.$route.query.movieTitle;
			var titleSearch = MOVIE_DB_CONFIG.BASIC_TITLE_SEARCH;
			titleSearch = titleSearch.replace(/{MOVIE_TITLE}/g, this.movieTitle);
			titleSearch = titleSearch.replace(/{PAGE}/g, this.pagination.currentPage);
			var self = this;
			axios.get(titleSearch).then(function(response){
				self.allResult = response.data.Search;				
			})
		}
	}	
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.carousel-caption .title[data-v-4487df60] {
    color: #19075f;
	font-size: 25px;
}
.result-wrapper {
	margin-top:10px;
}
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

.page-indicator {
	line-height: 38px;
    padding: 0 12px;
}
.carousel-caption .title,
.carousel-caption .year {
	color:#000;
}
.carousel.slide,
.carousel-inner,
[role=listitem] {
	height: 500px;
}
.result-item .year,
.result-item .poster,
.result-item .title {
	float : left;
	width : 100%;
}
.result-item .poster img {
	width:100%;
}
a.btn.btn-primary.back-to-home:hover,
a.btn.btn-primary.back-to-home:focused,
a.btn.btn-primary.back-to-home {
	color : white !important;
}
</style>
