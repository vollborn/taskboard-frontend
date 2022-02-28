<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card tile>
        <v-card-title>
          Base data
        </v-card-title>
        <v-card-text>
          <UserForm
            v-model="form"
            :create="false"
          />
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-spacer />
          <BaseSaveButton
            :disabled="!canSubmit"
            :loading="isLoading"
            @submit="submit"
          />
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      class="mt-6"
    >
      <UserPermissionsSync :user="user" />
    </v-col>
    <v-col
      cols="12"
      class="mt-6 mb-3"
    >
      <UserProjectsSync :user="user" />
    </v-col>
  </v-row>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import BaseSaveButton from '@/components/base/BaseSaveButton';
import UserForm from '@/components/management/user/UserForm';
import UserProjectsSync from '@/views/management/users/update/partials/UserProjectsSync/UserProjectsSync';
import UserPermissionsSync from '@/views/management/users/update/partials/UserPermissionsSync/UserPermissionsSync';

export default {
  components: {UserPermissionsSync, UserProjectsSync, UserForm, BaseSaveButton},
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        username: null,
        firstName: null,
        lastName: null,
        password: null
      })
    }
  },
  data() {
    return {
      isLoading: false,
      form: {
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        password: null
      }
    };
  },
  computed: {
    canSubmit() {
      return this.form.username && this.form.firstName && this.form.lastName;
    }
  },
  methods: {
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.MANAGEMENT.USERS.UPDATE, {
          userId: this.user.id,
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          password: this.form.password
        })
        .then(() => {
          this.$root.$notification.open('User saved.');
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>