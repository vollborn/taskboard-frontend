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
      <ProjectUpdate
        :project="item"
        @reload="getItems"
      />
      <ProjectUsersSync
        :project="item"
      />
      <ProjectDelete
        :project="item"
        @reload="getItems"
      />
    </template>
  </BaseDataTable>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import BaseDataTable from '@/components/base/BaseDataTable';
import ProjectDelete from '@/views/management/projects/index/partials/ProjectDelete';
import ProjectUpdate from '@/views/management/projects/index/partials/ProjectUpdate';
import ProjectUsersSync from '@/views/management/projects/index/partials/ProjectUsersSync/ProjectUsersSync';

export default {
  components: {ProjectUsersSync, ProjectUpdate, ProjectDelete, BaseDataTable},
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
          text: 'Name',
          value: 'name',
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
      window.axios.get(ROUTES.MANAGEMENT.PROJECTS.INDEX, {
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