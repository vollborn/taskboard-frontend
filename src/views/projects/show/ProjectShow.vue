<template>
  <v-container v-if="project">
    <v-card flat>
      <v-card-title class="text-h5">
        {{ project.name }}
        <v-spacer />
        <TaskCreate
          v-if="project.taskStatuses.length > 0 && can('task.create')"
          :project="project"
          @reload="reloadTasks"
        />
      </v-card-title>
      <v-divider class="mx-3" />
      <v-card-subtitle>
        {{ project.description }}
      </v-card-subtitle>
      <ProjectTasks
        v-if="project.taskStatuses.length > 0"
        :project="project"
        @set-task-reload="setTaskReload"
      />
    </v-card>
  </v-container>
  <v-container v-else>
    <div class="py-12 text-center">
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>
  </v-container>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import ProjectTasks from '@/views/projects/show/partials/ProjectTasks';
import TaskCreate from '@/views/projects/show/partials/TaskCreate';
import Permissions from '@/mixins/Permissions';

export default {
  components: {TaskCreate, ProjectTasks},
  mixins: [Permissions],
  data() {
    return {
      project: null,
      taskReload: null
    };
  },
  watch: {
    '$route.params.projectId'() {
      this.getProject();
    }
  },
  created() {
    this.getProject();
  },
  methods: {
    getProject() {
      this.project = null;
      window.axios
        .get(ROUTES.PROJECTS.SHOW, {
          params: {
            projectId: this.$route.params.projectId
          }
        })
        .then(({data}) => this.project = data.data);
    },
    setTaskReload(func) {
      this.taskReload = func;
    },
    reloadTasks() {
      this.taskReload();
    }
  }
};
</script>