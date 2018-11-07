<template>
  <div class="films">
    <v-container grid-list-md>
      <v-pagination v-model="currentPage" :length="totalResults / 20" :total-visible="9"></v-pagination>
      <v-layout row wrap class="films-list">
        <v-flex xs6 md3 v-for="film in filmList" :key="film.id">
          <div class="films-image">
            <router-link v-if="filmType == 'movie'" :to="{ name: 'movie', params: { film_id: film.id }}">
              <img v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + film.poster_path" v-bind:alt="film.title">
            </router-link>
            <router-link v-else-if="filmType == 'tv'" :to="{ name: 'tvshow', params: { film_id: film.id }}">
              <img v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + film.poster_path" v-bind:alt="film.name">
            </router-link>
          </div>
          <div class="films-title">
            <router-link v-if="filmType == 'movie'" :to="{ name: 'movie', params: { film_id: film.id }}">{{ film.title }}</router-link>
            <router-link v-else-if="filmType == 'tv'" :to="{ name: 'tvshow', params: { film_id: film.id }}">{{ film.name }}</router-link>
          </div>
        </v-flex>
      </v-layout>
      <v-pagination v-model="currentPage" :length="totalResults / 20" :total-visible="9"></v-pagination>
      <p>{{ filmError.status_message }}</p>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Films',
  props: {
    filmType: String
  },
  data() {
    return {
      currentPage: 1,
      totalResults: 0,
      filmList: [],
      filmError: ''
    };
  },
  mounted() {
    this.getFilms();
  },
  watch: {
    currentPage: function(newVal, oldVal) {
      this.getFilms();
    }
  },
  methods: {
    getFilms() {
      var vm = this;
      axios.get('https://api.themoviedb.org/3/discover/' + vm.filmType + '?api_key=e7bb37000f296041371c3e152014822e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + vm.currentPage)
        .then(function (res) {
          vm.filmList = res.data.results;

          if (res.data.total_results / vm.filmList.length > 1000) {
            vm.totalResults = vm.filmList.length * 1000;
          } else {
            vm.totalResults = res.data.total_results;
          }
        })
        .catch(function (err) {
          vm.filmError = err.response.data;
        })
    }
  }
}
</script>

<style lang="scss">
  .films-image {
    margin-bottom: 10px;
    img {
      width: 100%;
    }
  }

  .films-title {
    line-height: 24px;
    height: 48px;
    font-weight: 700;
    overflow: hidden;
  }
</style>