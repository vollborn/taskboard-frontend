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
    Create user
  </v-btn>
</template>

<script>
export default {
  methods: {
    gotoCreate() {
      this.pushRouteTo({
        name: 'management-user-create',
      });
    }
  }
};
</script>