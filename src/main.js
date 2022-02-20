import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import VueTheMask from 'vue-the-mask';
import axios from './plugins/axios';
import vuetify from './plugins/vuetify';
import store from './plugins/store';
import router from './plugins/router';
import App from './App.vue';
import VueAnimations from 'vue-animations';
import Dates from '@/mixins/Dates';
import PushRoute from '@/mixins/PushRoute';

Vue.use(VueTheMask);

Vue.mixin(Dates);
Vue.mixin(PushRoute);

Vue.component('VueAnimation', VueAnimations.VueAnimation);

new Vue({
  router,
  axios,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app');
