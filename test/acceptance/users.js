/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
   // User       = require('../../server/models/user'),
    server     = require('../../server/index'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    db         = h.getDb(),
    beforeEach = lab.beforeEach;


describe('Users', function(){
  var cookie;

    beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh',[db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){

      var options = {
        method: 'post',
        url: 'login',
        payload:{
          username: 'bob',
          password: '123'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
      done();
    });
  });
});



  describe('post /register', function(){
    it('Should register a new user', function(done){
     var options = {
      method: 'post',
      url:  '/register',
      payload:{
        username: 'sam',
        password: '123',
        avatar:'http://www.w3schools.com/images/colorpicker.gif'
      }
     };
     server.inject(options, function(response){
      expect(response.statusCode).to.equal(200);
      done();
     });
    });
   });

 describe('post /login', function(){
    it('Should login a user', function(done){
     var options = {
      method: 'post',
      url:  '/login',
      payload:{
        username: 'bob',
        password: '123'
      }
     };
     server.inject(options, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.username).to.equal('bob');
      done();
     });
    });
   });

 describe('delete /logout', function(){
    it('Should logout a user', function(done){
     var options = {
      method: 'delete',
      url:  '/logout',
      headers:{
        cookie:cookie
      }
     };
     server.inject(options, function(response){
      expect(response.statusCode).to.equal(200);
      done();
     });
    });
   });


 describe('get /status', function(){
    it('Should get a status to a user', function(done){
     var options = {
      method: 'get',
      url:  '/status',
      headers:{
        cookie:cookie
      }
     };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
