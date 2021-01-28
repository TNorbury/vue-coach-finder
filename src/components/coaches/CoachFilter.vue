<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        id="frontend"
        value="frontend"
        checked
        v-model="filter"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="backend"
        value="backend"
        checked
        v-model="filter"
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="career"
        value="career"
        checked
        v-model="filter"
      />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
import BaseCard from '../base/BaseCard.vue';
export default {
  components: { BaseCard },
  emits: ['filter-updated'],
  watch: {
    filter(updatedFilter) {
      this.$emit('filter-updated', updatedFilter);
    },
  },
  data() {
    return {
      filter: ['frontend', 'backend', 'career'],
    };
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>