<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <section>
      <coach-filter @filter-updated="updateFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !loadingCoachData && isAuthenticated" link to="/register"
            >Register as coach</base-button
          >
        </div>
        <div v-if="loadingCoachData">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in getCoaches"
            :key="coach.id"
            :coach="coach"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';
import BaseSpinner from '../components/base/BaseSpinner.vue';
import BaseDialog from '../components/base/BaseDialog.vue';
import CoachFilter from '../components/coaches/CoachFilter.vue';
import CoachItem from '../components/coaches/CoachItem.vue';
export default {
  components: {
    CoachItem,
    BaseCard,
    BaseButton,
    CoachFilter,
    BaseSpinner,
    BaseDialog,
  },
  data() {
    return {
      activeFilter: ['frontend', 'backend', 'career'],
      loadingCoachData: false,
      error: null,
    };
  },
  computed: {
    getCoaches() {
      return this.$store.getters.coaches.filter((coach) => {
        var coachFiltered = false;
        for (var filter of this.activeFilter) {
          if (coach.areas.includes(filter)) {
            coachFiltered = true;
            break;
          }
        }
        return coachFiltered;
      });
    },
    hasCoaches() {
      return this.$store.getters.hasCoaches;
    },
    isCoach() {
      return this.$store.getters.isCoach;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    updateFilter(filter) {
      this.activeFilter = filter;
    },
    async loadCoaches(refresh = false) {
      this.loadingCoachData = true;
      try {
        await this.$store.dispatch('loadCoaches', { forceRefresh: refresh });
      } catch (e) {
        this.error = e.message || 'Something went wrong';
      }
      this.loadingCoachData = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>