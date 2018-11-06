<template>
  <div id="app">
    <header>
      <div class="container">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> | 
          <router-link to="/movie">Movies</router-link> |
          <router-link to="/tv">TV Shows</router-link>
        </div>
      </div>
    </header>
    <section>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>
    <footer>This is footer</footer>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  padding: 20px 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}
</style>
