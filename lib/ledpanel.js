try{
	var SPI = require('spi');
} catch (error) {
	SPI = null
}


var LedPanel = function(dev){ // device eg: '/dev/spidev1.1'
	this.device = new SPI.Spi(dev, {
		"mode": SPI.MODE['MODE_0'],// always set mode as the first option
    	'chipSelect': SPI.CS['none'], // 'none', 'high' - defaults to low
		'maxSpeed': 16000000
	}, function(s){s.open();});
};

LedPanel.prototype.write = function(data){
	this.device.write(data);
};

LedPanel.prototype.line = function(panel, line, data){
	var buffer = new Buffer((3 + (32*3)));

	buffer[0] = 0x01; 	// line command
	buffer[1] = panel;	// panel number
	buffer[2] = line;	// line number

	data.copy(buffer, 3);

	this.write(buffer);
};

LedPanel.prototype.image = function(image, callback)
{
	var date = new Date();
	var startTime  = date.getTime();
	//console.log("Image info");
	//console.log(image.length);
	if(image.length != 96*64*4){
		throw "image buffer wrong size (" + image.length + " instead of " + (32*32*6*4) + ")";
	}

	for(slice = 0;slice < 6*32; slice++){
		var start = slice*32*4;
		var panel = (slice < 3*32) ? (slice % 3) : 3 + (slice % 3);
		var line =  (slice < 3*32) ? (slice / 3) : (slice / 3) - 32;
		line = Math.floor(line);
		var buffer = new Buffer(32*3);
		buffer.fill(8);

		for(pixel = 0; pixel < 32; pixel++){
			var t = image.slice(start + (pixel * 4),start + (pixel * 4) + 3);
			t.copy(buffer, pixel * 3);
			//buffer = Buffer.concat([buffer,t]);
		}

		buffer = this.adjustGamma(buffer);

		this.line(panel, line, buffer);
	}
	this.flush();
	date = new Date();
	var endTime = date.getTime();
	var time = (endTime - startTime);
	console.log("done " + time);
	if(typeof(callback) === "function")
		callback();
}

LedPanel.prototype.flush = function()
{
	var buffer = new Buffer([0x08]);
	this.write(buffer);
}

LedPanel.prototype.adjustGamma = function(buffer)
{
	var output = new Buffer(buffer.length);
	for(i = 0; i < output.length; i++){
		gamma = 0.3;
		gammacorrection = 1 / gamma;
		output[i] = 128 * Math.pow(buffer[i] / 255, gammacorrection);
	}
	return output;
}

if(SPI){
	exports.LedPanel = LedPanel;
} else {
	exports.LedPanel = function(dev){
		this.demo = function(){};
		this.image = function(){console.log("Ledpanel mock: image()")};
	}
}
