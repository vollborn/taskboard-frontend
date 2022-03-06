<template>
  <div v-if="canAny(navigationPermissions)">
    <v-subheader class="secondary--text mt-2">
      Management
    </v-subheader>

    <v-list-item
      v-for="(item, index) in items"
      v-show="can(item.permission)"
      :key="index"
      link
      @click="pushRouteTo({name: item.route})"
    >
      <v-list-item-icon class="mr-2">
        <div
          class="d-flex justify-center align-center"
          style="width: 40px"
        >
          <v-icon size="18">
            {{ item.icon }}
          </v-icon>
        </div>
      </v-list-item-icon>
      <v-list-item-content class="body-2">
        {{ item.label }}
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import Permissions from '@/mixins/Permissions';

export default {
  mixins: [Permissions],
  data() {
    return {
      navigationPermissions: [
        'management.project.read',
        'management.user.read'
      ],
      items: [
        {
          label: 'Projects',
          permission: 'management.project.read',
          route: 'management-project-index',
          icon: 'fa-book'
        },
        {
          label: 'Users',
          permission: 'management.user.read',
          route: 'management-user-index',
          icon: 'fa-user'
        },
      ]
    };
  }
};
</script>