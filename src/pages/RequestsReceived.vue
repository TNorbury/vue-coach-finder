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
      <p>Please try again later</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-button mode="outline" @click="loadRequests">Refresh</base-button>
        <div v-if="loadingRequests">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="request in requests"
            :key="request.id"
            v-bind="request"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import BaseCard from '../components/base/BaseCard.vue';
import RequestItem from '../components/requests/RequestItem.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseSpinner from '../components/base/BaseSpinner.vue';
import BaseDialog from '../components/base/BaseDialog.vue';
export default {
  components: { BaseCard, RequestItem, BaseSpinner, BaseDialog, BaseButton },
  data() {
    return {
      requests: [],
      loadingRequests: false,
      error: null,
    };
  },
  computed: {
    hasRequests() {
      return this.requests.length > 0;
    },
  },
  methods: {
    async loadRequests() {
      this.loadingRequests = true;
      try {
        await this.$store.dispatch('loadRequests');
        this.requests = this.$store.getters.getRequests;
      } catch (e) {
        this.error = e.message || 'Something went wrong';
      }
      this.loadingRequests = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>