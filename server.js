var express = require('express');
var bodyParser = require('body-parser');
var databaseTest = require('./data/db.js');

var port = process.env.PORT || 8080;

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function(request, response, next) {
    next();
});
router.get('/', function(request, response) {
    response.json({ message: 'test successful (200)' });
});

app.use('/api', router);
app.listen(port);
console.log('Listening on port ' + port);

databaseTest.dispose();
