<template>
  <v-dialog
    v-model="dialog"
    :persistent="canUpdate"
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        class="elevation-0"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          small
          color="primary"
        >
          fa-eye
        </v-icon>
      </v-btn>
    </template>
    <v-card tile>
      <v-card-title class="primary white--text">
        <template v-if="canUpdate">
          Update
        </template>
        <template v-else>
          Show
        </template>
        Task
      </v-card-title>
      <v-card-text class="mt-3">
        <TaskForm
          v-model="form"
          :project="project"
          :readonly="!canUpdate"
        />
      </v-card-text>
      <v-card-actions class="px-3 pb-3">
        <v-spacer v-if="!canUpdate" />
        <v-btn
          class="px-3"
          @click="closeDialog"
        >
          Close
        </v-btn>
        <template v-if="canUpdate">
          <v-spacer />
          <BaseSaveButton
            :disabled="!canSubmit"
            :loading="isLoading"
            @submit="submit"
          />
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import TaskForm from '@/views/projects/show/partials/TaskForm';
import Permissions from '@/mixins/Permissions';
import BaseSaveButton from '@/components/base/BaseSaveButton';

export default {
  components: {BaseSaveButton, TaskForm},
  mixins: [Permissions],
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        taskStatuses: []
      })
    },
    task: {
      type: Object,
      required: true,
      default: () => ({
        name: null,
        description: null,
        taskStatusId: null
      })
    }
  },
  emits: ['reload'],
  data() {
    return {
      dialog: false,
      isLoading: false,
      form: {
        name: this.task.name,
        description: this.task.description,
        taskStatusId: this.task.taskStatusId
      }
    };
  },
  computed: {
    canSubmit() {
      return this.form.name && this.form.description;
    },
    canUpdate() {
      return this.can('task.update');
    }
  },
  watch: {
    task: {
      deep: true,
      handler(value) {
        this.form = {
          name: value.name,
          description: value.description,
          taskStatusId: value.taskStatusId
        };
      }
    }
  },
  methods: {
    reload() {
      this.$emit('reload');
    },
    closeDialog() {
      this.dialog = false;
      this.form = {
        name: this.task.name,
        description: this.task.description,
        taskStatusId: this.task.taskStatusId
      };
    },
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.TASKS.UPDATE, {
          taskId: this.task.id,
          name: this.form.name,
          description: this.form.description,
          taskStatusId: this.form.taskStatusId
        })
        .then(() => {
          this.closeDialog();
          this.reload();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>