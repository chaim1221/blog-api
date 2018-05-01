var BlogRepository = require('./../repository.js').Repository;
var db = require('./../db.js');

// pre-defined schema has `posts` so we're leaving it that way
function PostsRepository() {
  var blogRepository = new BlogRepository('blog', 'posts');

  blogRepository.findByTitle = function (title) {
    return blogRepository.find('posts', title);
  }

  return blogRepository;
}

exports.Repository = PostsRepository;
