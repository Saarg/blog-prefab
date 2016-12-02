'use strict'

const jwt  = require('jsonwebtoken');
const Path = require('path');

module.exports = (app, privateRouter, publicRouter) => {

  // Middleware for non public routes
  privateRouter.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('TokenSecret'), (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
    }
  });

  require('./routes/configs')(privateRouter, publicRouter);
  require('./routes/pages')(privateRouter, publicRouter);
  require('./routes/activities')(privateRouter, publicRouter);
  require('./routes/articles')(privateRouter, publicRouter);
  require('./routes/medias')(privateRouter, publicRouter);

  publicRouter.route('/:folder/:media_id/show')
  .get((req, res) => {
    const path = Path.join(__dirname, 'data', req.params.folder, req.params.media_id + '.png')
    res.sendFile(path);
  });

  privateRouter.route('*')
  .post((req, res) => {
    res.json({ success: true, message: "you have acces to the private api :)" });
  });
}
