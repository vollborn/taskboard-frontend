<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        :items-per-page="-1"
        class="elevation-1"
        hide-default-footer
      >
        <template #item.createdAt="{ item }">
          {{ parseDateTime(item.createdAt) }}
        </template>

        <template #item.updatedAt="{ item }">
          {{ parseDateTime(item.updatedAt) }}
        </template>

        <template #item.actions="{ item }">
          <slot
            name="actions"
            :item="item"
          />
        </template>
      </v-data-table>
    </v-col>
    <v-col
      cols="12"
      class="text-center"
    >
      <v-pagination
        v-model="localPage"
        :length="pages"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    pages: {
      type: Number,
      required: false,
      default: 1
    }
  },
  emits: ['page'],
  computed: {
    localPage: {
      set(value) {
        this.$emit('page', value);
      },
      get() {
        return this.page;
      }
    }
  }
};
</script>