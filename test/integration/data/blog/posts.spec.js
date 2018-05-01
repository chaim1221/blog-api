var assert = require('chai').assert;
var PostsRepository = require(__dirname + '/../../../../data/blog/posts.js').Repository;

describe('When we want to keep track of blog posts', function () {
  var postsRepository = new PostsRepository();
  var post = {
    title: "hello world",
    body: "how are you?\n\nkthxbai!\n"
  }

  describe('Repository: PostsRepository', function () {
    it('Can add blog posts', function (done) {
      postsRepository.add(post).then(function (returnedValue) {
        assert.ok(returnedValue);
        post.id = parseInt(returnedValue);
        console.log(post.id);
        done();
      });
    });
    it('Can find blog posts by ID', function (done) {
      postsRepository.findById(post.id).then(function (result) {
//        //assert.equal(result.id, post.id);
//        assert.equal(result.title, post.title);
//        assert.equal(result.body, post.body);
        done();
      });
    });
    it('Can remove blog posts', function (done) {
      postsRepository.remove(post.id).then(function (rowsAffected) {
        assert.equal(rowsAffected, 1);
        done();
      });
    });
  });
});
