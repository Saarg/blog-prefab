'use strict'

module.exports = function(router) {
  require('./routes/pages')(router);
  require('./routes/activities')(router);
  require('./routes/articles')(router);
  require('./routes/medias')(router);
}
