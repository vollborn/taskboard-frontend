<template>
  <div class="auth-loader">
    <v-progress-circular
      indeterminate
      size="50"
      color="primary"
    />
  </div>
</template>

<style lang="scss">
.auth-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>