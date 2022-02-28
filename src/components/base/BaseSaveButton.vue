<template>
  <v-btn
    color="primary"
    class="px-3"
    :loading="loading"
    :disabled="disabled"
    @click="submit"
  >
    <v-icon
      class="mr-2"
      small
    >
      fa-save
    </v-icon>
    Save
  </v-btn>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['submit'],
  methods: {
    submit() {
      this.$emit('submit');
    }
  }
};
</script>