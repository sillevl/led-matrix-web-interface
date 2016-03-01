

var adjustGamma = function(buffer, gamma)
{
	var output = new Buffer(buffer.length);
	for(i = 0; i < output.length; i++){
		gammacorrection = 1 / gamma;
		output[i] = 255 * Math.pow(buffer[i] / 255, gammacorrection);
	}
	return output;
}

module.exports.adjustGamma = adjustGamma;
