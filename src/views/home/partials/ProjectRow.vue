<template>
  <div
    v-if="loadingProjects"
    class="d-flex justify-center py-6"
  >
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>
  <v-row
    v-else
    class="pa-3"
  >
    <v-col
      v-for="project in projects"
      :key="project.id"
      cols="12"
      md="6"
      lg="3"
    >
      <v-card>
        <v-card-title>
          {{ project.name }}
          <v-spacer />
          <v-chip small>
            {{ project.id }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          {{ project.description }}
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-3">
          <div class="text-subtitle-2 text--secondary">
            {{ parseDate(project.createdAt) }}
          </div>
          <v-spacer />
          <v-btn
            color="primary"
            class="px-3"
            @click="pushRouteTo({name: 'project-show', params: {projectId: project.id}})"
          >
            Show
            <v-icon class="ml-2">
              fa-angle-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters('project', ['loadingProjects', 'projects'])
  },
  created() {
    if (!this.projects.length && !this.loadingProjects) {
      this.getProjects();
    }
  },
  methods: {
    ...mapActions('project', ['getProjects'])
  }
};
</script>

