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
      <ProjectUpdateButton
        v-if="can('management.project.update')"
        :project="item"
      />
      <ProjectDeleteButton
        v-if="can('management.project.delete')"
        :project="item"
        @reload="getItems"
      />
    </template>
  </BaseDataTable>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import BaseDataTable from '@/components/base/BaseDataTable';
import ProjectDeleteButton from '@/views/management/projects/index/partials/ProjectDeleteButton';
import ProjectUpdateButton from '@/views/management/projects/index/partials/ProjectUpdateButton';
import Permissions from '@/mixins/Permissions';

export default {
  components: {ProjectUpdateButton, ProjectDeleteButton, BaseDataTable},
  mixins: [Permissions],
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