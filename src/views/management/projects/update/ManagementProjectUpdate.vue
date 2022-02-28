<template>
  <BaseContainerCard>
    <template #title>
      <BaseBackButton @back="gotoIndex" />
      Update project
    </template>

    <template #default>
      <ProjectUpdateForm
        v-if="!isLoading && project"
        :project="project"
      />
      <div
        v-else
        class="d-flex justify-center py-6"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
    </template>
  </BaseContainerCard>
</template>

<script>
import BaseContainerCard from '@/components/base/BaseContainerCard';
import {ROUTES} from '@/constants/routes';
import ProjectUpdateForm from '@/views/management/projects/update/partials/ProjectUpdateForm';
import BaseBackButton from '@/components/base/BaseBackButton';

export default {
  components: {BaseBackButton, ProjectUpdateForm, BaseContainerCard},
  data() {
    return {
      isLoading: false,
      project: null
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.isLoading = true;
      let params = {
        projectId: this.$route.params.projectId
      };

      window.axios
        .get(ROUTES.MANAGEMENT.PROJECTS.SHOW, {
          params
        })
        .then(({data}) => this.project = data.data)
        .finally(() => this.isLoading = false);
    },
    gotoIndex() {
      this.pushRouteTo({
        name: 'management-project-index'
      });
    }
  }
};
</script>