<template>
  <v-app-bar
    clipped-left
    app
    color="primary"
    class="white--text"
    elevation="2"
  >
    <v-app-bar-nav-icon
      v-if="isAuth && !slimInterface"
      class="mr-2"
      color="white"
      @click="toggle"
    />

    <div
      style="height: 75%"
      class="cursor-pointer d-flex align-center"
      @click="redirect('home')"
    >
      <span class="ml-2 text-h6 d-none d-md-block">
        Taskboard
      </span>
    </div>

    <v-spacer />

    <div
      v-if="isAuth"
      class="d-flex align-center"
    >
      <navigation-profile-button />
    </div>
  </v-app-bar>
</template>

<script>
import NavigationProfileButton from './NavigationProfileButton';
import {mapGetters} from 'vuex';

export default {
  components: {
    NavigationProfileButton
  },
  props: {
    slimInterface: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['toggle'],
  computed: {
    ...mapGetters('auth', ['isAuth', 'user'])
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
    redirect(name) {
      this.pushRouteTo({name: name});
    }
  },
};
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>