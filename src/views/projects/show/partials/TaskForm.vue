<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-text-field
        v-model="form.name"
        label="Name"
      />
    </v-col>

    <v-col cols="12">
      <v-textarea
        v-model="form.description"
        label="Description"
      />
    </v-col>

    <v-col cols="12">
      <v-select
        v-model="form.taskStatusId"
        :items="project.taskStatuses"
        item-value="id"
        item-text="name"
        label="Status"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({
        name: null,
        description: null,
        taskStatusId: null,
      })
    },
    project: {
      type: Object,
      required: true,
      default: () => ({
        taskStatuses: []
      })
    },
  },
  emits: ['input'],
  computed: {
    form: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>