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
      <UserUpdateButton
        :user="item"
      />
      <UserDeleteButton
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
import UserDeleteButton from '@/views/management/users/index/partials/UserDeleteButton';
import UserUpdateButton from '@/views/management/users/index/partials/UserUpdateButton';

export default {
  components: {UserUpdateButton, UserDeleteButton, BaseDataTable},
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