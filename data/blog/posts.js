var BlogRepository = require('./../repository.js').Repository;
var db = require('./../db.js');

function PostsRepository() {
  var blogRepository = new BlogRepository('blog', 'posts');

  blogRepository.getByTitle = function (title) {
    return blogRepository.find('posts', title);
  }

  return blogRepository;
}

exports.Repository = PostsRepository;
