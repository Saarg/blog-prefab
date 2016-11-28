'use strict'

// v1.5 added public route (for future auth)

const Page = require('./../models/pages');

module.exports = (privateRouter, publicRouter) => {
  // pages api route
  publicRouter.route('/pages').get((req, res) => {
    Page.find((err, pages) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, pages: pages });
    });
  });

  // homepage api route
  publicRouter.route('/page/home').get((req, res) => {
    Page.findOne({ position: 0 }, (err, page) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, page: page });
    });
  });

  privateRouter.route('/pages').post((req, res) => {
    let page = new Page();
    page.name = req.body.name;
    page.description = req.body.description;
    page.type = typeof req.body.type === 'number' ? req.body.type : 0;
    page.position = typeof req.body.position === 'number' ? req.body.position : -1;
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
  publicRouter.route('/page/:page_id')
  .get((req, res) => {
    Page.findById(req.params.page_id, (err, page) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      res.json({ success: true, page: page });
    });
  });

  privateRouter.route('/page/:page_id')
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
