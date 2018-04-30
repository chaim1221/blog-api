// navaja...
// config = require("./../config.js");

sqlite3 = require('sqlite3').verbose();

db = new sqlite3.Database('./../blog.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("database connection established");
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("database connection closed");
});

module.exports = {
}

