'use strict'

var Page = require('./../models/pages');

module.exports = function(router) {
  // pages api route
  router.route('/pages')
  .get(function(req, res) {
    res.json({ message: 'Here will be a list of all the pages available.' });
  })

  // individual page api route
  router.route('/page/:page_id')
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
