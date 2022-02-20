import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import VueTheMask from 'vue-the-mask';
import axios from './plugins/axios';
import vuetify from './plugins/vuetify';
import store from './plugins/store';
import router from './plugins/router';
import App from './App.vue';
import VueAnimations from 'vue-animations';

Vue.use(VueTheMask);

Vue.component('VueAnimation', VueAnimations.VueAnimation);

new Vue({
  router,
  axios,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app');
