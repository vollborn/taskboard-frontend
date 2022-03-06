<template>
  <v-card
    v-if="!isLoadingTasks"
    class="mx-3"
    flat
  >
    <div class="project-task-scroll pa-1 pb-4">
      <div class="project-task-row">
        <div
          v-for="(taskStatus, index) in project.taskStatuses"
          :key="taskStatus.id"
          class="project-task-column"
        >
          <v-card
            class="highlight"
            :class="project.taskStatuses.length - 1 === index ? '' : 'mr-3'"
            flat
            @drop.prevent="drop(taskStatus.id, $event)"
            @dragover.prevent
          >
            <v-card-title :style="'color: ' + taskStatus.color">
              {{ taskStatus.name }}
            </v-card-title>
            <v-row
              v-if="tasks"
              :id="'task-status-row-' + taskStatus.id"
              class="px-3 pb-3"
              dense
            >
              <Task
                v-for="task in getTasksForStatus(taskStatus.id)"
                :key="task.id"
                :task="task"
                :project="project"
                @reload="getTasks"
                @set-task-callback="setTaskCallback"
              />
            </v-row>
          </v-card>
        </div>
      </div>
    </div>
    <v-card-actions>
      <div v-if="requestCount !== finishedRequestCount">
        <v-progress-circular
          indeterminate
          color="primary"
          size="18"
          width="2"
          class="mr-2"
        />
        <span class="text-subtitle-2">
          Loading...
        </span>
      </div>
    </v-card-actions>
  </v-card>
  <div v-else>
    <div class="py-12 text-center">
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import Task from '@/views/projects/show/partials/Task';
import Permissions from '@/mixins/Permissions';

export default {
  components: {Task},
  mixins: [Permissions],
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        taskStatuses: []
      })
    }
  },
  emits: ['set-task-reload'],
  data() {
    return {
      tasks: null,
      isLoadingTasks: true,
      requestCount: 0,
      finishedRequestCount: 0,
      taskCallbacks: {}
    };
  },
  created() {
    this.getTasks();
    this.$emit('set-task-reload', this.getTasks);
  },
  methods: {
    setTaskCallback(id, callback) {
      this.taskCallbacks[id] = callback;
    },
    getTasks() {
      this.isLoadingTasks = true;
      window.axios
        .get(ROUTES.TASKS.INDEX, {
          params: {
            projectId: this.project.id
          }
        })
        .then(({data}) => this.tasks = data.data)
        .finally(() => this.isLoadingTasks = false);
    },
    getTasksForStatus(taskStatusId) {
      return this.tasks.filter((item) => item.taskStatusId === taskStatusId);
    },
    drop(taskStatusId, event) {
      if (!this.can('task.update')) {
        return;
      }

      const taskId = event.dataTransfer.getData('taskId');
      const task = document.getElementById('task-' + taskId);
      document.getElementById('task-status-row-' + taskStatusId).appendChild(task);

      this.requestCount++;
      window.axios
        .put(ROUTES.TASKS.UPDATE_STATUS, {
          taskId,
          taskStatusId
        })
        .then(({ data }) => this.taskCallbacks[taskId](data.data))
        .catch(() => this.getTasks())
        .finally(() => this.finishedRequestCount++);
    }
  }
};
</script>

<style lang="scss">
.project-task-scroll {
  overflow-x: auto;

  .project-task-row {
    display: flex;

    .project-task-column {
      width: 100%;
      min-width: 300px;
    }
  }
}
</style>