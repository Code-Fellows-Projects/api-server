'use strict';


const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const notFoundHandler = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const cheesecakeRoute = require('./routes/cheesecake-routes');
//const clothesRoute = require('./routes/clothes');


// mongoose 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Super Connected');
});

// middleware
app.use(express.json());  ///turns the req.body into json
app.use(logger);   /// console.log() routes and methods
app.use(cheesecakeRoute);  /// all my routes
//app.use(clothesRoute); /// all routes

//proof of life
app.get('/life', lifeCallBackHandler);

function lifeCallBackHandler(req, res, next) {
  res.status(200).send('Hello World');
}


//error handlers
app.use('*', notFoundHandler); //404 not found if we don't hit our route
app.use(serverError); //500 error when something throws an error

//exporting app ans start
/// to access it in the index and the tests

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('no port here'); }
    app.listen(port, () => {
      console.log(`server up! ${port}`);
    });
  },
};
