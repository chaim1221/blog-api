config = require("./../config.js");
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.filename
  },
  useNullAsDefault: true
});

// TODO: fix name "post_id"; should be "id"
module.exports = {
    create: function(table, data) {
        return knex(table)
// PG       .returning('id')
            .insert(data);
    },
    read: function(table, column, value) {
        return knex(table)
            // we are expecting these to be the same type ^_^
            .where(column, value)
            .select('*')
            .then(function(value) {
                return value[0];
            })
            .catch(function(error) {
                throw new Error(error);
            })
    },
    readAll: function(table) {
        return knex(table)
            .select('*')
            .then(function(value) {
                return value;
            })
    },
    readById: function(table, id) {
        return knex(table)
            .where({ post_id: parseInt(id) })
            .select('*')
            .then(function(value) {
                return value[0];
            })
            .catch(function(error) {
                throw new Error(error);
            })
    }, 
    update: function(table, data) {
        return knex(table)
            .where({ post_id: parseInt(data.post_id) })
// PG       .returning('id')
            .update(data);
    },
    delete: function(table, id) {
        return knex(table)
            .where({ post_id: parseInt(id) })
            .del();
    }
}
