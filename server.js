'use strict'

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');

const mongoose      = require('mongoose');
const port = process.env.PORT || 8080;

// connect to the db
mongoose.connect('mongodb://localhost:27017/blog-prefab');

// init app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/dist')));

// get express router
const router = express.Router();

// api routes
require('./api/routes')(router);
app.use('/api', router);

// dist frontend
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(port, function () {
  console.log('Magic happens on port ' + port + '!');
});

module.exports = app;
