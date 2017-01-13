'use strict'

// v1.4 added count

const Activity = require('./../models/activities');

module.exports = (privateRouter, publicRouter) => {
  // activities count route
  publicRouter.route('/activities/:page_id/count')
  .get((req, res) => {
    Activity.count({ page: req.params.page_id })
    .exec((err, count) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, count: count });
    });
  });

  // activities api route
  publicRouter.route('/activities/:page_id/:offset?/:limit?')
  .get((req, res) => {
    Activity.find({ page: req.params.page_id })
    .sort({created: -1})
    .skip(parseInt(req.params.offset) ? parseInt(req.params.offset) : 0)
    .limit(parseInt(req.params.limit) ? parseInt(req.params.limit) : 5)
    .exec((err, activities) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, activities: activities });
    });
  });

  privateRouter.route('/activities/:page_id')
  .post((req, res) => {
    let activity = new Activity();
    activity.title = req.body.title;
    activity.text = req.body.text;
    activity.page = req.params.page_id;
    activity.location = req.body.location ? req.body.location : undefined;
    activity.date = req.body.date ? req.body.date : undefined;
    activity.maxParticipants = typeof req.body.maxParticipants === 'number' ? req.body.maxParticipants : undefined;
    activity.participants = req.body.participants ? req.body.participants : undefined;
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
  .get((req, res) => {
    Activity.findById(req.params.activitie_id, (err, activity) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, activity: activity });
    });
  })

  .put((req, res) => {
    Activity.findById(req.params.activity_id, (err, activity) => {
      if (err) {
        res.send(err);
        return;
      }

      let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      console.log(req.body.mail);
      console.log(re.test(req.body.mail));

      if(!re.test(req.body.mail)) {
        res.json({ success: false, message: 'This doesn\'t look like a valid email!' });
        return;
      }

      activity.participants.push(req.body.mail);
      activity.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, activity: activity });
      });
    });
  });

  privateRouter.route('/activity/:activity_id')
  .put((req, res) => {
    Activity.findById(req.params.activity_id, (err, activity) => {
      if (err) res.send(err);
      activity.title = req.body.title ? req.body.title : activity.title;
      activity.text = req.body.text ? req.body.text : activity.text;
      activity.page = req.body.page ? req.body.text : activity.page;
      activity.location = req.body.location ? req.body.location : activity.location;
      activity.date = req.body.date ? req.body.date : activity.date;
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

  .delete((req, res) => {
    Activity.remove({_id: req.params.activity_id}, (err) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true });
    });
  });

  privateRouter.route('/activity/:activity_id/participants/:email')
  .put((req, res) => {
    Activity.findById(req.params.activity_id, (err, activity) => {
      if (err) res.send(err);
      activity.participants.push(req.params.email);

      activity.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, activity: activity });
      });
    });
  })

  .delete((req, res) => {
    Activity.findById(req.params.activity_id, (err, activity) => {
      if (err) res.send(err);
      activity.participants.splice(activity.participants.indexOf(req.params.email), 1);

      activity.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, activity: activity });
      });
    });
  });
}
