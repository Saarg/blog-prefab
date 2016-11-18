'use strict'

// v1.1 moved post route to /api/activities/:page_id

const Activity = require('./../models/activities');

module.exports = function(router) {
  // activities api route
  router.route('/activities/:page_id')
  .get(function(req, res) {
    Activity.find((err, activities) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, activities: activities });
    });
  })

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
  router.route('/activity/:activity_id')
  .get(function(req, res) {
    Activity.findById(req.params.activitie_id, (err, activity) => {
      if (err) {
          res.json({ success: false, message: err });
          return;
      }
      res.json({ success: true, activity: activity });
    });
  })

  .put(function(req, res) {
    Activity.findById(req.params.activity_id, (err, activity) => {
        if (err) res.send(err);
        activity.title = req.body.title ? req.body.title : undefined;
        activity.text = req.body.text ? req.body.text : undefined;
        activity.page = req.body.page ? req.body.text : undefined;
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
