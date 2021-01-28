<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ selectedCoach.hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :title="area"
          :type="area"
        ></base-badge>
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now</h2>
          <base-button link :to="getCoachContactUrl">Contact</base-button>
        </header>
        <!-- For contancting coach -->
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseBadge from '../components/base/BaseBadge.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';
export default {
  components: { BaseCard, BaseButton, BaseBadge },
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    getCoachContactUrl() {
      return `/coaches/${this.id}/contact`;
    },
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    areas() {
      return this.selectedCoach.areas;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters.coaches.find((coach) => {
      return coach.id === this.id;
    });
  },
};
</script>

<style>
</style>