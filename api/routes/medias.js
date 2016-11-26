'use strict'

// v1.4 added public route (for future auth)

const Media = require('./../models/medias');

module.exports = (privateRouter, publicRouter) => {
  // medias by page api route
  publicRouter.route('/medias/:page_id')
  .get((req, res) => {
    Media.find({ page: req.params.page_id })
    .sort({created: -1})
    .skip(req.params.offset ? req.params.offset : 0)
    .limit(req.params.limit ? req.params.limit : 5)
    .exec((err, medias) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, medias: medias });
    });
  });

  privateRouter.route('/medias/:page_id').post((req, res) => {
    let media = new Media();
    media.name = req.body.name ? req.body.name : undefined;
    media.description = req.body.description ? req.body.description : undefined;
    media.page = req.params.page_id;
    media.mimetype = req.body.mimetype;
    media.media = req.body.media; // TODO need to handle file upload for images
    media.position = typeof req.body.position === 'number' ? req.body.position : undefined;

    media.save((err, media) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, media: media });
    });
  });

  // individual media api route
  publicRouter.route('/media/:media_id')
  .get((req, res) => {
    Media.findById(req.params.media_id, (err, media) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, media: media });
    });
  });

  privateRouter.route('/media/:media_id')
  .put((req, res) => {
    Media.findById(req.params.media_id, (err, media) => {
      if (err) res.send(err);
      media.name = req.body.name ? req.body.name : undefined;
      media.description = req.body.description ? req.body.description : undefined;
      media.page = req.body.page ? req.body.page : media.page;
      media.mimetype = req.body.mimetype ? req.body.mimetype : media.mimetype;
      media.media = req.body.media ? req.body.media : media.media; // TODO need to handle file upload for images
      media.position = typeof req.body.position === 'number' ? req.body.position : undefined;
      media.updated = Date.now();

      media.save((err) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        res.json({ success: true, media: media });
      });
    });
  })

  .delete((req, res) => {
    Media.remove({_id: req.params.media_id}, (err) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true });
    });
  });
}
