'use strict'

// v1.0 first draft

const Config = require('./../models/configs');

module.exports = (privateRouter, publicRouter) => {
  publicRouter.route('/configs/:config_key')
  .get((req, res) => {
    Config.findBy({ key: req.params.config_key }, (err, config) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, config: config });
    });
  })

  .put((req, res) => {
    Config.findBy({ key: req.params.config_key }, (err, config) => {
      if (err) res.send(err);
      config.key = req.body.key ? req.body.key : config.title;
      config.value = req.body.value ? req.body.value : config.value;

      config.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, article: article });
      });
    });
  });
}
