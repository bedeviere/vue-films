import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Movies from './views/Movies.vue'
import TVShows from './views/TVShows.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/movie',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movie/:film_id',
      name: 'movie',
      component: () => import('./views/Movie.vue')
    },
    {
      path: '/tv',
      name: 'tvshows',
      component: TVShows
    },
    {
      path: '/tv/:film_id',
      name: 'tvshow',
      component: () => import('./views/TVShow.vue')
    }
  ]
})
