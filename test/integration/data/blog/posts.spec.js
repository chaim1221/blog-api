var assert = require('chai').assert;
var PostsRepository = require(__dirname + '/../../../../data/blog/posts.js').Repository;

describe('When we want to keep track of blog posts', function () {
  var postsRepository = new PostsRepository();
  var post = {
    title: "hello world",
    body: "how are you?\n\nkthxbai!\n"
  }

  describe('Repository: PostsRepository', function () {
    it('Is not null', function (){
      assert.isNotNull(postsRepository);
    });
  });
});
