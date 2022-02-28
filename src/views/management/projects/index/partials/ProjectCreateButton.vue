<template>
  <v-btn
    color="primary"
    dark
    @click="gotoCreate"
  >
    <v-icon
      class="mr-3"
      small
      color="white"
    >
      fa-plus
    </v-icon>
    Create project
  </v-btn>
</template>

<script>
export default {
  methods: {
    gotoCreate() {
      this.pushRouteTo({
        name: 'management-project-create',
      });
    }
  }
};
</script>