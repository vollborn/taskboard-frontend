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

export default {
  props: {
    task: {
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
    confirmDelete() {
      this.$root.$confirm.open(
        'Delete task',
        'Do you really want to delete this task?'
      ).then((confirm) => {
        if (confirm) this.delete();
      });
    },
    delete() {
      this.isLoading = true;
      window.axios.delete(ROUTES.TASKS.DELETE, {
        params: {
          taskId: this.task.id
        }
      })
        .then(() => {
          this.$root.$notification.open('Task deleted.');
          this.$emit('reload');
        })
        .catch(() => this.$root.$notification.open('Task could not be deleted.', 'error'))
        .finally(() => this.isLoading = false);
    }
  }
};
</script>