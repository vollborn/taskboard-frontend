<template>
  <v-container>
    <v-card flat>
      <v-card-title class="text-h5">
        Projects
        <v-spacer />
        <ProjectCreate @reload="callReload" />
      </v-card-title>
      <v-divider class="mx-3" />
      <v-row class="px-3 mt-3">
        <v-col cols="12">
          <ProjectTable @set-reload="setReload" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ProjectTable from '@/views/management/projects/index/partials/ProjectTable';
import ProjectCreate from '@/views/management/projects/index/partials/ProjectCreate';

export default {
  components: {ProjectCreate, ProjectTable},
  data() {
    return {
      reload: null
    };
  },
  methods: {
    setReload(reload) {
      this.reload = reload;
    },
    callReload() {
      this.reload();
    }
  }
};
</script>