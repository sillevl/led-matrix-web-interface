
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// handlebars setup and configuration
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/static', express.static('public'));


app.get('/', function (req, res) {
  res.render('home');
});

app.post('/', function(req, res){
  console.log(req.body);
  var data = {
    first: req.body.first,
    second: req.body.second
  };
  console.log(data);
  res.render('home', data);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});

module.exports = server;
