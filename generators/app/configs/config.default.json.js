'use strict';

module.exports = function() {
  const config = {
    host: 'localhost',
    port: 3030,
    public: '../public/',
    paginate: {
      default: 10,
      max: 50
    },
    couchdb : {
      username: 'admin',
      password: 'admin',
      url: "http://127.0.0.1:5984"
    }
  };

  return config;
};
