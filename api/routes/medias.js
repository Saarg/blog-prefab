'use strict'

var Media = require('./../models/medias');

module.exports = function(router) {
  // medias by page api route
  router.route('/medias/:page_id')
  .get(function(req, res) {
    res.json({ message: 'Here will be a list of all the medias available for a page.' });
  })

  // individual media api route
  router.route('/media/:media_id')
  .get(function(req, res) {
    res.json({ message: 'Not implemented yet.' });
  })

  .post(function(req, res) {
    res.json({ message: 'Not implemented yet.' });
  })

  .put(function(req, res) {
    res.json({ message: 'Not implemented yet.' });
  })

  .delete(function(req, res) {
    res.json({ message: 'Not implemented yet.' });
  })
}
