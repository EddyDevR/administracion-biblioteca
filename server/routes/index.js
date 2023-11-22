const express = require('express');

const router = express.Router();

/* GET home page. */
// un GET / se ejecutara esta
// registro de middlewares de app,tenemos enrutadores

router.get('/', (req, res) => {
  res.render('index', { title: 'ITGAM', author: 'Eddy' });
});

module.exports = router;
