<template>
  <v-container class="pa-3 pa-md-6">
    <v-card flat>
      <v-card-title class="text-h5">
        Profile
      </v-card-title>
      <v-divider class="mx-3" />
      <v-row class="px-3 mt-3">
        <v-col cols="12">
          <ProfileForm />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ProfileForm from '@/views/profile/partials/ProfileForm';
export default {
  components: {ProfileForm}
};
</script>