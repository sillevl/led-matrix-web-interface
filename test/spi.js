var LedPanel = require('../ledpanel').LedPanel;

var ledpanel = new LedPanel('/dev/spidev0.0');

console.log("*** Ledpanel Demo ***");
ledpanel.demo();
