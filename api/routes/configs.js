'use strict'

// v1.0 first draft

const Config = require('./../models/configs');

module.exports = (privateRouter, publicRouter) => {
  publicRouter.route('/configs/:config_key')
  .get((req, res) => {
    Config.find({ key: req.params.config_key }, (err, config) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, config: config });
    });
  });

  privateRouter.route('/configs/:config_key')
  .put((req, res) => {
    Config.findOne({ 'key': req.params.config_key }, (err, config) => {
      if (err) res.send(err);
      config = !config ? new Config() : config;

      config.key = config.key ? config.key : req.params.config_key;
      config.value = req.body.value;

      config.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, config: config });
      });
    });
  });
}
