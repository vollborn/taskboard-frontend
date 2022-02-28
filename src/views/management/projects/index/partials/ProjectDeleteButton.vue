<template>
  <v-btn
    icon
    color="error"
    :loading="isLoading"
    @click="confirmDelete"
  >
    <v-icon small>
      fa-trash
    </v-icon>
  </v-btn>
</template>

<script>

import {ROUTES} from '@/constants/routes';
import {mapActions} from 'vuex';

export default {
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        id: null
      })
    }
  },
  emits: ['reload'],
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    ...mapActions('project', ['getProjects']),
    confirmDelete() {
      this.$root.$confirm.open(
        'Delete project',
        'Do you really want to delete this project?'
      ).then((confirm) => {
        if (confirm) this.delete();
      });
    },
    delete() {
      this.isLoading = true;
      window.axios.delete(ROUTES.MANAGEMENT.PROJECTS.DELETE, {
        params: {
          projectId: this.project.id
        }
      })
        .then(() => {
          this.getProjects();
          this.$root.$notification.open('Project deleted.');
          this.$emit('reload');
        })
        .catch(() => this.$root.$notification.open('Project could not be deleted.', 'error'))
        .finally(() => this.isLoading = false);
    }
  }
};
</script>