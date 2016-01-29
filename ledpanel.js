var SPI = require('spi');

var LedPanel = function(dev){ // device eg: '/dev/spidev1.1'
	this.device = new SPI.Spi(dev, {
		"mode": SPI.MODE['MODE_0'],// always set mode as the first option
    	'chipSelect': SPI.CS['none'], // 'none', 'high' - defaults to low
		'maxSpeed': 1000000
	}, function(s){s.open();});
};

LedPanel.prototype.demo = function(){
	var buffer = new Buffer((3 + (32*3)));
	buffer[0] = 0x01;
	buffer[1] = 0x00;
	buffer[2] = 0x00;

	for(i = 3; i < buffer.size; i += 15){
		buffer[i+0] = 0xFF;
		buffer[i+1] = 0xFF;
		buffer[i+2] = 0xFF;

		buffer[i+3] = 0xFF;
		buffer[i+4] = 0x00;
		buffer[i+5] = 0x00;

		buffer[i+6] = 0x00;
		buffer[i+7] = 0xFF;
		buffer[i+8] = 0x00;

		buffer[i+9] = 0x00;
		buffer[i+10] = 0x00;
		buffer[i+11] = 0xFF;

		buffer[i+12] = 0x00;
		buffer[i+13] = 0x00;
		buffer[i+14] = 0x00;
	}

	this.device.write(buffer);
};

exports.LedPanel = LedPanel;

