
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var api = require("./lib/api");
var cors = require('cors');
var LedPanel = require('99bugs-led-display');

app.display = new LedPanel('/dev/spidev0.0');

app.use(cors());

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// handlebars setup and configuration
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/static', express.static('public'));

app.use('/api', api);

app.get('/', function (req, res) {
  res.render('home');
});

app.on('listening', function(){
  if (process.env.NODE_ENV == 'production'){
    //TODO: change to node-png lib instead of getpixels (not needed anymor) (one lib to rule them all)
    getPixels(__dirname + "./img/boot.png", function(err, pixels) {
      if(err) throw "could not get pixels: " + err.toString();
      try{
        app.display.image(new Buffer(pixels.data));
      } catch(err) {
        // could not write image to display
      }
    });
  }
});

module.exports = app;
