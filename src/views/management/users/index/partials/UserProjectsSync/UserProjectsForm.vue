<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <p class="text-subtitle-1 mt-3">
        Assigned projects
      </p>
      <v-data-table
        :headers="headers"
        :items="hasProjects"
        :loading="isLoadingHasProjects"
      >
        <template #item.actions="{item}">
          <v-btn
            v-show="!isLoadingHasProjects && !isLoadingDoesntHaveProjects"
            icon
            color="primary"
            @click="removeProject(item)"
          >
            <v-icon>
              fa-chevron-right
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>

    <v-col
      cols="12"
      md="6"
    >
      <p class="text-subtitle-1 mt-3">
        Available projects
      </p>
      <v-data-table
        :headers="headers"
        :items="doesntHaveProjects"
        :loading="isLoadingDoesntHaveProjects"
      >
        <template #item.actions="{item}">
          <v-btn
            v-show="!isLoadingHasProjects && !isLoadingDoesntHaveProjects"
            icon
            color="primary"
            @click="addProject(item)"
          >
            <v-icon>
              fa-chevron-left
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {ROUTES} from '@/constants/routes';

export default {
  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },
    user: {
      type: Object,
      required: true,
      default: () => ({
        id: null
      })
    }
  },
emits: ['input'],
  data() {
    return {
      projectIds: this.value,
      hasProjects: [],
      doesntHaveProjects: [],
      isLoadingHasProjects: false,
      isLoadingDoesntHaveProjects: false,
      headers: [
        {
          text: 'Name',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'actions'
        }
      ]
    };
  },
  created() {
    this.getHasProjects();
    this.getDoesntHaveProjects();
  },
  methods: {
    getHasProjects() {
      this.isLoadingHasProjects = true;
      window.axios.get(ROUTES.MANAGEMENT.PROJECTS.INDEX, {
        params: {
          hasUserId: this.user.id
        }
      })
        .then(({data}) => this.hasProjects = data.data)
        .finally(() => this.isLoadingHasProjects = false);
    },
    getDoesntHaveProjects() {
      this.isLoadingDoesntHaveProjects = true;
      window.axios.get(ROUTES.MANAGEMENT.PROJECTS.INDEX, {
        params: {
          doesntHaveUserId: this.user.id
        }
      })
        .then(({data}) => this.doesntHaveProjects = data.data)
        .finally(() => this.isLoadingDoesntHaveProjects = false);
    },
    removeProject(project) {
      this.doesntHaveProjects.push(project);
      this.hasProjects = this.hasProjects.filter((item) => item.id !== project.id);
      this.reloadProjectIdsArray();
    },
    addProject(project) {
      this.hasProjects.push(project);
      this.doesntHaveProjects = this.doesntHaveProjects.filter((item) => item.id !== project.id);
      this.reloadProjectIdsArray();
    },
    reloadProjectIdsArray() {
      this.$emit('input', this.hasProjects.map((item) => item.id));
    }
  }
};
</script>