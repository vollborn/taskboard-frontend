<template>
  <v-app v-if="isLoadingAuth">
    <v-main>
      <auth-loader />
    </v-main>
  </v-app>

  <v-app v-else>
    <the-navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AuthLoader from '@/components/AuthLoader';
import TheNavigation from '@/components/navigation/Navigation';
import {mapActions, mapGetters} from 'vuex';

export default {
  components: {AuthLoader, TheNavigation},
  data() {
    return {
      isLoadingAuth: true
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  },
  created() {
    if (this.isAuth) {
      this.getAuth().finally(() => this.isLoadingAuth = false);
    } else {
      this.unsetAuth();
      this.isLoadingAuth = false;
    }
  },
  methods: {
    ...mapActions('auth', ['getAuth', 'unsetAuth'])
  }
};
</script>