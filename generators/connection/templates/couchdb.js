'use strict';

const cradle = require('cradle');
const service = require('feathers-couchdb');

module.exports = function() {
  const app = this;
  const config = app.get('couchdb');
  

//var Connection = new(cradle.Connection)('http://192.168.1.79:5984')
const Connection = new(cradle.Connection)(config,
    {
        secure: true,
        // auth: {
        //     username: '',
        //     password: ''
        // },
        cache: true
    }
);

  app.set('couchdbClient', Connection);
};
