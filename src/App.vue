<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" class="header-logo"><span>VUE FILMS</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/about">About</v-btn>
        <v-btn flat to="/movie">Movies</v-btn>
        <v-btn flat to="/tv">TV Shows</v-btn>
      </v-toolbar-items>
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
  .application--wrap {
    color: $color-default;
  }
  
  main {
    text-align: center;
  }

  .v-toolbar {
    background-color: $color-primary !important;
  }

  .header-logo {
    color: #fff;
    &:hover,
    &:focus {
      color: #fff;
    }
  }
</style>
