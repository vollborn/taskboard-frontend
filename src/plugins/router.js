import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import {can} from '@/functions/permissions';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
    meta: {auth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta: {noAuth: true}
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/logout/Logout.vue'),
    meta: {auth: true}
  },

  /**
   * Management
   */
  {
    path: '/management/projects',
    name: 'management-project-index',
    component: () => import('../views/management/projects/index/ManagementProjectIndex.vue'),
    meta: {auth: true, permission: 'management.project.read'}
  },
  {
    path: '/management/projects/create',
    name: 'management-project-create',
    component: () => import('../views/management/projects/create/ManagementProjectCreate.vue'),
    meta: {auth: true, permission: 'management.project.create'}
  },
  {
    path: '/management/projects/:projectId',
    name: 'management-project-update',
    component: () => import('../views/management/projects/update/ManagementProjectUpdate.vue'),
    meta: {auth: true, permission: 'management.project.update'}
  },

  {
    path: '/management/users',
    name: 'management-user-index',
    component: () => import('../views/management/users/index/ManagementUserIndex.vue'),
    meta: {auth: true, permission: 'management.user.read'}
  },
  {
    path: '/management/users/create',
    name: 'management-user-create',
    component: () => import('../views/management/users/create/ManagementUserCreate.vue'),
    meta: {auth: true, permission: 'management.user.create'}
  },
  {
    path: '/management/users/:userId',
    name: 'management-user-update',
    component: () => import('../views/management/users/update/ManagementUserUpdate.vue'),
    meta: {auth: true, permission: 'management.user.update'}
  },

  /**
   * Common
   */
  {
    path: '/projects/:projectId',
    name: 'project-show',
    component: () => import('../views/projects/show/ProjectShow.vue'),
    meta: {auth: true}
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/Profile.vue'),
    meta: {auth: true}
  },

  /**
   * Errors
   */
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/not-found/NotFound.vue'),
    meta: {auth: false}
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const auth = store.getters['auth/isAuth'];
  const permissions = store.getters['auth/permissions'];

  if (to.meta.auth && !auth) {
    return next({name: 'login'});
  } else if (to.meta.noAuth && auth) {
    return next({name: 'home'});
  }

  if (auth && permissions && to.meta.permission && !can(to.meta.permission)) {
    return next({name: 'home'});
  }

  return next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

Vue.use(VueRouter);

export default router;
