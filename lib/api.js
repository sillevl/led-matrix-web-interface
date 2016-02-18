
var router = require('express').Router();
var LedPanel = require('./ledpanel').LedPanel;

var ledpanel = new LedPanel('/dev/spidev0.0');
var getPixels = require("get-pixels");

router.get('/info', function (req, res, next) {
  console.log("API INFO !!!!!");
  //res.render('special');
});

router.get('/testimage', function(req, res) {
	getPixels(__dirname + "/../img/testbeeld.png", function(err, pixels) {
		if(err) throw "could not get pixels: " + err.toString();
		console.log("got pixels", pixels.shape.slice());
		ledpanel.image(new Buffer(pixels.data));
	});
});

module.exports = router;
