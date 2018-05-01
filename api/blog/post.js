var Post = require('../../domain/blog/post.js');
var PostsRepository = require('../../data/blog/posts.js');

// /blog/post* would accomodate a broader interface,
// but business requirements state that they want to
// be able to hit /post | /posts directly
function PostsRepositoryController() { }
PostsRepositoryController.prototype.defineRoutes = function(router) {
  router.route('/posts')
    .get(function (request, response) {
      var postsRepository = new PostsRepository();
    });
}
