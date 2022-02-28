<template>
  <v-btn
    icon
    color="primary"
    @click="gotoUpdate"
  >
    <v-icon small>
      fa-pen
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        name: null,
        description: null
      })
    }
  },
  methods: {
    gotoUpdate() {
      this.pushRouteTo({
        name: 'management-project-update',
        params: {
          projectId: this.project.id
        }
      });
    }
  }
};
</script>