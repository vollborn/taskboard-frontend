<template>
  <div>
    <v-subheader class="secondary--text">
      Overview
    </v-subheader>

    <v-list-item
      v-for="(item, index) in items"
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
export default {
  data() {
    return {
      items: [
        {
          label: 'Dashboard',
          route: 'home',
          icon: 'fa-border-all'
        }
      ]
    };
  }
};
</script>