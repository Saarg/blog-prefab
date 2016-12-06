'use strict'

// v1.6 added count

const fileSaver    = require('./../utils/fileSaver');
const Media        = require('./../models/medias');

module.exports = (privateRouter, publicRouter) => {
  // activities count route
  publicRouter.route('/medias/:page_id/count')
  .get((req, res) => {
    Media.count({ page: req.params.page_id })
    .exec((err, count) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, count: count });
    });
  });

  // medias by page api route
  publicRouter.route('/medias/:page_id/:offset?/:limit?')
  .get((req, res) => {
    Media.find({ page: req.params.page_id })
    .sort({created: -1})
    .skip(parseInt(req.params.offset) ? parseInt(req.params.offset) : 0)
    .limit(parseInt(req.params.limit) ? parseInt(req.params.limit) : 16)
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
    media.mimetype = req.body.media.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
    media.position = typeof req.body.position === 'number' ? req.body.position : undefined;

    media.media = fileSaver('media', req.body.media);

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
      media.mimetype = req.body.media.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
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
