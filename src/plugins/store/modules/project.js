import {ROUTES} from '@/constants/routes';

const state = {
  loadingProjects: false,
  projects: []
};

const getters = {
  loadingProjects: (state) => state.loadingProjects,
  projects: (state) => state.projects
};

const mutations = {
  SET_LOADING_PROJECTS(state, loadingProjects) {
    state.loadingProjects = loadingProjects;
  },
  SET_PROJECTS(state, projects) {
    state.projects = projects;
  }
};

const actions = {
  getProjects({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_LOADING_PROJECTS', true);
      commit('SET_PROJECTS', []);
      window.axios
        .get(ROUTES.PROJECTS.INDEX)
        .then((response) => {
          commit('SET_PROJECTS', response.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => commit('SET_LOADING_PROJECTS', false));
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
