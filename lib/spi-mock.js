
var MODE = {
    MODE_0: null,
    MODE_1: null,
    MODE_2: null,
    MODE_3: null
};

var CS = {
    none: null,
    high: null,
    low:  null
};

var ORDER = {
    msb:  null,
    lsb:  null
};

var Spi = function(device, options, callback){};
Spi.prototype.open = function () {};
Spi.prototype.close = function () {};
Spi.prototype.write = function () {};

module.exports.MODE = MODE;
module.exports.CS = CS;
module.exports.ORDER = ORDER;
module.exports.Spi = Spi;
