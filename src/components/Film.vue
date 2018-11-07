<template>
  <div class="film">
    <div class="film-header" v-bind:style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w1400_and_h450_face' + filmDetails.backdrop_path + ')'}">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex md4>
            <div class="film-image">
              <img v-if="filmType == 'movie'" v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + filmDetails.poster_path" v-bind:alt="filmDetails.title">
              <img v-else-if="filmType == 'tv'" v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + filmDetails.poster_path" v-bind:alt="filmDetails.name">
            </div>
          </v-flex>
          <v-flex md8>
            <div class="film-title">
              <h1 v-if="filmType == 'movie'">{{ filmDetails.title }} <span>({{ filmYear }})</span></h1>
              <h1 v-else-if="filmType == 'tv'">{{ filmDetails.name }} <span>({{ filmYear }})</span></h1>
            </div>
            <div class="film-dashboard">
              <div class="film-rating">{{ filmDetails.vote_average * 10 }}%</div>
            </div>
            <div class="film-overview">
              <h4>Overview</h4>
              <p>{{ filmDetails.overview }}</p>
            </div>
            <div class="film-featured-crew">
              <h4>Featured Crews</h4>
              <v-layout row wrap v-if="filmType == 'movie'">
                <v-flex md4 v-for="crew in filmFeaturedCrews" :key="crew.id">
                  <label>{{ crew.name }}</label>
                  <p>{{ crew.job }}</p>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-else-if="filmType == 'tv'">
                <v-flex md4 v-for="crew in filmDetails.created_by" :key="crew.id">
                  <label>{{ crew.name }}</label>
                  <p>Creator</p>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div class="film-featured-cast">
      <v-container grid-list-md>
        <h2>Top Billed Cast</h2>
        <v-layout row wrap>
          <v-flex md2 v-for="(cast, i) in filmFeaturedCasts" :key="i">
            <v-card>
              <v-img :src="'https://image.tmdb.org/t/p/w276_and_h350_face' + cast.profile_path"></v-img>
              <v-card-title class="text-xs-left">
                <div class="film-featured-cast-data">
                  <h3>{{ cast.name }}</h3>
                  <p>{{ cast.character }}</p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p>{{ filmError.status_message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Film',
  props: {
    filmType: String
  },
  data() {
    return {
      filmDetails: [],
      filmYear: '',
      filmFeaturedCrews: [],
      filmFeaturedCasts: [],
      filmError: ''
    };
  },
  mounted() {
    this.getFilmDetails();
  },
  methods: {
    getFilmDetails() {
      var vm = this;
      axios.get('https://api.themoviedb.org/3/' + vm.filmType + '/' + vm.$route.params.film_id + '?api_key=e7bb37000f296041371c3e152014822e&language=en-US')
        .then(function (res) {
          vm.filmDetails = res.data;

          if (vm.filmType == 'movie') {
            vm.filmYear = (new Date(vm.filmDetails.release_date)).getFullYear();
          } else if (vm.filmType == 'tv') {
            vm.filmYear = (new Date(vm.filmDetails.first_air_date)).getFullYear();
          }
        })
        .catch(function (err) {
          vm.filmError = err.response.data;
        });

      axios.get('https://api.themoviedb.org/3/' + vm.filmType + '/' + vm.$route.params.film_id + '/credits?api_key=e7bb37000f296041371c3e152014822e')
        .then(function (res) {
          var crewLength = res.data.crew.length;
          if (crewLength > 9) {
            crewLength = 9;
          }
          for (var i = 0; i < crewLength; i++) {
            vm.filmFeaturedCrews.push(res.data.crew[i]);
          }

          var castLength = res.data.cast.length;
          if (castLength > 6) {
            castLength = 6;
          }
          for (var i = 0; i < castLength; i++) {
            vm.filmFeaturedCasts.push(res.data.cast[i]);
          }
        })
        .catch(function (err) {
          vm.filmError = err.response.data;
        });
    }
  }
}
</script>

<style lang="scss">
  .film-header {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding-top: 60px;
    padding-bottom: 60px;
    text-align: left;
    color: #fff;
    position: relative;
    &::before {
      content: '';
      display: block;
      background-color: #222;
      opacity: 0.9;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
    }
    .container {
      position: relative;
      z-index: 1;
    }
  }

  .film-image {
    img {
      width: 100%;
    }
  }

  .film-title {
    span {
      font-size: 1.8rem;
    }
  }

  .film-rating {
    font-size: 2.2rem;
  }

  .film-featured-crew {
    label {
      margin-bottom: 0;
      font-weight: 700;
    }
    p {
      font-size: 0.8rem;
    }
  }

  .film-featured-cast {
    h3 {
      font-size: 1.2rem;
    }
  }
</style>