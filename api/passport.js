'use strict'

const session       = require('express-session');

const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jwt           = require('jsonwebtoken');

module.exports = (app) => {
  //app.use(session({ secret: 'keyboard cat' }));

  // use passport for auth
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('TokenSecret', 'Change me, just do it damit!');

  passport.use(new LocalStrategy((username, password, done) => {
    if (username !== "admin") {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password !== "admin") {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, {username, password});
    // User.findOne({ username: username }, (err, user) => {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    done(null, {username, username});
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });

  app.post('/api/private/login', passport.authenticate('local'), (req, res) => {
    var token = jwt.sign({ username: req.user.username, message: 'why are you reading this hu?' }, app.get('TokenSecret'), {
      expiresIn: "1d"
    });

    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  });
}
