var assert = require('chai').assert;
var BlogPostController = require('../../../../api/blog/post.js');

describe('When we want to test controller logic, we know that:', function () {
  describe('The BlogPostController', function () {
    it('is funky.', function (done) {
      // what happened: I started to go down this path and realized that
      // testing Express routes is maybe not a great use of time for this
      // project. What we'd really need to do to test the business logic
      // in a real application is to abstract the service layer from the
      // controllers, and then test the services. Then we could verify
      // the service outputs match what the controller needs to return.
      done();
    });
  })
});
