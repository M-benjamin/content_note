const express = require('express');
const router = express.Router();

// -> Call the database
const db = require('../database/init');


/**============================
 * Get notes
 ==============================*/
router.get('/', (req, res) => {
  db.contents.findAll().then(dataMod => {

      res.render('notes', {
          data: dataMod
      });
  })
});

/**============================
 * Get notes for update
 ==============================*/
router.get('/update/:id', (req, res) => {
  let id = req.params.id;
  db.contents.findOne({ where: { id: id} }).then(data => {
        res.render('update', {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            matiere: data.matiere,
            note: data.note
        });
    })
});

/**============================
 * Update notes
 ==============================*/
router.post('/update/:id', (req, res) => {

  let id = req.params.id;

  console.log('id is : ' + id);
  console.log(req.body);
  console.log('update');

  db.contents.update(
  {
    firstname: req.body.firstnamed,
    lastname: req.body.lastnamed,
    matiere: req.body.matiered,
    note: req.body.noted
  }, {
    where: { id: id }
  })
  .then(data => {
      if (!data) {
        res.status(400);
      } else {
        res.status(204);
      }
  });
  
  res.render('index');

});

/**============================
 * Get notes for delete
 ==============================*/
router.get('/delete/:id', (req, res) => {
  let id = req.params.id;

  db.contents.findOne({ where: { id: id} }).then(data => {
        res.render('delete', {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            matiere: data.matiere,
            note: data.note
        });
    })
});

/**============================
 * Delete notes
 ==============================*/
router.post('/delete/:id', (req, res) => {
    let id = req.params.id;

    console.log('the id is one more : ' + id);
    db.contents.destroy({
      where: {
         id: id
      }
   }).then(data => {
      res.status(200);
      res.render('index.ejs');
   });

});

// -----------------------------------------------------
module.exports = router;
