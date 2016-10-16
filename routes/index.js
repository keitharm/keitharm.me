const express = require('express');
const router  = express.Router();
const _       = require('lodash');

// Setup defaultVars
let defaultVars
router.all('*', (req, res, next) => {
  defaultVars = req.app.get('defaultVars');
  next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index', _.merge(defaultVars, {title: 'Index'}));
});

router.get('/projects', (req, res, next) => {
  res.render('pages/projects', _.merge(defaultVars, {title: 'Projects'}));
});

module.exports = router;
