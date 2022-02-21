import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

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
    meta: {auth: true}
  },
  {
    path: '/management/users',
    name: 'management-user-index',
    component: () => import('../views/management/users/index/ManagementUserIndex.vue'),
    meta: {auth: true}
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
  if (to.meta.auth && !auth) {
    return next({name: 'login'});
  } else if (to.meta.noAuth && auth) {
    return next({name: 'home'});
  } else {
    return next();
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

Vue.use(VueRouter);

export default router;
