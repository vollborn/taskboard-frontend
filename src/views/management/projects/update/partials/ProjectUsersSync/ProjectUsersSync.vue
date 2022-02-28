<template>
  <v-card tile>
    <v-card-title>
      Users
    </v-card-title>
    <v-card-text class="mt-3">
      <ProjectUsersForm
        v-model="userIds"
        :project="project"
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
import ProjectUsersForm from './ProjectUsersForm';
import {mapActions} from 'vuex';
import BaseSaveButton from '@/components/base/BaseSaveButton';

export default {
  components: {BaseSaveButton, ProjectUsersForm},
  props: {
    project: {
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
      userIds: []
    };
  },
  methods: {
    ...mapActions('project', ['getProjects']),
    closeDialog() {
      this.dialog = false;
    },
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.MANAGEMENT.PROJECTS.SYNC.USERS, {
          projectId: this.project.id,
          userIds: this.userIds
        })
        .then(() => {
          this.$root.$notification.open('Users synced.');
          this.getProjects();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>