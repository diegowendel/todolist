const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const load = require('express-load');
const path = require('path');

module.exports = () => {
  // Express app
  const app = express();
  // Support parsing of application/json type post data
  app.use(bodyParser.json());
  // Support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({extended: true}));
  // Tell express that public is the root of our public web folder
  app.use(express.static(path.join(__dirname, '../public/build')));
  // CORS
  app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
  // Helmet
  app.use(helmet());

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/build', 'index.html'));
  });

  load('models', {cwd: 'app'})
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
