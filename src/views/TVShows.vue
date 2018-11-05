<template>
  <div class="tvshows">
    <h1>Popular TV Shows</h1>
    <Films film-type="tv"></Films>
  </div>
</template>

<script>
import Films from '@/components/Films.vue'

export default {
  name: 'TVShows',
  components: {
    Films
  }
}
</script>