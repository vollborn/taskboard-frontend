module.exports = {
  'extends': [
    'plugin:vue/vue3-recommended'
  ],
  'rules': {
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always']
  },
  'globals': {
    'process': 'readonly',
    'window': 'readonly',
    'Promise': 'readonly'
  }
};
