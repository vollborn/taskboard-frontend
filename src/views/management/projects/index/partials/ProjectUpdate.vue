<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          fa-pen
        </v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-card-title class="primary white--text">
        Update Project
      </v-card-title>
      <v-card-text class="mt-3">
        <ProjectForm
          v-model="form"
          :create="true"
        />
      </v-card-text>
      <v-card-actions class="px-3 pb-3">
        <v-btn
          class="px-3"
          @click="closeDialog"
        >
          Close
        </v-btn>
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
  </v-dialog>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import ProjectForm from './ProjectForm';
import {mapActions} from 'vuex';

export default {
  components: {ProjectForm},
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
  emits: ['reload'],
  data() {
    return {
      dialog: false,
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
    reload() {
      this.$emit('reload');
    },
    closeDialog() {
      this.dialog = false;
      this.form = {
        name: this.project.name,
        description: this.project.description
      };
    },
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.MANAGEMENT.PROJECTS.UPDATE, {
          projectId: this.project.id,
          name: this.form.name,
          description: this.form.description
        })
        .then(() => {
          this.getProjects();
          this.closeDialog();
          this.reload();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>