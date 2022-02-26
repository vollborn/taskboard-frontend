<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <p class="text-subtitle-1 mt-3">
        Assigned users
      </p>
      <v-data-table
        :headers="headers"
        :items="hasUsers"
        :loading="isLoadingHasUsers"
      >
        <template #item.actions="{item}">
          <v-btn
            v-show="!isLoadingHasUsers && !isLoadingDoesntHaveUsers"
            icon
            color="primary"
            @click="removeUser(item)"
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
        Available users
      </p>
      <v-data-table
        :headers="headers"
        :items="doesntHaveUsers"
        :loading="isLoadingDoesntHaveUsers"
      >
        <template #item.actions="{item}">
          <v-btn
            v-show="!isLoadingHasUsers && !isLoadingDoesntHaveUsers"
            icon
            color="primary"
            @click="addUser(item)"
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
    project: {
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
      hasUsers: [],
      doesntHaveUsers: [],
      isLoadingHasUsers: false,
      isLoadingDoesntHaveUsers: false,
      headers: [
        {
          text: 'Username',
          sortable: false,
          value: 'username'
        },
        {
          text: 'First name',
          sortable: false,
          value: 'firstName'
        },
        {
          text: 'Last name',
          sortable: false,
          value: 'lastName'
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
    this.getHasUsers();
    this.getDoesntHaveUsers();
  },
  methods: {
    getHasUsers() {
      this.isLoadingHasUsers = true;
      window.axios.get(ROUTES.MANAGEMENT.USERS.INDEX, {
        params: {
          hasProjectId: this.project.id
        }
      })
        .then(({data}) => this.hasUsers = data.data)
        .finally(() => this.isLoadingHasUsers = false);
    },
    getDoesntHaveUsers() {
      this.isLoadingDoesntHaveUsers = true;
      window.axios.get(ROUTES.MANAGEMENT.USERS.INDEX, {
        params: {
          doesntHaveProjectId: this.project.id
        }
      })
        .then(({data}) => this.doesntHaveUsers = data.data)
        .finally(() => this.isLoadingDoesntHaveUsers = false);
    },
    removeUser(project) {
      this.doesntHaveUsers.push(project);
      this.hasUsers = this.hasUsers.filter((item) => item.id !== project.id);
      this.reloadUserIdsArray();
    },
    addUser(project) {
      this.hasUsers.push(project);
      this.doesntHaveUsers = this.doesntHaveUsers.filter((item) => item.id !== project.id);
      this.reloadUserIdsArray();
    },
    reloadUserIdsArray() {
      this.$emit('input', this.hasUsers.map((item) => item.id));
    }
  }
};
</script>