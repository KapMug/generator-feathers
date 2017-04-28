'use strict';

const cradle = require('cradle');
const service = require('feathers-couchdb');

module.exports = function() {
  const app = this;
  const config = app.get('couchdb');
  
const Connection = new(cradle.Connection)(config.url,
    {
        secure: false,
        forceSave: false,
         auth: {
            username: process.env.DB_USERNAME || config.username,
            password: process.env.DB_PASSWORD || config.password
        },
        cache: true
    }
);

  app.set('couchdbClient', Connection);
};