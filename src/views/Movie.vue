<template>
  <div class="movie">
    <Film film-type="movie"></Film>
  </div>
</template>

<script>
import Film from '@/components/Film.vue'

export default {
  name: 'Movie',
  components: {
    Film
  }
}
</script>