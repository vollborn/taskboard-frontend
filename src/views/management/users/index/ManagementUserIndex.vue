<template>
  <v-container>
    <v-card flat>
      <v-card-title class="text-h5">
        Users
        <v-spacer />
        <UserCreate @reload="callReload" />
      </v-card-title>
      <v-divider class="mx-3" />
      <v-row class="px-3 mt-3">
        <v-col cols="12">
          <UserTable @set-reload="setReload" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import UserTable from '@/views/management/users/index/partials/UserTable';
import UserCreate from '@/views/management/users/index/partials/UserCreate';

export default {
  components: {UserCreate, UserTable},
  data() {
    return {
      reload: null
    };
  },
  methods: {
    setReload(reload) {
      this.reload = reload;
    },
    callReload() {
      this.reload();
    }
  }
};
</script>