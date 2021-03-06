
var router = require('express').Router();
var getPixels = require("get-pixels");

var PNG = require('node-png').PNG;
var Readable = require('stream').Readable;

function decodeBase64Image(dataString)
{
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  if (matches.length !== 3)
  {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

router.post('/image', function(req, res){
  var image = req.body.image;
  var buffer = decodeBase64Image(image).data;
  var png = new PNG();

  var s = new Readable;
  s.push(buffer);
  s.push(null);

  png.on('parsed', function(data){
    try{
      req.app.display.image(data);
      res.send(JSON.stringify({status:"ok"}));
    } catch(err) {
      res.status(400).send(JSON.stringify({status: "error", message: err}));
    }
  });

  s.pipe(png);
});

router.get('/info', function (req, res, next) {
  console.log("API INFO !!!!!");
  res.send("Info");
});

router.get('/testimage', function(req, res) {
  //TODO: change to node-png lib instead of getpixels (not needed anymor) (one lib to rule them all)
	getPixels(__dirname + "/../img/testbeeld.png", function(err, pixels) {
		if(err) throw "could not get pixels: " + err.toString();
    try{
		  req.app.display.image(new Buffer(pixels.data));
    } catch(err) {
      res.status(400).send(JSON.stringify({status: "error", message: err}));
    }
	});
});

module.exports = router;
