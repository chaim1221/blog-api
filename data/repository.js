var db = require('./db.js');

function BlogRepository (schema, table) {
    this.schema = schema;
    this.table = table;
}
BlogRepository.prototype = {
  add: function (data) {
    return db.create(this.schema + '.' + this.table, data);
  },
  find: function (column, value) {
    return db.read(this.schema + '.' + this.table, column, value);
  },
  findById: function (id) {
    return db.readById(this.schema + '.' + this.table, id);
  },
  saveChanges: function (data) {
    return db.update(this.schema + '.' + this.table, data);
  },
  remove: function (id) {
    return db.delete(this.schema + '.' + this.table, id);
  }
}

exports.Repository = BlogRepository;
