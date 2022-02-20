<template>
  <v-navigation-drawer
    v-if="isAuth"
    v-model="isOpen"
    clipped
    app
    class="elevation-2"
  >
    <v-list
      nav
      class="mt-2"
      dense
    >
      <v-list-item-group>
        <OverviewNavigation />
        <ManagementNavigation />
        <ProjectsNavigation />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from 'vuex';
import OverviewNavigation from '@/components/navigation/drawer/partials/OverviewNavigation';
import ManagementNavigation from '@/components/navigation/drawer/partials/ManagementNavigation';
import ProjectsNavigation from '@/components/navigation/drawer/partials/ProjectsNavigation';

export default {
  components: {ProjectsNavigation, ManagementNavigation, OverviewNavigation},
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['input'],
  data() {
    return {
      isOpen: this.value
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  },
  watch: {
    isOpen(value) {
      this.$emit('input', value);
    },
    value(value) {
      this.isOpen = value;
    },
  },
  methods: {
    redirect(name) {
      this.pushRouteTo({name: name});
    }
  }
};
</script>