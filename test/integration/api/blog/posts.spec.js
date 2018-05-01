// framework
var chai = require('chai');
var chaiHttp = require('chai-http');
//var mongoose = require('mongoose');
var server = require('../../../../server.js');
var should = chai.should();

var Post = require('../../../../domain/blog/post.js');

chai.use(chaiHttp);

describe('When we want to interact with blog posts through a REST API,', function () {
  describe('the GET endpoint, /posts', function () {
    it('returns all existing blog posts.', function (done) {
       chai.request(server)
         .get('/posts')
         .end(function (error, response) {
             response.should.have.status(200);
         });
      done();
    });
  });
});
