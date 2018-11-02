<template>
  <div class="movies">
    <h1>This is movies page</h1>
    <b-pagination size="lg" :total-rows="totalResults" v-model="currentPage" :per-page="movieList.length" align="center"></b-pagination>
    <ul>
      <li v-for="movie in movieList" :key="movie.id">{{ movie.title }}</li>
    </ul>
    <p>{{ movieError.status_message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import bPagination from 'bootstrap-vue/es/components/pagination/pagination';

export default {
  name: 'Movies',
  components: {
    bPagination
  },
  data() {
    return {
      currentPage: 1,
      totalResults: 0,
      movieList: [],
      movieError: ''
    };
  },
  mounted() {
    this.getMovies();
  },
  watch: {
    currentPage: function(newVal, oldVal) {
      this.getMovies();
    }
  },
  methods: {
    getMovies() {
      var vm = this;
      axios.get('https://api.themoviedb.org/3/discover/movie?api_key=e7bb37000f296041371c3e152014822e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + vm.currentPage)
        .then(function (res) {
          vm.movieList = res.data.results;
          if (res.data.total_results / vm.movieList.length > 1000) {
            vm.totalResults = vm.movieList.length * 1000;
          } else {
            vm.totalResults = res.data.total_results;
          }
        })
        .catch(function (err) {
          vm.movieError = err.response.data;
        })
    }
  }
}
</script>