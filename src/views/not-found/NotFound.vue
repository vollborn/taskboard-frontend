<template>
  <v-container>
    <v-row class="not-found-wrapper">
      <v-col
        cols="12"
        md="6"
        lg="3"
      >
        <v-card>
          <v-card-title class="primary white--text">
            Not found
          </v-card-title>
          <v-card-text class="py-6">
            Unfortunately, this link does not seem to work.
            <br>Maybe a typo?
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.not-found-wrapper {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
}
</style>