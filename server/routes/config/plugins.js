'use strict';

module.exports = [
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        args: [{log: '*', response: '*'}]
      }]
    }
  },
  {
    register: require('lout')
  },
  {
    register: require('hapi-auth-cookie')
  }
];
