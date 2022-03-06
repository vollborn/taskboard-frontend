import store from '@/plugins/store';

export const getPermissionNames = () => {
  return store.getters['auth/permissions']
    .map((permission) => {
      return permission.name;
    });
};

export const can = (permission) => {
  if (!permission) {
    return false;
  }

  return getPermissionNames().includes(permission);
};

export const canAny = (permissions) => {
  for (let index = 0; index < permissions.length; index++) {
    if (getPermissionNames().includes(permissions[index])) {
      return true;
    }
  }

  return false;
};

export default {
  can,
  canAny
};
