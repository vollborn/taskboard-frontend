<template>
  <BaseContainerCard>
    <template #title>
      <BaseBackButton @back="gotoIndex" />
      Create user
    </template>

    <template #default>
      <v-card tile>
        <v-card-text>
          <UserForm
            v-model="form"
            :create="true"
          />
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-spacer />
          <BaseSaveButton
            :disabled="!canSubmit"
            :loading="isLoading"
            @submit="submit"
          />
        </v-card-actions>
      </v-card>
    </template>
  </BaseContainerCard>
</template>

<script>
import BaseContainerCard from '@/components/base/BaseContainerCard';
import BaseBackButton from '@/components/base/BaseBackButton';
import {ROUTES} from '@/constants/routes';
import UserForm from '@/components/management/user/UserForm';
import BaseSaveButton from '@/components/base/BaseSaveButton';

export default {
  components: {BaseSaveButton, UserForm, BaseBackButton, BaseContainerCard},
  data() {
    return {
      dialog: false,
      isLoading: false,
      form: {
        username: null,
        firstName: null,
        lastName: null,
        password: null
      }
    };
  },
  computed: {
    canSubmit() {
      return this.form.username && this.form.firstName && this.form.lastName && this.form.password;
    }
  },
  methods: {
    submit() {
      this.isLoading = true;
      window.axios
        .post(ROUTES.MANAGEMENT.USERS.STORE, {
          username: this.form.username,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          password: this.form.password
        })
        .then(({ data }) => {
          this.pushRouteTo({
            name: 'management-user-update',
            params: {
              userId: data.data.id
            }
          });
        })
        .finally(() => this.isLoading = false);
    },
    gotoIndex() {
      this.pushRouteTo({
        name: 'management-user-index'
      });
    }
  }
};
</script>