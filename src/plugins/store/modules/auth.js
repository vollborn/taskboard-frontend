import router from '../../router';
import { ROUTES } from '@/constants/routes';

const state = {
  isAuth: !!localStorage.getItem('isAuth'),
  apiToken: localStorage.getItem('apiToken'),
  user: null,
  permissions: null
};

const getters = {
  isAuth: (state) => state.isAuth,
  apiToken: (state) => state.apiToken,
  user: (state) => state.user,
  permissions: (state) => state.permissions
};

const mutations = {
  SET_IS_AUTH(state, isAuth) {
    state.isAuth = isAuth;
    localStorage.setItem('isAuth', isAuth);
  },
  SET_API_TOKEN(state, apiToken) {
    state.apiToken = apiToken;
    localStorage.setItem('apiToken', apiToken);
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions;
  },
  UNSET_AUTH(state) {
    state.isAuth = false;
    state.user = null;
    state.permissions = null;
    state.apiToken = null;
    localStorage.removeItem('apiToken');
    localStorage.removeItem('isAuth');
  }
};

const actions = {
  login({commit}, form) {
    return new Promise((resolve, reject) => {
      window.axios
        .post(ROUTES.AUTH.LOGIN, form)
        .then((response) => {
          commit('SET_API_TOKEN', response.data.data.apiToken);
          commit('SET_USER', response.data.data);
          commit('SET_PERMISSIONS', response.data.data.permissions);

          commit('SET_IS_AUTH', true);
          resolve(response);
        })
        .catch((error) => {
          commit('UNSET_AUTH');
          reject(error);
        });
    });
  },
  logout({commit}) {
    return new Promise((resolve, reject) => {
      window.axios
        .post(ROUTES.AUTH.LOGOUT)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(async () => {
          await commit('UNSET_AUTH');
          await router.push({name: 'login'});
        });
    });
  },
  getAuth({commit}) {
    return new Promise((resolve, reject) => {
      window.axios
        .get(ROUTES.AUTH.SHOW)
        .then((response) => {
          commit('SET_USER', response.data.data);
          commit('SET_PERMISSIONS', response.data.data.permissions);
          resolve(response);
        })
        .catch((error) => {
          commit('UNSET_AUTH');
          reject(error);
        });
    });
  },
  unsetAuth({commit}) {
    commit('UNSET_AUTH');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
