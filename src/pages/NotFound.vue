<template>
  <section>
    <base-card>
      <h2>Page not found!</h2>

      <p>
        THis page could not be found. Maybe checkout out all our
        <router-link to="/coaches">coaches</router-link>
      </p>
    </base-card>
  </section>
</template>

<script>
import BaseCard from '../components/base/BaseCard.vue';
export default {
  components: { BaseCard },
};
</script>