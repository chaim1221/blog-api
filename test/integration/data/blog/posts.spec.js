var assert = require('chai').assert;
var PostsRepository = require(__dirname + '/../../../../data/blog/posts.js').Repository;

// TODO remove post_id from everywhere. srsly
describe('When we want to create, read, update, and delete blog posts,', function () {
  var postsRepository = new PostsRepository();
  var post = {
    title: "hello world",
    body: "how are you?\n\nkthxbai!\n"
  }

  describe('the repository: PostsRepository', function () {
    it('can add blog posts,', function (done) {
      postsRepository.add(post).then(function (returnedValue) {
        assert.ok(returnedValue);
        post.post_id = parseInt(returnedValue);
        //console.log(post.id);
        done();
      });
    });
    it('can find all the blog posts,', function (done) {
      postsRepository.findAll().then(function (result) {
        assert.equal(result.length, 2); //pre-seed contains one already
        assert.equal(result[1].post_id, post.post_id);
        assert.equal(result[1].title, post.title);
        assert.equal(result[1].body, post.body);
        done();
      });
    });
    it('can find blog posts by ID,', function (done) {
      postsRepository.findById(post.post_id).then(function (result) {
        assert.equal(result.post_id, post.post_id);
        assert.equal(result.title, post.title);
        assert.equal(result.body, post.body);
        done();
      });
    });
    it('can find blog posts by title,', function (done) {
      postsRepository.findByTitle(post.title).then(function (result) {
        assert.equal(result.post_id, post.post_id);
        assert.equal(result.title, post.title);
        assert.equal(result.body, post.body);
        done();        
      });
    });
    it('can update existing blog posts, and it', function (done) {
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
    it('can remove blog posts.', function (done) {
      postsRepository.remove(post.post_id).then(function (rowsAffected) {
        assert.equal(rowsAffected, 1);
        done();
      });
    });
  });
});
