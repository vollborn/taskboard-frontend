<template>
  <div
    v-if="isLoading"
    class="d-flex justify-center pt-3 pb-9"
  >
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>
  <v-simple-table
    v-else-if="taskStatuses.length > 0"
  >
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Color
        </th>
        <th class="text-left">
          Order
        </th>
        <th class="text-left">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="taskStatus in taskStatuses"
        :key="taskStatus.id"
      >
        <td>
          <span :style="'color: ' + taskStatus.color">
            {{ taskStatus.name }}
          </span>
        </td>
        <td>
          {{ taskStatus.color }}
        </td>
        <td>
          {{ taskStatus.order }}
        </td>
        <td>
          <ProjectStatusDeleteButton
            :task-status="taskStatus"
            @reload="reload"
          />
        </td>
      </tr>
    </tbody>
  </v-simple-table>
  <div
    v-else
    class="d-flex justify-center pt-3 pb-9"
  >
    No statuses found.
  </div>
</template>

<script>
import ProjectStatusDeleteButton
  from '@/views/management/projects/update/partials/ProjectStatuses/partials/ProjectStatusDeleteButton';
export default {
  components: {ProjectStatusDeleteButton},
  props: {
    taskStatuses: {
      type: Array,
      required: true,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ['reload'],
  methods: {
    reload() {
      this.$emit('reload');
    }
  }
};
</script>