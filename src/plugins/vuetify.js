import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.blue.darken3,
        secondary: colors.blue,
        highlight: '#F3F3F3',

        accent: '#82B1FF',
        error: '#FF5252',

        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: colors.blue.darken4,
        secondary: colors.blue.lighten2,
        highlight: '#111111',

        accent: '#82B1FF',
        error: '#FF5252',

        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      }
    }
  },
  icons: {
    iconfont: 'fa'
  }
});
