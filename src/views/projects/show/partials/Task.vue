<template>
  <v-col
    :id="'task-' + currentTask.id"
    cols="12"
    draggable="true"
    class="mb-1"
    @dragstart="dragstart"
    @dragover.stop
    @drop.prevent
    @dragover.prevent
  >
    <v-card class="cursor-pointer">
      <v-card-title>
        {{ currentTask.name }}
        <v-spacer />
        <TaskUpdate
          :task="currentTask"
          :project="project"
          @reload="reload"
        />
        <TaskDelete
          v-if="can('task.delete')"
          :task="currentTask"
          @reload="reload"
        />
      </v-card-title>
      <v-card-subtitle>
        {{ currentTask.user.firstName }} {{ currentTask.user.lastName }} ▪ {{ parseDate(currentTask.createdAt) }}
      </v-card-subtitle>
      <v-divider />
      <v-card-text>
        {{ currentTask.description }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import TaskUpdate from '@/views/projects/show/partials/TaskUpdate';
import TaskDelete from '@/views/projects/show/partials/TaskDelete';
import Permissions from '@/mixins/Permissions';

export default {
  components: {TaskDelete, TaskUpdate},
  mixins: [Permissions],
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
  emits: ['set-task-callback', 'reload'],
  data() {
    return {
      currentTask: this.task
    };
  },
  watch: {
    task: {
      deep: true,
      handler(value) {
        this.currentTask = value;
      }
    }
  },
  created() {
    this.$emit('set-task-callback', this.task.id, this.setTask);
  },
  methods: {
    dragstart(event) {
      event.dataTransfer.setData('taskId', this.task.id);
    },
    reload() {
      this.$emit('reload');
    },
    setTask(task) {
      this.currentTask = task;
    }
  }
};
</script>