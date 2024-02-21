module.exports = {
  extends: ['@netiler/netiler', '@netiler/netiler/vue'],
  globals: {
    Designer:'writable',
    Utils: 'writable',
    Model: 'writable',
    MessageSource: 'writable',
  },
  rules: {
    'vue/attributes-order': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-deprecated-v-bind-sync': 'off',
  },
};
