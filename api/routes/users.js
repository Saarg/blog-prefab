'use strict'

// v1.0 first draft

const User = require('./../models/users');

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
    user.password = req.body.password;
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
    User.find({ name: req.body.name }, (err, user) => {
      if (err) res.send(err);
      user.name = req.body.name;
      user.password = req.body.password;
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
