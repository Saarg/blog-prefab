'use strict'

module.exports = (privateRouter, publicRouter) => {

  // Middleware for non public routes
  privateRouter.use((req, res, next) => {
    // TODO look for autk token
    next();
  });

  require('./routes/configs')(privateRouter, publicRouter);
  require('./routes/pages')(privateRouter, publicRouter);
  require('./routes/activities')(privateRouter, publicRouter);
  require('./routes/articles')(privateRouter, publicRouter);
  require('./routes/medias')(privateRouter, publicRouter);
}
