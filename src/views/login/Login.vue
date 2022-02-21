<template>
  <div class="login-wrapper">
    <v-row class="d-flex justify-center">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-form @submit.prevent="performLogin">
          <v-card>
            <v-card-title class="white--text primary">
              Login
            </v-card-title>
            <v-divider />
            <v-card-text class="pb-0">
              <v-text-field
                v-model="username"
                label="Username"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
              />
              <p
                v-if="hasError"
                class="mt-4"
              >
                <v-icon
                  color="error"
                  class="mr-1"
                >
                  fa-exclamation-circle
                </v-icon>
                These credentials do not match our records.
              </p>
            </v-card-text>
            <v-card-actions class="pa-3">
              <v-spacer />
              <v-btn
                type="submit"
                :disabled="!username || !password"
                :loading="isLoading"
                color="primary"
                class="px-6"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      username: null,
      password: null,
      isLoading: false,
      hasError: false
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    performLogin() {
      this.isLoading = true;
      this.hasError = false;

      // noinspection JSCheckFunctionSignatures
      this.login({
        username: this.username,
        password: this.password
      })
        .then(() => this.$router.push({name: 'home'}))
        .catch(() => this.hasError = true)
        .finally(() => this.isLoading = false);
    }
  }
};
</script>

<style lang="scss">
.login-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%
}
</style>
