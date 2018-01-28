/**========================================
 * Configuration server
 =========================================*/
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.argv[2] || 8000;
const session = require('express-session');
const flash = require('express-flash-notification');

// -> Call database and use it
const db = require('./database/init');

// -> Set and rending default engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// -> For handle post request in express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// -> Load assets
app.use(express.static(path.join(__dirname, 'public')));

// -> Set routes
const index = require('./routes/index');
const notes = require('./routes/notes');

// -> Use routes
app.use('/', index);
app.use('/notes', notes);

// -> Handle 404
app.use((req, res) => {
  res.status(400);
  res.render('404.ejs', {
    title: '404: File Not Found'
  });
});

// Handle 500
// app.use((error, req, res, next) => {
//    res.status(500);
//    res.render('500.ejs', {title:'500: Internal Server Error', error: error});
//    next();
// });

// -----------------------------------------------------------------------------------

// -> Start server with sequelize
db.sequelize.sync().then(() => {
  console.log("Database config success!");

  app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`);
  });

}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
