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
    user: {
      type: Object,
      required: true,
      default: () => ({
        id: null
      })
    }
  },
  methods: {
    gotoUpdate() {
      this.pushRouteTo({
        name: 'management-user-update',
        params: {
          userId: this.user.id
        }
      });
    }
  }
};
</script>