// and this is why we don't use plural references:
var Post = function Post(data) {
  this.post_id = data.post_id;  // heaven help us
  this.title = data.title;
  this.body = data.body;
}

module.exports = Post;
