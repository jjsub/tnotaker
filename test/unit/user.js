/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    User       = require('../../server/models/user'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    before     = lab.before,
    db         = h.getDb(),
    beforeEach = lab.beforeEach;


describe('User', function(){
  before(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh',[db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('create a User object', function(done){
      var user = new User({username: 'Bob'});

      expect(user).to.be.instanceof(User);
      expect(user.username).to.equal('Bob');
      done();
    });
  });

  describe('.register', function(){
    it('Should register a new user', function(done){
      var payload = new User({username: 'sam', password: '123', avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'});
      User.register(payload, function(err){
        expect(err).to.be.null;
        done();
      });
    });
  });

   describe('.login', function(){
    it('Should login a user', function(done){
      User.login({username:'Bob', password: '123'}, function(user){
        expect(user.username).to.be.equal('Bob');
        done();
      });
    });
    it('Should NOT login a User - bad password', function(done){
      User.login({username:'wrong', password:'123'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
    it('Should NOT login a User -bad password', function(done){
      User.login({username:'Bob', password:'wrong'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
  });
});
