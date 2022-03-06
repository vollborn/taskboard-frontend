const ROUTES = {
  AUTH: {
    SHOW: '/auth',
    UPDATE: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout'
  },
  PROJECTS: {
    INDEX: '/projects',
    SHOW: '/projects/show'
  },
  TASKS: {
    INDEX: '/tasks',
    SHOW: '/tasks/show',
    STORE: '/tasks',
    UPDATE: '/tasks',
    UPDATE_STATUS: '/tasks/status',
    DELETE: '/tasks'
  },
  MANAGEMENT: {
    PERMISSIONS: {
      INDEX: '/management/permissions'
    },
    USERS: {
      INDEX: '/management/users',
      SHOW: '/management/users/show',
      STORE: '/management/users',
      UPDATE: '/management/users',
      DELETE: '/management/users',
      SYNC: {
        PROJECTS: '/management/users/projects',
        PERMISSIONS: '/management/users/permissions'
      }
    },
    PROJECTS: {
      INDEX: '/management/projects',
      SHOW: '/management/projects/show',
      STORE: '/management/projects',
      UPDATE: '/management/projects',
      DELETE: '/management/projects',
      SYNC: {
        USERS: '/management/projects/users'
      }
    },
    TASK_STATUSES: {
      INDEX: '/management/task-statuses',
      SHOW: '/management/task-statuses/show',
      STORE: '/management/task-statuses',
      UPDATE: '/management/task-statuses',
      DELETE: '/management/task-statuses',
    }
  }
};

const getRoute = (route, data) => {
  let requestRoute = route;
  Object.keys(data).forEach((key) => {
    requestRoute = requestRoute.replace(':' + key, data[key]);
  });
  return requestRoute;
};

export {
  ROUTES,
  getRoute
};
