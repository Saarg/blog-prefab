'use strict'

// v1.0 first draft

const User = require('./../models/users');

module.exports = (privateRouter, publicRouter) => {
  privateRouter.route('/user/:mail')
  .get((req, res) => {
    User.find({ mail: req.params.mail })
    .exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, user: user });
    })
  }

  .delete(req, res) => {
    User.remove({ mail: req.params.mail }, (err) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true });
    });
  }

  privateRouter.route('/user')
  .post((req, res) => {
    let user = new User();
    user.mail = req.body.mail;
    user.password = req.body.password;
    user.accessLevel = req.body.accessLevel;
    user.pseudo = req.body.pseudo;

    user.save((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, user: user });
    });
  }

  .put((req, res) => {
    User.find({ mail: req.body.mail }, (err, user) => {
      if (err) res.send(err);
      user.mail = req.body.mail;
      user.password = req.body.password;
      user.accessLevel = req.body.accessLevel;
      user.pseudo = req.body.pseudo;

      user.save((err, user) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, user: user });
      });
    });
  }
}
