var assert = require('chai').assert;
var PostsRepository = require(__dirname + '/../../../../data/blog/posts.js').Repository;

// TODO remove post_id from everywhere. srsly
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
        post.post_id = parseInt(returnedValue);
        //console.log(post.id);
        done();
      });
    });
    it('Can find blog posts by ID', function (done) {
      postsRepository.findById(post.post_id).then(function (result) {
        assert.equal(result.post_id, post.post_id);
        assert.equal(result.title, post.title);
        assert.equal(result.body, post.body);
        done();
      });
    });
    it('Can update blog posts', function (done) {
      post.body = "\nHow are you?\n\nOkay, thank you, goodbye.\n";
      postsRepository.saveChanges(post).then(function (rowsAffected) {
        postsRepository.findById(post.post_id).then(function (result) {
          assert.equal(result.post_id, post.post_id);
          assert.equal(result.title, post.title);
          assert.equal(result.body, post.body);
        });
        done();
      });
    });
    it('Can remove blog posts', function (done) {
      postsRepository.remove(post.post_id).then(function (rowsAffected) {
        assert.equal(rowsAffected, 1);
        done();
      });
    });
  });
});
