<template>
  <v-row>
    <v-col
      v-if="isOpen"
      cols="12"
    >
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Name"
              hide-details
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.color"
              label="Color"
              hide-details
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.order"
              label="Order"
              hide-details
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex"
          >
            <v-spacer />
            <v-btn
              class="mr-3"
              @click="isOpen = false"
            >
              Cancel
            </v-btn>
            <BaseSaveButton
              :loading="isLoading"
              :disabled="!canSubmit"
              @submit="submit"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-col
      v-else
      cols="12"
      class="d-flex"
    >
      <v-spacer />
      <v-btn
        color="primary"
        @click="isOpen = true"
      >
        <v-icon
          small
          class="mr-2"
        >
          fa-plus
        </v-icon>
        Create status
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import BaseSaveButton from '@/components/base/BaseSaveButton';
import {ROUTES} from '@/constants/routes';

export default {
  components: {BaseSaveButton},
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        id: null
      })
    }
  },
  emits: ['reload'],
  data() {
    return {
      isOpen: false,
      isLoading: false,
      form: {
        name: null,
        color: null,
        order: null
      }
    };
  },
  computed: {
    canSubmit() {
      return this.form.name && this.form.color;
    }
  },
  methods: {
    submit() {
      this.isLoading = true;
      const params = {
        projectId: this.project.id,
        name: this.form.name,
        color: this.form.color,
        order: this.form.order
      };

      window.axios.post(ROUTES.MANAGEMENT.TASK_STATUSES.STORE, params)
        .then(() => {
          this.$emit('reload');
          this.isOpen = false;
          this.form = {
            name: null,
            color: null,
            order: null
          };
        })
        .catch(() => this.$root.$notification.open('Status could not be created.', 'error'))
        .finally(() => this.isLoading = false);
    }
  }
};
</script>