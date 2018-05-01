// framework
var chai = require('chai');
var chaiHttp = require('chai-http');
//var mongoose = require('mongoose');
var server = require('../../../../server.js');
var should = chai.should();

var Post = require('../../../../domain/blog/post.js');
var PostsRepository = require(__dirname + '/../../../../data/blog/posts.js').Repository;

chai.use(chaiHttp);

describe('When we want to interact with blog posts through a REST API,', function () {
  // true evil: exposing a DELETE endpoint was not in the business requirements
  // so, we do our test cleanup against the database repository directly!
  var postsRepository = new PostsRepository();

  describe('the POST endpoint, /post', function () {
    it('accepts a brand spankin\' new blog post', function (done) {
      var post = new Post({
        post_id: null,
        title: "My Adventures in Costa Rica",
        body: "Fui a Costa Rica para fumar y surfear."
      });
      chai.request(server)
        .post('/post')
        .send(post)
        .end(function (error, response) {
          if (error) console.error(error.message);
          
          response.should.have.status(201);

          done();
        });
    });
  });

  describe('the GET endpoint, /posts', function () {
    it('returns all existing blog posts.', function (done) {
      chai.request(server)
        .get('/posts')
        .end(function (error, response) {
          if (error) console.error(error.message);

          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body.length.should.equal(1);

          var post = new Post(response.body[0]);

          post.post_id.should.equal(1);
          post.title.should.equal('hai');
          post.body.should.equal('hai');
          
          done();
        });
    });
  });
});
