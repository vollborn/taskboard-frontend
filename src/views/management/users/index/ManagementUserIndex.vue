<template>
  <v-container>
    <v-card flat>
      <v-card-title class="text-h5">
        Users
        <v-spacer />
        <UserCreateButton v-if="can('management.user.create')" />
      </v-card-title>
      <v-divider class="mx-3" />
      <v-row class="px-3 mt-3">
        <v-col cols="12">
          <UserTable />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import UserTable from '@/views/management/users/index/partials/UserTable';
import UserCreateButton from '@/views/management/users/index/partials/UserCreateButton';
import Permissions from '@/mixins/Permissions';

export default {
  components: {UserCreateButton, UserTable},
  mixins: [Permissions],
  data() {
    return {
      reload: null
    };
  },
};
</script>