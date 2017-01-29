'use strict'

// v1.0 first draft

const User = require('./../models/users');
const crypto = require('crypto');

module.exports = (privateRouter, publicRouter) => {
  privateRouter.route('/users')
  .get((req, res) => {
    User.find()
    .exec((err, users) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, users: users });
    });
  });

  privateRouter.route('/user/:name')
  .get((req, res) => {
    User.find({ name: req.params.name })
    .exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, user: user });
    });
  })

  .delete((req, res) => {
    User.remove({ name: req.params.name }, (err) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true });
    });
  });

  privateRouter.route('/user')
  .post((req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.password = crypto.createHash('md5').update(req.body.password).digest("hex");
    user.accessLevel = req.body.accessLevel;

    user.save((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, user: user });
    });
  })

  .put((req, res) => {
    User.findById(req.body._id, (err, user) => {
      if (err) res.send(err);
      user.name = req.body.name;
      user.password = crypto.createHash('md5').update(req.body.password).digest("hex");
      user.accessLevel = req.body.accessLevel;

      user.save((err, user) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, user: user });
      });
    });
  });
}
