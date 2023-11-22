const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

/* GET users listing. */
// /users/author
router.get('/author', (req, res) => {
  res.render('author', { author: 'Eddy' });
});

module.exports = router;
