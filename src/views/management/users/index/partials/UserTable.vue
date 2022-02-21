<template>
  <BaseDataTable
    :items="items"
    :page="page"
    :pages="pages"
    :loading="isLoading"
    :headers="headers"
    @page="setPage"
  >
    <template #actions="{item}">
      <UserUpdate
        :user="item"
        @reload="getItems"
      />
      <UserProjectsSync
        :user="item"
      />
      <UserPermissionsSync
        :user="item"
      />
      <UserDelete
        v-if="item.id !== 1"
        :user="item"
        @reload="getItems"
      />
    </template>
  </BaseDataTable>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import BaseDataTable from '@/components/base/BaseDataTable';
import UserDelete from '@/views/management/users/index/partials/UserDelete';
import UserUpdate from '@/views/management/users/index/partials/UserUpdate';
import UserProjectsSync from '@/views/management/users/index/partials/UserProjectsSync/UserProjectsSync';
import UserPermissionsSync from '@/views/management/users/index/partials/UserPermissionsSync/UserPermissionsSync';

export default {
  components: {UserPermissionsSync, UserProjectsSync, UserUpdate, UserDelete, BaseDataTable},
  emits: ['set-reload'],
  data() {
    return {
      isLoading: false,
      items: [],
      page: 1,
      pages: 1,
      headers: [
        {
          text: 'ID',
          value: 'id',
          sortable: false
        },
        {
          text: 'Username',
          value: 'username',
          sortable: false
        },
        {
          text: 'First name',
          value: 'firstName',
          sortable: false
        },
        {
          text: 'Last name',
          value: 'lastName',
          sortable: false
        },
        {
          text: 'Created at',
          value: 'createdAt',
          sortable: false
        },
        {
          text: 'Updated at',
          value: 'updatedAt',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ]
    };
  },
  created() {
    this.getItems();
    this.$emit('set-reload', this.getItems);
  },
  methods: {
    setPage(page) {
      this.page = page;
      this.getItems();
    },
    getItems() {
      this.isLoading = true;
      this.items = [];
      window.axios.get(ROUTES.MANAGEMENT.USERS.INDEX, {
        params: {
          page: this.page,
          perPage: 12
        }
      })
        .then(({data}) => {
          this.items = data.data;
          this.pages = data.meta.last_page;
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>