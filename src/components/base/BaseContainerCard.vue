<template>
  <v-container>
    <v-card flat>
      <v-card-title
        class="text-h5"
        style="min-height: 68px;"
      >
        <slot name="title" />
      </v-card-title>
      <v-divider class="mx-3" />
      <v-row class="px-3 mt-3">
        <v-col cols="12">
          <slot />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
