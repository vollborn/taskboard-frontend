<template>
  <v-card tile>
    <v-card-title>
      Permissions
    </v-card-title>
    <v-card-text class="mt-3">
      <UserPermissionsForm
        v-model="permissionIds"
        :user="user"
      />
    </v-card-text>
    <v-card-actions class="px-3 pb-3">
      <v-spacer />
      <BaseSaveButton
        :loading="isLoading"
        @submit="submit"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import UserPermissionsForm from './UserPermissionsForm';
import BaseSaveButton from '@/components/base/BaseSaveButton';

export default {
  components: {BaseSaveButton, UserPermissionsForm},
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        id: null
      })
    }
  },
  data() {
    return {
      isLoading: false,
      permissionIds: []
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.MANAGEMENT.USERS.SYNC.PERMISSIONS, {
          userId: this.user.id,
          permissionIds: this.permissionIds
        })
        .then(() => {
          this.$root.$notification.open('Permissions synced.');
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>