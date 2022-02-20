<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          class="mr-3"
          small
          color="white"
        >
          fa-plus
        </v-icon>
        Create Task
      </v-btn>
    </template>
    <v-card tile>
      <v-card-title class="primary white--text">
        Create Task
      </v-card-title>
      <v-card-text class="mt-3">
        <TaskForm
          v-model="form"
          :project="project"
        />
      </v-card-text>
      <v-card-actions class="px-3 pb-3">
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
          :disabled="!canSubmit"
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
import TaskForm from '@/views/projects/show/partials/TaskForm';

export default {
  components: {TaskForm},
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        taskStatuses: []
      })
    }
  },
  emits: ['reload'],
  data() {
    return {
      dialog: false,
      isLoading: false,
      form: {
        name: null,
        description: null,
        taskStatusId: this.project.taskStatuses[0].id
      }
    };
  },
  computed: {
    canSubmit() {
      return this.form.name && this.form.description;
    }
  },
  methods: {
    reload() {
      this.$emit('reload');
    },
    closeDialog() {
      this.dialog = false;
      this.form = {
        name: null,
        description: null,
        taskStatusId: this.project.taskStatuses[0].id
      };
    },
    submit() {
      this.isLoading = true;
      window.axios
        .post(ROUTES.TASKS.STORE, {
          projectId: this.project.id,
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