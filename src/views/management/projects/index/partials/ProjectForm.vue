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
        description: null
      })
    },
    create: {
      type: Boolean,
      required: false,
      default: false
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