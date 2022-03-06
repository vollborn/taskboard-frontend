<template>
  <v-app>
    <the-navigation />
    <v-main>
      <notifications ref="notification" />
      <confirm ref="confirm" />
      <auth-loader v-if="isLoadingAuth" />
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import AuthLoader from '@/components/AuthLoader';
import TheNavigation from '@/components/navigation/Navigation';
import {mapActions, mapGetters} from 'vuex';
import Notifications from './components/Notifications';
import Confirm from './components/Confirm';
import Permissions from '@/mixins/Permissions';

export default {
  components: {
    AuthLoader,
    TheNavigation,
    Notifications,
    Confirm
  },
  mixins: [Permissions],
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
      this.getAuth()
        .finally(() => {
          if (this.$route.meta.permission && !this.can(this.$route.meta.permission)) {
            this.pushRouteTo({ name: 'home' });
          }
          this.isLoadingAuth = false;
        });
    } else {
      this.unsetAuth();
      this.isLoadingAuth = false;
    }
  },
  mounted() {
    this.$root.$notification = this.$refs.notification;
    this.$root.$confirm = this.$refs.confirm;
  },
  methods: {
    ...mapActions('auth', ['getAuth', 'unsetAuth'])
  }
};
</script>