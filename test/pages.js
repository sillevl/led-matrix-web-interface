var request = require('supertest');

describe('basic pages', function(){

  var server;

  before(function(){
    server = require('../server');
  });

  after(function(){
    server.close();
  });

  it('get the home page at /', function(done){
    request(server)
      .get('/')
      .expect(200, done);
  });
});
