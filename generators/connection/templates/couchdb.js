'use strict';

const cradle = require('cradle');
const service = require('feathers-couchdb');

module.exports = function() {
  const app = this;
  const config = app.get('couchdb');
  const db_auth = app.get('couchdb_auth')
  

//var Connection = new(cradle.Connection)('http://192.168.1.79:5984')
const Connection = new(cradle.Connection)(config,
    {
        secure: false,
         auth: {
             username: db_auth.username,
             password: db_auth.password
        },
        cache: true
    }
);

  app.set('couchdbClient', Connection);
};
