<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <p class="text-subtitle-1 mt-3">
        Assigned permissions
      </p>
      <v-data-table
        :headers="headers"
        :items="hasPermissions"
        :loading="isLoadingHasPermissions"
      >
        <template #item.actions="{item}">
          <v-btn
            v-show="!isLoadingHasPermissions && !isLoadingDoesntHavePermissions"
            icon
            color="primary"
            @click="removePermission(item)"
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
        Available permissions
      </p>
      <v-data-table
        :headers="headers"
        :items="doesntHavePermissions"
        :loading="isLoadingDoesntHavePermissions"
      >
        <template #item.actions="{item}">
          <v-btn
            v-show="!isLoadingHasPermissions && !isLoadingDoesntHavePermissions"
            icon
            color="primary"
            @click="addPermission(item)"
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
      permissionIds: this.value,
      hasPermissions: [],
      doesntHavePermissions: [],
      isLoadingHasPermissions: false,
      isLoadingDoesntHavePermissions: false,
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
    this.getHasPermissions();
    this.getDoesntHavePermissions();
  },
  methods: {
    getHasPermissions() {
      this.isLoadingHasPermissions = true;
      window.axios.get(ROUTES.MANAGEMENT.PERMISSIONS.INDEX, {
        params: {
          hasUserId: this.user.id
        }
      })
        .then(({data}) => this.hasPermissions = data.data)
        .finally(() => this.isLoadingHasPermissions = false);
    },
    getDoesntHavePermissions() {
      this.isLoadingDoesntHavePermissions = true;
      window.axios.get(ROUTES.MANAGEMENT.PERMISSIONS.INDEX, {
        params: {
          doesntHaveUserId: this.user.id
        }
      })
        .then(({data}) => this.doesntHavePermissions = data.data)
        .finally(() => this.isLoadingDoesntHavePermissions = false);
    },
    removePermission(permission) {
      this.doesntHavePermissions.push(permission);
      this.hasPermissions = this.hasPermissions.filter((item) => item.id !== permission.id);
      this.reloadPermissionIdsArray();
    },
    addPermission(permission) {
      this.hasPermissions.push(permission);
      this.doesntHavePermissions = this.doesntHavePermissions.filter((item) => item.id !== permission.id);
      this.reloadPermissionIdsArray();
    },
    reloadPermissionIdsArray() {
      this.$emit('input', this.hasPermissions.map((item) => item.id));
    }
  }
};
</script>