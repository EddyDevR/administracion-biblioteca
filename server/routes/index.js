import express from 'express';
const { Router } = express;

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let iconSet = ["⭐","🤖","🍉"];
  let icon = iconSet[Math.floor(Math.random() * 3)]
  res.render('index', { title: 'DWPCII-2023A', icon });
});

router.get('/author', (req, res) => {
  // Creating a View-Model
  let author = {
    "name": "Ivan",
    "lastname": "Rivalcoba",
    "twitter": "@rivalcoba",
    "job": "ITGAM"
  };
  // Sending the view-model to be rendered by a View
  res.render('author', author);
});

export default router;
