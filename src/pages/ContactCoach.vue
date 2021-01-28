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
    <div v-if="sendingRequest">
      <base-spinner></base-spinner>
    </div>
    <form v-else @submit.prevent="submitForm">
      <div class="form-control" :class="{ errors: !email.isValid }">
        <label for="email">Your Email</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @blur="email.isValid = true"
        />
      </div>
      <div class="form-control" :class="{ errors: !message.isValid }">
        <label for="message">Message</label>
        <textarea
          id="message"
          rows="5"
          v-model.trim="message.val"
          @blur="message.isValid = true"
        ></textarea>
      </div>
      <p v-if="!formIsValid" class="errors">
        Please enter a valid email and a message
      </p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import BaseSpinner from '../components/base/BaseSpinner.vue';
import BaseDialog from '../components/base/BaseDialog.vue';
export default {
  components: { BaseButton, BaseSpinner, BaseDialog },
  props: ['id'],
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      sendingRequest: false,
      error: null,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;

      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.sendingRequest = true;

      const requestData = {
        coachId: this.id,
        email: this.email.val,
        message: this.message.val,
      };

      try {
        await this.$store.dispatch('addRequest', { requestData });

        this.$router.replace(`/coaches/${this.id}`);
      } catch (e) {
        this.error =
          e.message || 'Something went wrong while contacting this coach';
      }

      this.sendingRequest = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>