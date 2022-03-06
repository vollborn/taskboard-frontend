<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['permissions'])
  },
  methods: {
    getPermissionNames() {
      return this.permissions.map((permission) => {
        return permission.name;
      });
    },
    can(permission) {
      if (!permission) return false;
      return this.getPermissionNames().includes(permission);
    },
    canAny(permissions) {
      for (let index = 0; index < permissions.length; index++) {
        if (this.getPermissionNames().includes(permissions[index])) return true;
      }
      return false;
    }
  },
};
</script>