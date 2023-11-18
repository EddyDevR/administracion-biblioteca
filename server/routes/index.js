var express = require('express');
var router = express.Router();

/* GET home page. */
// un GET / se ejecutara esta
//registro de middlewares de app,tenemos enrutadores 

router.get('/', function (req, res, next) {
  res.render('index', { title: 'ITGAM',author: "Eddy" });
});

module.exports = router;
