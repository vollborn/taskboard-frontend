<template>
  <BaseContainerCard>
    <template #title>
      <BaseBackButton @back="gotoIndex" />
      Update user
    </template>

    <template #default>
      <UserUpdateForm
        v-if="!isLoading && user"
        :user="user"
      />
      <div
        v-else
        class="d-flex justify-center py-6"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
    </template>
  </BaseContainerCard>
</template>

<script>
import BaseContainerCard from '@/components/base/BaseContainerCard';
import {ROUTES} from '@/constants/routes';
import BaseBackButton from '@/components/base/BaseBackButton';
import UserUpdateForm from '@/views/management/users/update/partials/UserUpdateForm';

export default {
  components: {UserUpdateForm, BaseBackButton, BaseContainerCard},
  data() {
    return {
      isLoading: false,
      user: null
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.isLoading = true;
      let params = {
        userId: this.$route.params.userId
      };

      window.axios
        .get(ROUTES.MANAGEMENT.USERS.SHOW, {
          params
        })
        .then(({data}) => this.user = data.data)
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