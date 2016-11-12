'use strict'

var Activity = require('./../models/activities');

module.exports = function(router) {
  // activities api route
  router.route('/activities/:page_id')
  .get(function(req, res) {
    res.json({ message: 'Here will be a list of all the activities available for a page.' });
  })

  // individual media api route
  router.route('/activity/:activitie_id')
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
