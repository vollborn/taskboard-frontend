<template>
  <BaseContainerCard>
    <template #title>
      Projects
      <v-spacer />
      <ProjectCreateButton />
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

export default {
  components: {ProjectCreateButton, BaseContainerCard, ProjectTable},
};
</script>