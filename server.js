'use strict'

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');

const morgan        = require('morgan');

const mongoose      = require('mongoose');
var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/blog-prefab';
} else {
  MONGO_DB = process.env.MONGODB || 'mongodb://localhost:27017/blog-prefab';
}

const port = process.env.PORT || 8080;

// connect to the db
mongoose.connect(MONGO_DB);

// init app
const app = express();
app.use(morgan('dev')); // log every request to the console
app.use(express.static(path.join(__dirname,'/dist')));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

require('./api/passport')(app);

// get express routers
const publicRouter = express.Router();
const privateRouter = express.Router();

// api routes
require('./api/routes')(app, privateRouter, publicRouter);
app.use('/api/public', publicRouter);
app.use('/api/private', privateRouter);

// dist frontend
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(port, function () {
  console.log('Magic happens on port ' + port + '!');
});

module.exports = app;
