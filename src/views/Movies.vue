<template>
  <div class="movies">
    <h1>Popular Movies</h1>
    <Films film-type="movie"></Films>
  </div>
</template>

<script>
import Films from '@/components/Films.vue'

export default {
  name: 'Movies',
  components: {
    Films
  }
}
</script>