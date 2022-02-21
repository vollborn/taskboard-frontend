<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          class="mr-3"
          small
          color="white"
        >
          fa-plus
        </v-icon>
        Create User
      </v-btn>
    </template>

    <v-card tile>
      <v-card-title class="primary white--text">
        Create User
      </v-card-title>
      <v-card-text class="mt-3">
        <UserForm
          v-model="form"
          :create="true"
        />
      </v-card-text>
      <v-card-actions class="px-3 pb-3">
        <v-btn
          class="px-3"
          @click="closeDialog"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          class="px-3"
          :disabled="!canSubmit"
          :loading="isLoading"
          @click="submit"
        >
          <v-icon
            class="mr-2"
            small
          >
            fa-save
          </v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import UserForm from './UserForm';

export default {
  components: {UserForm},
  emits: ['reload'],
  data() {
    return {
      dialog: false,
      isLoading: false,
      form: {
        username: null,
        firstName: null,
        lastName: null,
        password: null
      }
    };
  },
  computed: {
    canSubmit() {
      return this.form.username && this.form.firstName && this.form.lastName && this.form.password;
    }
  },
  methods: {
    reload() {
      this.$emit('reload');
    },
    closeDialog() {
      this.dialog = false;
      this.form = {
        username: null,
        firstName: null,
        lastName: null,
        password: null
      };
    },
    submit() {
      this.isLoading = true;
      window.axios
        .post(ROUTES.MANAGEMENT.USERS.STORE, {
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          password: this.form.password
        })
        .then(() => {
          this.closeDialog();
          this.reload();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>