<template>
  <v-btn
    icon
    small
    class="mr-1"
    @click="emitBack"
  >
    <v-icon
      color="primary"
      small
    >
      fa-chevron-left
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  emits: ['back'],
  methods: {
    emitBack() {
      this.$emit('back');
    }
  }
};
</script>