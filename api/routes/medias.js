'use strict'

// v1.0 first draft

var Media = require('./../models/medias');

module.exports = (router) => {
  // medias by page api route
  router.route('/medias/:page_id')
  .get((req, res) => {
    Media.find((err, medias) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, medias: medias });
    });
  })

  // individual media api route
  router.route('/media/:media_id')
  .get((req, res) => {
    media.findById(req.params.media_id, (err, media) => {
      if (err) {
          res.json({ success: false, message: err });
          return;
      }
      res.json({ success: true, media: media });
    });
  })

  .post((req, res) => {
    let media = new Media();
    media.name = req.body.name ? req.body.name : undefined;
    media.description = req.body.description ? req.body.description : undefined;
    media.page = req.body.page;
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
  })

  .put((req, res) => {
    Media.findById(req.params.media_id, (err, media) => {
        if (err) res.send(err);
        media.name = req.body.name ? req.body.name : undefined;
        media.description = req.body.description ? req.body.description : undefined;
        media.page = req.body.page ? req.body.page : undefined;
        media.mimetype = req.body.mimetype ? req.body.mimetype : undefined;
        media.media = req.body.media; // TODO need to handle file upload for images
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
  })
}
