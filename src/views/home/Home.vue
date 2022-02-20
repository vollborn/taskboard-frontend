<template>
  <v-container
    class="pa-3 pa-md-6"
  >
    <v-card flat>
      <v-card-title class="text-h5">
        {{ randomizeGreeting() }} {{ user.firstName }} {{ user.lastName }}!
      </v-card-title>
      <v-divider class="mx-3 mb-3" />
      <ProjectRow />
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import ProjectRow from '@/views/home/partials/ProjectRow';

export default {
  components: {ProjectRow},
  data() {
    return {
      greetings: [
        'Welcome,',
        'Welcome back,',
        'Good day,',
        'Hello'
      ]
    };
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    randomizeGreeting() {
      return this.greetings[Math.floor(Math.random() * this.greetings.length)];
    }
  }
};
</script>