<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          fa-user
        </v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar
        dark
        color="primary"
      >
        <v-toolbar-title>Add Permissions</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          dark
          class="mx-0"
          @click="closeDialog"
        >
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-3">
        <UserPermissionsForm
          v-model="permissionIds"
          :user="user"
        />
      </v-card-text>
      <v-card-actions class="px-6 pb-3">
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
import UserPermissionsForm from '@/views/management/users/index/partials/UserPermissionsSync/UserPermissionsForm';

export default {
  components: {UserPermissionsForm},
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
      dialog: false,
      isLoading: false,
      permissionIds: []
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.MANAGEMENT.USERS.SYNC.PERMISSIONS, {
          userId: this.user.id,
          permissionIds: this.permissionIds
        })
        .then(() => {
          this.closeDialog();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>