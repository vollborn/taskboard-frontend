<template>
  <v-card tile>
    <v-card-title>
      Statuses
    </v-card-title>
    <v-card-text class="mt-3">
      <ProjectStatusTable
        :task-statuses="taskStatuses"
        :is-loading="isLoading"
        @reload="getTaskStatuses"
      />
      <ProjectStatusCreate
        class="mt-3"
        :project="project"
        @reload="getTaskStatuses"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import ProjectStatusTable from './partials/ProjectStatusTable';
import ProjectStatusCreate from './partials/ProjectStatusCreate';
import {ROUTES} from '@/constants/routes';

export default {
  components: {ProjectStatusCreate, ProjectStatusTable},
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
      isLoading: true,
      taskStatuses: []
    };
  },
  created() {
    this.getTaskStatuses();
  },
  methods: {
    getTaskStatuses() {
      this.isLoading = true;
      const params = {
        projectId: this.project.id
      };

      window.axios.get(ROUTES.MANAGEMENT.TASK_STATUSES.INDEX, {
        params
      })
        .then(({data}) => this.taskStatuses = data.data)
        .finally(() => this.isLoading = false);
    }
  }
};
</script>
