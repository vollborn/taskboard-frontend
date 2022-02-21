module.exports = {
  'extends': [
    'plugin:vue/vue3-recommended'
  ],
  'rules': {
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'vue/valid-v-slot': 'off'
  },
  'globals': {
    'process': 'readonly',
    'window': 'readonly',
    'Promise': 'readonly'
  }
};
