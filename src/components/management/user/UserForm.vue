<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-text-field
        v-model="form.username"
        label="Username"
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
        v-model="form.firstName"
        label="First name"
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
        v-model="form.lastName"
        label="Last name"
      />
    </v-col>

    <v-col cols="12">
      <v-text-field
        v-model="form.password"
        label="Password"
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
        username: null,
        firstName: null,
        lastName: null,
        password: null
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