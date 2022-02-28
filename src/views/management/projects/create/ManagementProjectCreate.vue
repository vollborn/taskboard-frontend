<template>
  <BaseContainerCard>
    <template #title>
      <BaseBackButton @back="gotoIndex" />
      Create project
    </template>

    <template #default>
      <v-card tile>
        <v-card-text>
          <ProjectForm
            v-model="form"
            :create="true"
          />
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-spacer />
          <v-btn
            color="primary"
            class="px-3"
            :disabled="!canSubmit"
            :loading="isLoading"
            @click="submit"
          >
            <v-icon
              class="mr-2"
              small
            >
              fa-save
            </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </BaseContainerCard>
</template>

<script>
import BaseContainerCard from '@/components/base/BaseContainerCard';
import ProjectForm from '@/components/management/project/ProjectForm';
import {ROUTES} from '@/constants/routes';
import BaseBackButton from '@/components/base/BaseBackButton';

export default {
  components: {BaseBackButton, BaseContainerCard, ProjectForm},
  data() {
    return {
      dialog: false,
      isLoading: false,
      form: {
        name: null,
        description: null
      }
    };
  },
  computed: {
    canSubmit() {
      return !!this.form.name;
    }
  },
  methods: {
    submit() {
      this.isLoading = true;
      window.axios
        .post(ROUTES.MANAGEMENT.PROJECTS.STORE, {
          name: this.form.name,
          description: this.form.description
        })
        .then(({ data }) => {
          this.form = {
            name: null,
            description: null
          };
          this.pushRouteTo({
            name: 'management-project-update',
            params: {
              projectId: data.data.id
            }
          });
        })
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