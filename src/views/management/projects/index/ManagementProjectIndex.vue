<template>
  <BaseContainerCard>
    <template #title>
      Projects
      <v-spacer />
      <ProjectCreateButton v-if="can('management.project.create')" />
    </template>

    <template #default>
      <ProjectTable />
    </template>
  </BaseContainerCard>
</template>

<script>
import ProjectTable from '@/views/management/projects/index/partials/ProjectTable';
import BaseContainerCard from '@/components/base/BaseContainerCard';
import ProjectCreateButton from '@/views/management/projects/index/partials/ProjectCreateButton';
import Permissions from '@/mixins/Permissions';

export default {
  components: {ProjectCreateButton, BaseContainerCard, ProjectTable},
  mixins: [Permissions],
};
</script>