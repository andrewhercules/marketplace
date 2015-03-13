exports.config = {

  specs: [
    'e2e-tests/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
