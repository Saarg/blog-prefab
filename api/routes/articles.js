'use strict'

var Article = require('./../models/articles');

module.exports = function(router) {
  // articles by page api route
  router.route('/articles/:page_id')
  .get(function(req, res) {
    res.json({ message: 'Here will be a list of all the medias available for a page.' });
  })

  // individual media api route
  router.route('/article/:article_id')
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
