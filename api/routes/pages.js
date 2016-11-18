'use strict'

// v1.4 minimize put calls

const Page = require('./../models/pages');

module.exports = (router) => {
  // pages api route
  router.route('/pages').get((req, res) => {
    Page.find((err, pages) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, pages: pages });
    });
  })

  .post((req, res) => {
    let page = new Page();
    page.name = req.body.name;
    page.description = req.body.description;
    page.type = req.body.type ? req.body.type : undefined;
    page.position = typeof req.body.position === 'number' ? req.body.position : undefined;
    page.inNav = req.body.inNav ? req.body.inNav : undefined;

    page.save((err, page) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true, page: page });
    });
  });

  // individual page api route
  router.route('/page/:page_id')
  .get((req, res) => {
    Page.findById(req.params.page_id, (err, page) => {
      if (err) {
          res.json({ success: false, message: err });
          return;
      }
      res.json({ success: true, page: page });
    });
  })

  .put((req, res) => {
    Page.findById(req.params.page_id, (err, page) => {
        if (err) res.send(err);
        page.name = req.body.name ? req.body.name : page.name;
        page.description = req.body.description ? req.body.description : page.description;
        page.type = req.body.type ? req.body.type : undefined;
        page.position = req.body.position ? req.body.position : undefined;
        page.inNav = req.body.inNav ? req.body.inNav : undefined;
        page.updated = Date.now();

        page.save((err) => {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, page: page });
        });
    });
  })

  .delete((req, res) => {
    Page.remove({_id: req.params.page_id}, (err) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        res.json({ success: true });
    });
  });
}
