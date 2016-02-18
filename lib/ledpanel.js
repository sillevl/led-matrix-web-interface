try{
	var SPI = require('spi');
} catch (error) {
	SPI = null
}


var LedPanel = function(dev){ // device eg: '/dev/spidev1.1'
	this.device = new SPI.Spi(dev, {
		"mode": SPI.MODE['MODE_0'],// always set mode as the first option
    	'chipSelect': SPI.CS['none'], // 'none', 'high' - defaults to low
		'maxSpeed': 1000000
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

LedPanel.prototype.demo = function(){
	var buffer = new Buffer(32*3);
	buffer.fill(0x00);

	for(i = 0; i < buffer.length; i += 15){
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

	for(i = 0; i < 32; i++){
		this.line(0xFF, i, buffer);
		break;
	}
	this.flush();
};

LedPanel.prototype.demo2 = function()
{
	var buffer = new Buffer(96*64*3);
	buffer.fill(0x00);

	for(i = 0; i < 64;i++){
		buffer[i*96*3] = 0xFF;
		buffer[(i*96*3)+(95*3)] = 0xFF;
	}

	for(i = 0; i < 96; i++){	
		buffer[i*3] = 0xFF;
		buffer[(i*3)+i] = 0xFF;
		
		buffer[(i+(96*63))*3] = 0xFF;
	}

	this.image(buffer);
}

LedPanel.prototype.image = function(image)
{
	console.log("Image info");
	console.log(image.length);
	if(image.length != 96*64*4){
		throw "image buffer wrong size (" + image.length + " instead of " + (32*32*6*4) + ")";
	}

	for(slice = 0;slice < 6*32; slice++){
		var start = slice*32*4;
		var panel = (slice < 3*32) ? (slice % 3) : 3 + (slice % 3);
		var line =  (slice < 3*32) ? (slice / 3) : (slice / 3) - 32;
		line = Math.floor(line);
		var buffer = new Buffer(0);
		
		for(pixel = 0; pixel < 32; pixel++){
			var t = image.slice(start + (pixel * 4),start + (pixel * 4) + 3);	
			buffer = Buffer.concat([buffer,t]);
		}

		buffer = this.adjustGamma(buffer);
	
//		buffer = image.slice(start,start+96);
		this.line(panel, line, buffer);
	}
	this.flush();
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
		gamma = 0.8;
		gammacorrection = 1.0/gamma;
		output[i] = Math.pow(255.0 * (buffer[i] / 255.0), gammacorrection);
	}
	return output;
}

if(SPI){
	exports.LedPanel = LedPanel;
} else {
	exports.LedPanel = function(dev){
		this.demo = function(){};
	}
}
