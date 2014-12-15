'use strict';

exports.getDb = function(){
  return process.env.DATABASE_URL.match(/\/([\w]+$)/)[1];
};
