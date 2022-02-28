<template>
  <v-card tile>
    <v-card-title>
      Projects
    </v-card-title>
    <v-card-text class="mt-3">
      <UserProjectsForm
        v-model="projectIds"
        :user="user"
      />
    </v-card-text>
    <v-card-actions class="px-6 pb-3">
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
import UserProjectsForm from './UserProjectsForm';
import {mapActions} from 'vuex';
import BaseSaveButton from '@/components/base/BaseSaveButton';

export default {
  components: {BaseSaveButton, UserProjectsForm},
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
      projectIds: []
    };
  },
  methods: {
    ...mapActions('project', ['getProjects']),
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.MANAGEMENT.USERS.SYNC.PROJECTS, {
          userId: this.user.id,
          projectIds: this.projectIds
        })
        .then(() => {
          this.$root.$notification.open('Projects synced.');
          this.getProjects();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>