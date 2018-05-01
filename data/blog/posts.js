var BlogRepository = require('./../repository.js').Repository;
var db = require('./../db.js');

// pre-defined schema has table `posts`, so implement that
function PostsRepository() {
  var blogRepository = new BlogRepository('blog', 'posts');

  blogRepository.findByTitle = function (title) {
    return blogRepository.find('title', title);
  }

  return blogRepository;
}

exports.Repository = PostsRepository;
