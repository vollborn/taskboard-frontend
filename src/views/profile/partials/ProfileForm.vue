<template>
  <v-card>
    <v-card-title>
      Base data
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.firstName"
            label="First name"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.lastName"
            label="Last name"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-title>
      Change password
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.password"
            type="password"
            label="New password"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="form.passwordRepeat"
            type="password"
            label="Repeat password"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="px-3 pb-3">
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="!canSubmit"
        :loading="isLoading"
        class="px-3"
        @click="submit"
      >
        Save changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {ROUTES} from '@/constants/routes';
import {mapActions,mapGetters} from 'vuex';

export default {
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        password: null,
        passwordRepeat: null
      },
      isLoading: false
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    canSubmit() {
      return this.form.firstName
        && this.form.lastName
        && (
          !this.form.password || this.form.password === this.form.passwordRepeat
        );
    }
  },
  mounted(){
    this.resetForm();
  },
  methods: {
    ...mapActions('auth', ['getAuth']),
    resetForm() {
      this.form = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        password: null,
        passwordRepeat: null
      };
    },
    submit() {
      this.isLoading = true;
      window.axios
        .put(ROUTES.AUTH.UPDATE, {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          password: this.form.password
        })
        .then(async () => {
          // noinspection JSCheckFunctionSignatures
          await this.getAuth();
          this.resetForm();
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>