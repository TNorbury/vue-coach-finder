<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error has occurred!"
      @close="handleError"
    >
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isRegistering">
          <base-spinner></base-spinner>
        </div>
        <div v-else>
          <h2>Register as a coach!</h2>
          <coach-form @submitted-data="formSubmitted"></coach-form>
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseCard from '../components/base/BaseCard.vue';
import CoachForm from '../components/coaches/CoachForm.vue';
import BaseSpinner from '../components/base/BaseSpinner.vue';
import BaseDialog from '../components/base/BaseDialog.vue';
export default {
  components: { CoachForm, BaseCard, BaseSpinner, BaseDialog },
  data() {
    return {
      isRegistering: false,
      error: null,
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async formSubmitted(formData) {
      this.isRegistering = true;
      try {
        await this.$store.dispatch('addCoach', { coachData: formData });
        this.$router.replace('/coaches');
      } catch (e) {
        this.error = e.message || 'Something went wrong while registering';
      }

      this.isRegistering = false;
    },
  },
};
</script>
