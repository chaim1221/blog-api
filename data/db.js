config = require("./../config.js");
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.filename
  },
  useNullAsDefault: true
});

module.exports = {
    create: function(table, data) {
        return knex(table)
            .returning('id')
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
    readById: function(table, id) {
        return knex(table)
            .where({ id: parseInt(id) })
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
            .where({ id: parseInt(data.id) })
            .returning('id')
            .update(data);
    },
    delete: function(table, id) {
        return knex(table)
            .where({ id: parseInt(id) })
            .del();
    }  
}
