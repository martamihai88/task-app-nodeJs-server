const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const cardsRoutes =  require('./api/routes/cards');
const archiveRoutes =  require('./api/routes/archive');
const userRoutes =  require('./api/routes/user');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if(req.method === "OPTIONS"){
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  }
  next();
});

//Routes
app.use('/cards', cardsRoutes );
app.use('/archive', archiveRoutes );
app.use('/user', userRoutes );

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;