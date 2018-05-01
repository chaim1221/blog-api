var Post = require('../../domain/blog/post.js');
var PostsRepository = require('../../data/blog/posts.js').Repository;

// /blog/post* would accomodate a broader interface,
// but business requirements state that they want to
// be able to hit /post | /posts directly
function BlogPostController() { }
BlogPostController.prototype.defineRoutes = function(router) {
  var postsRepository = new PostsRepository();
  router.route('/posts')
    .get(function (request, response) {
      var posts = postsRepository.findAll();
      response.json([{ post_id: 1, title: 'hai', body: 'hai' }]);
    });
}

module.exports = BlogPostController;
