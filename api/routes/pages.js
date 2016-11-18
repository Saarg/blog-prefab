'use strict'

var Page = require('./../models/pages');

module.exports = function(router) {
  // pages api route
  router.route('/pages').get(function(req, res) {
    Page.find(function(err, pages) {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json(pages);
    });
  })

  // individual page api route
  router.route('/page/:page_id')
  .get(function(req, res) {

    Profils.findById(req.params.page_id, function(err, page) {
      if (err) {
          res.json({ success: false, message: err });
          return;
      }
      res.json(page);
    });
  })

  .post(function(req, res) {
    let page = new Page();
    page.name = req.body.name;
    page.description = req.body.description;
    page.position = req.body.position ? req.body.position : undefined;
    page.inNav = req.body.inNav ? req.body.inNav : undefined;
    page.created = req.body.created ? req.body.created : undefined;
    page.updated = req.body.updated ? req.body.updated : undefined;

    page.save(function(err, page) {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true, page: page });
    });
  })

  .put(function(req, res) {
    Page.findById(req.params.page_id, function(err, page) {
        if (err) res.send(err);
        page.name = req.body.name ? req.body.name : undefined;
        page.description = req.body.description ? req.body.description : undefined;
        page.position = req.body.position ? req.body.position : undefined;
        page.inNav = req.body.inNav ? req.body.inNav : undefined;
        page.created = req.body.created ? req.body.created : undefined;
        page.updated = req.body.updated ? req.body.updated : undefined;

        page.save(function(err) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, page: page });
        });
    });
  })

  .delete(function(req, res) {
    Page.remove({_id: req.params.page_id}, function(err) {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true });
    });
  })
}
