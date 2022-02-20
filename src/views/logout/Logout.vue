<template>
  <auth-loader />
</template>

<script>
import AuthLoader from '@/components/AuthLoader';
import {mapActions} from 'vuex';

export default {
  components: {AuthLoader},
  mounted() {
    this.logout();
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
};
</script>