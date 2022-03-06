<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card tile>
        <v-card-title>
          Base data
        </v-card-title>
        <v-card-text>
          <ProjectForm
            v-model="form"
            :create="false"
          />
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-spacer />
          <BaseSaveButton
            :disabled="!canSubmit"
            :loading="isLoading"
            @submit="submit"
          />
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      class="mt-6"
    >
      <ProjectStatuses :project="project" />
    </v-col>
    <v-col
      cols="12"
      class="mt-6 mb-3"
    >
      <ProjectUsersSync :project="project" />
    </v-col>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex';
import {ROUTES} from '@/constants/routes';
import ProjectForm from '@/components/management/project/ProjectForm';
import ProjectUsersSync from '@/views/management/projects/update/partials/ProjectUsersSync/ProjectUsersSync';
import BaseSaveButton from '@/components/base/BaseSaveButton';
import ProjectStatuses from '@/views/management/projects/update/partials/ProjectStatuses/ProjectStatuses';

export default {
  components: {ProjectStatuses, BaseSaveButton, ProjectUsersSync, ProjectForm},
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        name: null,
        description: null
      })
    }
  },
  data() {
    return {
      isLoading: false,
      form: {
        name: this.project.name,
        description: this.project.description
      }
    };
  },
  computed: {
    canSubmit() {
      return !!this.form.name;
    }
  },
  methods: {
    ...mapActions('project', ['getProjects']),
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.MANAGEMENT.PROJECTS.UPDATE, {
          projectId: this.project.id,
          name: this.form.name,
          description: this.form.description
        })
        .then(() => {
          this.$root.$notification.open('Project saved.');
          this.getProjects();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>