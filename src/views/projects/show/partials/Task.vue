<template>
  <v-col
    :id="'task-' + task.id"
    cols="12"
    draggable="true"
    class="mb-1"
    @dragstart="dragstart"
    @dragover.stop
    @drop.prevent="() => {}"
    @dragover.prevent
  >
    <v-card class="cursor-pointer">
      <v-card-title>
        {{ task.name }}
        <v-spacer />
        <TaskUpdate
          :task="task"
          :project="project"
          @reload="reload"
        />
      </v-card-title>
      <v-card-subtitle>
        {{ task.user.firstName }} {{ task.user.lastName }} ▪ {{ parseDate(task.createdAt) }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        {{ task.description }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import TaskUpdate from '@/views/projects/show/partials/TaskUpdate';
export default {
  components: {TaskUpdate},
  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        name: null,
        description: null,
        createdAt: null,
        user: {
          firstName: null,
          lastName: null,
        }
      })
    },
    project: {
      type: Object,
      required: true,
      default: () => ({
        taskStatuses: []
      })
    }
  },
  emits: ['task-drop', 'reload'],
  methods: {
    dragstart(event) {
      event.dataTransfer.setData('taskId', this.task.id);
    },
    reload() {
      this.$emit('reload');
    }
  }
};
</script>