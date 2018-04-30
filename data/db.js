// navaja...
// config = require("./../config.js");

sqlite3 = require('sqlite3').verbose();

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./../blog.db"
  }
});

db = new sqlite3.Database('./../blog.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("database connection established");
});

module.exports = {
  dispose: function() {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("database connection closed");
    });
  }
}

