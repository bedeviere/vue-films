<template>
  <div class="tvshow">
    <Film film-type="tv"></Film>
  </div>
</template>

<script>
import Film from '@/components/Film.vue'

export default {
  name: 'TVShow',
  components: {
    Film
  }
}
</script>