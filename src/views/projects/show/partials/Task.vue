<template>
  <v-col
    :id="'task-' + task.id"
    cols="12"
    draggable="true"
    @dragstart="dragstart"
    @dragover.stop
    @drop.prevent="() => {}"
    @dragover.prevent
  >
    <v-card class="cursor-pointer">
      <v-card-title>
        {{ task.name }}
      </v-card-title>
      <v-card-text>
        {{ task.description }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        name: null,
        description: null
      })
    }
  },
  emits: ['task-drop'],
  methods: {
    dragstart(event) {
      event.dataTransfer.setData('taskId', this.task.id);
    },
  }
};
</script>