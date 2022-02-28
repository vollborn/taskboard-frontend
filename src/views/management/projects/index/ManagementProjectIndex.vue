<template>
  <BaseContainerCard>
    <template #title>
      Projects
      <v-spacer />
      <v-btn
        color="primary"
        dark
        @click="gotoCreate"
      >
        <v-icon
          class="mr-3"
          small
          color="white"
        >
          fa-plus
        </v-icon>
        Create project
      </v-btn>
    </template>

    <template #default>
      <ProjectTable />
    </template>
  </BaseContainerCard>
</template>

<script>
import ProjectTable from '@/views/management/projects/index/partials/ProjectTable';
import BaseContainerCard from '@/components/base/BaseContainerCard';

export default {
  components: {BaseContainerCard, ProjectTable},
  data() {
    return {
      reload: null
    };
  },
  methods: {
    gotoCreate() {
      this.pushRouteTo({
        name: 'management-project-create'
      });
    }
  }
};
</script>