var LedPanel = require('../lib/ledpanel').LedPanel;

var getPixels = require("get-pixels");
var ledpanel = new LedPanel('/dev/spidev0.0');

console.log("*** Ledpanel Demo ***");
//ledpanel.demo();



getPixels(__dirname + "/../img/testbeeld.png", function(err, pixels) {
	if(err) throw "could not get pixels: " + err.toString();
	console.log("got pixels", pixels.shape.slice());
//	console.log(pixels.data.slice(0,32*4).toString('hex'));
	ledpanel.image(new Buffer(pixels.data));
});
