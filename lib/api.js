
var router = require('express').Router();

// handler for the /user/:id path, which renders a special page
router.get('/info', function (req, res, next) {
  console.log("API INFO !!!!!");
  //res.render('special');
});

module.exports = router;
