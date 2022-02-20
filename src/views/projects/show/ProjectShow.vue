<template>
  <v-container v-if="project">
    <v-card flat>
      <v-card-title class="text-h5">
        {{ project.name }}
      </v-card-title>
      <v-divider class="mx-3" />
      <v-card-subtitle>
        {{ project.description }}
      </v-card-subtitle>
      <ProjectTasks :project="project" />
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

export default {
  components: {ProjectTasks},
  data() {
    return {
      project: null
    };
  },
  created() {
    this.getProject();
  },
  methods: {
    getProject() {
      window.axios
        .get(ROUTES.PROJECTS.SHOW, {
          params: {
            projectId: this.$route.params.projectId
          }
        })
        .then(({data}) => this.project = data.data);
    }
  }
};
</script>