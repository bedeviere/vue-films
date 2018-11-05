<template>
  <div class="films">
    <div class="container">
      <b-pagination size="lg" :total-rows="totalResults" v-model="currentPage" :per-page="filmList.length" align="center"></b-pagination>
      <ul class="films-list row">
        <li class="col-md-3 col-xs-6" v-for="film in filmList" :key="film.id">
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
        </li>
      </ul>
      <b-pagination size="lg" :total-rows="totalResults" v-model="currentPage" :per-page="filmList.length" align="center"></b-pagination>
      <p>{{ filmError.status_message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import bPagination from 'bootstrap-vue/es/components/pagination/pagination';

export default {
  name: 'Films',
  props: {
    filmType: String
  },
  components: {
    bPagination
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
  .films-list {
    list-style: none;
    padding-left: 0;
    &.full {
      margin-left: 0;
      margin-right: 0;
    }
    > li {
      margin-bottom: 30px;
    }
  }

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