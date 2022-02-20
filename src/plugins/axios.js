import store from './store';
import router from './router';
import Vue from 'vue';
import Axios from 'axios';

let config = {
  baseURL: process.env.VUE_APP_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': {
      toString() {
        return store.getters['locale/locale'];
      }
    },
    Authorization: {
      toString() {
        return `Bearer ${store.getters['auth/apiToken']}`;
      }
    }
  }
};

const axios = Axios.create(config);

axios.interceptors.request.use(
  function (config) {
    // Do something with request data
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    switch (error.response.status) {
      case 401:
        store.commit('auth/UNSET_AUTH');
        return router.push({name: 'login'});
      case 404:
        return router.push({name: 'not-found'});
    }
    return Promise.reject(error);
  }
);

// eslint-disable-next-line no-undef
Plugin.install = function (Vue) {
  Vue.axios = axios;
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios;
      }
    },
    $axios: {
      get() {
        return axios;
      }
    }
  });
};

// eslint-disable-next-line no-undef
Vue.use(Plugin);

export default axios;
