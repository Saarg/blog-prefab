'use strict'

// v1.3 added public route (for future auth)

const Activity = require('./../models/activities');

module.exports = (privateRouter, publicRouter) => {
  // activities api route
  publicRouter.route('/activities/:page_id')
  .get(function(req, res) {
    Activity.find((err, activities) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, activities: activities });
    });
  });

  privateRouter.route('/activities/:page_id')
  .post(function(req, res) {
    let activity = new Activity();
    activity.title = req.body.title;
    activity.text = req.body.text;
    activity.page = req.params.page_id;
    activity.maxParticipants = typeof req.body.maxParticipants === 'number' ? req.body.maxParticipants : undefined;
    activity.participants = participants ? participants : undefined;
    activity.mimetype = req.body.mimetype ? req.body.mimetype : undefined;
    activity.media = req.body.media ? req.body.media : undefined;
    activity.position = typeof req.body.position === 'number' ? req.body.position : undefined;

    activity.save((err, activity) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true, activity: activity });
    });
  });

  // individual media api route
  publicRouter.route('/activity/:activity_id')
  .get(function(req, res) {
    Activity.findById(req.params.activitie_id, (err, activity) => {
      if (err) {
          res.json({ success: false, message: err });
          return;
      }
      res.json({ success: true, activity: activity });
    });
  });

  privateRouter.route('/activity/:activity_id')
  .put(function(req, res) {
    Activity.findById(req.params.activity_id, (err, activity) => {
        if (err) res.send(err);
        activity.title = req.body.title ? req.body.title : activity.title;
        activity.text = req.body.text ? req.body.text : activity.text;
        activity.page = req.body.page ? req.body.text : activity.page;
        activity.maxParticipants = typeof req.body.maxParticipants === 'number' ? req.body.maxParticipants : undefined;
        activity.participants = participants ? participants : undefined;
        activity.mimetype = req.body.mimetype ? req.body.mimetype : undefined;
        activity.media = req.body.media ? req.body.media : undefined;
        activity.position = typeof req.body.position === 'number' ? req.body.position : undefined;
        activity.updated = Date.now();

        activity.save((err) => {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, activity: activity });
        });
    });
  })

  .delete(function(req, res) {
    Activity.remove({_id: req.params.activity_id}, (err) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true });
    });
  });
}
