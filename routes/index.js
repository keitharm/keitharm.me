const fs      = require('fs');
const express = require('express');
const router  = express.Router();
const _       = require('lodash');

let projects = JSON.parse(fs.readFileSync('./public/files/projects.json', 'utf8'));

// Setup defaultVars
let defaultVars
router.all('*', (req, res, next) => {
  defaultVars = req.app.get('defaultVars');
  next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index', _.merge(defaultVars, {title: 'Keith Armstrong'}));
});

router.get('/projects', (req, res, next) => {
  res.render('pages/projects', _.merge(defaultVars, {title: 'Projects'}));
});

router.get('/project/:name', (req, res, next) => {
  let project = _.find(projects, project => project.seo === req.params.name);
  if (project === undefined) return res.redirect('/projects');

  res.render('pages/project', _.merge(defaultVars, {title: project.name}));
});

module.exports = router;
