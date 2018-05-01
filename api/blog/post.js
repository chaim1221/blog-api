var Post = require('../../domain/blog/post.js');
var PostsRepository = require('../../data/blog/posts.js').Repository;

// /blog/post* would accomodate a broader interface,
// but business requirements state /post | /posts
function BlogPostController() { }
BlogPostController.prototype.defineRoutes = function(router) {
  var postsRepository = new PostsRepository();
  router.route('/posts')
    .get(function (request, response) {
      var posts = [];
      postsRepository.findAll().then(function (results) {
        results.forEach(result => { // ensure the result is a blog Post and push
          var post = new Post(result);
          posts.push(post);
        });
        response.json(posts);
      });
    });
  //
  router.route('/post')
    .post(function (request, response) {
      console.log(request.body);
      var post = new Post(request.body);
      postsRepository.add(post).then(function (returnedValue) {
        post.post_id = parseInt(returnedValue);
        console.log(post.post_id);
        response.status(201).json({ message: "201 CREATED" });
      });
    });
  //
}

module.exports = BlogPostController;
