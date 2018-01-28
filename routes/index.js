const express = require('express');
const router = express.Router();

// -> Call the database
const db = require('../database/init');

// -> Call home page
router.get('/', (req, res) => {
  res.render('index');
});

// -> Get data from form
router.post('/', (req, res) => {
  // -> Create objet with all data from index page
  let data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    matiere: req.body.matiere,
    note: req.body.note
  }

  // console.log(data);
  db.contents.create(data).then(dataU => {
    res.redirect('/notes');
  }).catch(error => {
    console.log(error);
    res.redirect('/');
  });

});

// ------------------------------------------------------
module.exports = router;
