<template>
  <div>
    <v-subheader class="secondary--text mt-2">
      Projects
    </v-subheader>

    <div v-if="projects.length > 0">
      <v-list-item
        v-for="project in projects"
        :key="project.id"
        link
        @click="openProject(project.id)"
      >
        <v-list-item-icon class="mr-2">
          <div
            class="d-flex justify-center align-center"
            style="width: 40px"
          >
            <v-chip small>
              {{ project.id }}
            </v-chip>
          </div>
        </v-list-item-icon>
        <v-list-item-content>
          {{ project.name }}
        </v-list-item-content>
      </v-list-item>
    </div>
    <div
      v-else-if="loadingProjects"
      class="mt-4 d-flex justify-center align-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="22"
        width="2"
      />
    </div>
    <v-subheader v-else>
      <div class="no-projects-label">
        No projects.
      </div>
    </v-subheader>
  </div>
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
    ...mapActions('project', ['getProjects']),
    openProject(id) {
      this.pushRouteTo({
        name: 'project-show',
        params: {
          projectId: id
        }
      });
    }
  }
};
</script>

<style lang="scss">
.no-projects-label {
  text-align: center;
  width: 100%;
}
</style>