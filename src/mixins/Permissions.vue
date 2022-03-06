<script>
import {can, canAny} from '@/functions/permissions';

export default {
  methods: {
    can(permission) {
      return can(permission);
    },
    canAny(permissions) {
      return canAny(permissions);
    }
  },
};
</script>