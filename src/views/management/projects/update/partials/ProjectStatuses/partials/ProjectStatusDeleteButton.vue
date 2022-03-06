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
    taskStatus: {
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
        'Delete task status',
        'Do you really want to delete this status?'
      ).then((confirm) => {
        if (confirm) this.delete();
      });
    },
    delete() {
      this.isLoading = true;
      window.axios.delete(ROUTES.MANAGEMENT.TASK_STATUSES.DELETE, {
        params: {
          taskStatusId: this.taskStatus.id
        }
      })
        .then(() => {
          this.$root.$notification.open('Status deleted.');
          this.$emit('reload');
        })
        .catch(() => this.$root.$notification.open('Status could not be deleted.', 'error'))
        .finally(() => this.isLoading = false);
    }
  }
};
</script>