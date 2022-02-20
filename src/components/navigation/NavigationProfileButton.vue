<template>
  <v-menu
    v-if="user"
    v-model="isOpen"
    bottom
    offset-y
    open-on-hover
    tile
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        class="mr-0 ml-3"
        v-on="on"
        @click="isOpen = !isOpen"
      >
        <v-icon color="white">
          fa-user
        </v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-list>
        <v-list-item-group>
          <v-list-item
            inactive
          >
            <v-list-item-avatar>
              <v-avatar
                color="secondary"
                size="56"
                class="white--text"
              >
                {{ getProfileAvatar() }}
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ user.firstName }} {{ user.lastName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2" />

          <v-list-item @click="pushRouteTo({name: 'profile'})">
            <v-list-item-icon class="mr-2">
              <div
                class="d-flex justify-center align-center"
                style="width: 40px"
              >
                <v-icon size="20">
                  fa-cog
                </v-icon>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              Profile
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="pushRouteTo({name: 'logout'})">
            <v-list-item-icon class="mr-2">
              <div
                class="d-flex justify-center align-center"
                style="width: 40px"
              >
                <v-icon size="20">
                  fa-sign-out-alt
                </v-icon>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              Logout
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    getProfileAvatar() {
      let name = this.user.firstName.slice(0, 1) + this.user.lastName.slice(0, 1);
      return name.toUpperCase();
    },
  }
};
</script>