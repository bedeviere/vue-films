<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/"><span>VUE FILMS</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/about">About</v-btn>
      <v-btn flat to="/movie">Movies</v-btn>
      <v-btn flat to="/tv">TV Shows</v-btn>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-fade-transition hide-on-leave>
        <router-view></router-view>
      </v-fade-transition>
    </v-content>

    <v-footer height="auto">
      <v-card-text class="text-xs-center">
        Footer
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss">
  main {
    text-align: center;
  }
</style>
